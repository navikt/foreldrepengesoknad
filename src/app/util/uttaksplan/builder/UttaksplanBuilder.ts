import moment from 'moment';
import { guid } from 'nav-frontend-js-utils';
import {
    Periode,
    Periodetype,
    PeriodeHull,
    UtsettelseÅrsakType,
    PeriodeHullÅrsak,
    isOverskrivbarPeriode,
    isHull,
    isInfoPeriode,
    isGruppertInfoPeriode,
    isUttakAnnenPart,
    UttakAnnenPartInfoPeriode,
    isUttaksperiode,
    TilgjengeligStønadskonto
} from '../../../types/uttaksplan/periodetyper';
import { Periodene, sorterPerioder } from '../Periodene';
import { Tidsperioden, getTidsperiode, isValidTidsperiode } from '../Tidsperioden';
import { Uttaksdagen } from '../Uttaksdagen';
import { Perioden } from '../Perioden';
import { getOffentligeFridager } from 'common/util/fridagerUtils';
import { Tidsperiode, StønadskontoType } from 'common/types';
import { Søknadsinfo } from 'app/selectors/types';
import { getUttaksstatus } from '../uttaksstatus';
import { justerAndrePartsUttakAvFellesperiodeOmMulig } from '../uttakUtils';

export const UttaksplanBuilder = (
    perioder: Periode[],
    familiehendelsesdato: Date,
    søknadsinfo: Søknadsinfo,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    opprinneligPlan?: Periode[]
) => {
    return new UttaksplanAutoBuilder(
        perioder,
        familiehendelsesdato,
        søknadsinfo,
        tilgjengeligeStønadskontoer,
        opprinneligPlan
    );
};

const periodeHasValidTidsrom = (periode: Periode): boolean =>
    periode.tidsperiode.fom !== undefined && periode.tidsperiode.tom !== undefined;

const clonePeriode = (periode: Periode): Periode => ({ ...periode, tidsperiode: { ...periode.tidsperiode } });

class UttaksplanAutoBuilder {
    protected familiehendelsesdato: Date;
    protected opprinneligPlan: Periode[] | undefined;
    protected søknadsinfo: Søknadsinfo;
    protected tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];

    public constructor(
        public perioder: Periode[],
        familiehendelsesdato: Date,
        søknadsinfo: Søknadsinfo,
        tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
        opprinneligPlan?: Periode[]
    ) {
        this.perioder = perioder;
        this.familiehendelsesdato = familiehendelsesdato;
        this.opprinneligPlan = opprinneligPlan;
        this.søknadsinfo = søknadsinfo;
        this.tilgjengeligeStønadskontoer = tilgjengeligeStønadskontoer;
    }

    buildUttaksplan() {
        const perioderFørFamDato = Periodene(this.perioder).getPerioderFørFamiliehendelsesdato(
            this.familiehendelsesdato
        );

        // Fjern perioder med andre parts eventuelle samtidige uttak og erstatt de med hull
        const perioderEtterFamDato = finnOgSettInnHull(
            Periodene(this.perioder)
                .getPerioderEtterFamiliehendelsesdato(this.familiehendelsesdato)
                .filter((p) => !(isUttakAnnenPart(p) && p.ønskerSamtidigUttak))
                .sort(sorterPerioder),
            this.familiehendelsesdato
        );

        const perioderMedUgyldigTidsperiode = Periodene(this.perioder).getPerioderMedUgyldigTidsperiode();

        const utsettelser = Periodene(perioderEtterFamDato).getUtsettelser();
        const opphold = Periodene(perioderEtterFamDato).getOpphold();
        const hullOgInfo = Periodene(perioderEtterFamDato).getHullOgInfo();
        const uttaksperioder = Periodene(perioderEtterFamDato).getUttak();
        const overføringer = Periodene(perioderEtterFamDato).getOverføringer();
        const foreldrepengerFørTermin = Periodene(perioderFørFamDato).getForeldrepengerFørTermin();

        this.perioder = resetTidsperioder([...uttaksperioder, ...overføringer]);

        const fastePerioder: Periode[] = [...opphold, ...utsettelser, ...hullOgInfo].sort(sorterPerioder);
        this.perioder = [...settInnPerioder(this.perioder, fastePerioder)];

        this.finnOgSettInnHull();
        if (this.opprinneligPlan) {
            this.finnOgErstattHullMedOpprinneligPlan();
            this.settInnOpprinneligeInfoPerioderUtenforPlan();
        }
        this.slåSammenLikePerioder();
        if (foreldrepengerFørTermin === undefined) {
            this.fjernHullPåStarten();
        }
        this.fjernHullPåSlutten();
        this.sort();
        this.konverterAnnenPartsPlanTilSamtidigUttakHvisSøkerHarLagtInnSamtidigUttak();
        this.settInnSamtidigUttakAnnenPartFraOpprinneligPlan();
        const uttaksstatus = getUttaksstatus(this.søknadsinfo, this.tilgjengeligeStønadskontoer, this.perioder);
        this.perioder = justerAndrePartsUttakAvFellesperiodeOmMulig(
            this.perioder,
            uttaksstatus.uttak.find((u) => u.konto === StønadskontoType.Fellesperiode)
        );
        this.finnOgSettInnHull();

        this.perioder = [
            ...perioderFørFamDato.filter((p) => isOverskrivbarPeriode(p) === false),
            ...this.perioder,
            ...perioderMedUgyldigTidsperiode
        ];
        return this;
    }

    leggTilPeriodeOgBuild(periode: Periode) {
        this.slåSammenLikePerioder();
        this.justerOverskrivbarePerioderRundtPeriode(periode);
        if (
            periode.type === Periodetype.Utsettelse &&
            periode.årsak === UtsettelseÅrsakType.Ferie &&
            Tidsperioden(periode.tidsperiode).getAntallFridager() > 0
        ) {
            this.perioder = settInnFerieMedHelligdager(this.perioder, periode);
        } else {
            this.perioder = settInnPeriode(this.perioder, {
                ...periode
            });
        }
        this.buildUttaksplan();
        return this;
    }

    konverterAnnenPartsPlanTilSamtidigUttakHvisSøkerHarLagtInnSamtidigUttak() {
        const samtidigUttakIPlanen = this.perioder.filter((p) => isUttaksperiode(p) && p.ønskerSamtidigUttak);
        const opprinneligUttakAnnenPart = this.opprinneligPlan
            ? this.opprinneligPlan.filter((p) => isUttakAnnenPart(p) && !p.ønskerSamtidigUttak)
            : [];

        if (opprinneligUttakAnnenPart.length === 0) {
            return this;
        }

        samtidigUttakIPlanen.forEach((p) => {
            const overlappendeUttak = Periodene(opprinneligUttakAnnenPart).finnOverlappendePerioder(p);

            if (overlappendeUttak.length === 0) {
                return;
            }

            overlappendeUttak.forEach((op: UttakAnnenPartInfoPeriode) => {
                const nyPeriode: UttakAnnenPartInfoPeriode = {
                    ...op,
                    id: guid(),
                    ønskerSamtidigUttak: true,
                    visPeriodeIPlan: false,
                    samtidigUttakProsent: '50',
                    tidsperiode: {
                        fom: moment(p.tidsperiode.fom).isSameOrAfter(moment(op.tidsperiode.fom))
                            ? p.tidsperiode.fom
                            : op.tidsperiode.fom,
                        tom: moment(p.tidsperiode.tom).isSameOrBefore(moment(op.tidsperiode.tom))
                            ? p.tidsperiode.tom
                            : op.tidsperiode.tom
                    }
                };

                this.perioder.push(nyPeriode);
                return;
            });
        });

        this.sort();
        return this;
    }

    settInnSamtidigUttakAnnenPartFraOpprinneligPlan() {
        const samtidigUttakIPlanen = this.perioder.filter((p) => isUttaksperiode(p) && p.ønskerSamtidigUttak);
        const opprinneligSamtidigUttakAnnenPart = this.opprinneligPlan
            ? this.opprinneligPlan.filter((p) => isUttakAnnenPart(p) && p.ønskerSamtidigUttak)
            : [];

        if (opprinneligSamtidigUttakAnnenPart.length === 0) {
            return this;
        }

        samtidigUttakIPlanen.forEach((p) => {
            const overlappendeSamtidigUttak = Periodene(opprinneligSamtidigUttakAnnenPart).finnOverlappendePerioder(p);

            if (overlappendeSamtidigUttak.length === 0) {
                return;
            }

            overlappendeSamtidigUttak.forEach((op: UttakAnnenPartInfoPeriode) => {
                this.perioder.push({
                    ...op,
                    id: guid(),
                    visPeriodeIPlan: false,
                    tidsperiode: {
                        fom: moment(p.tidsperiode.fom).isSameOrAfter(moment(op.tidsperiode.fom))
                            ? p.tidsperiode.fom
                            : op.tidsperiode.fom,
                        tom: moment(p.tidsperiode.tom).isSameOrBefore(moment(op.tidsperiode.tom))
                            ? p.tidsperiode.tom
                            : op.tidsperiode.tom
                    }
                });
                return;
            });
        });

        this.sort();
        return this;
    }

    oppdaterPeriodeOgBuild(periode: Periode) {
        const oldPeriode = periode.id ? Periodene(this.perioder).getPeriode(periode.id) : undefined;

        if (!oldPeriode) {
            throw new Error('Periode for endring ikke funnet');
        }
        if (isValidTidsperiode(periode.tidsperiode) && isValidTidsperiode(oldPeriode.tidsperiode) === false) {
            this.slettPeriodeOgBuild(oldPeriode);
            this.leggTilPeriodeOgBuild(periode);
        }
        if (Tidsperioden(periode.tidsperiode).erFomEllerEtterDato(this.familiehendelsesdato)) {
            this.oppdaterPerioderVedEndretPeriode(periode, oldPeriode);
        }

        this.erstattPeriode(periode).buildUttaksplan();

        return this;
    }

    slettPeriodeOgBuild(periode: Periode) {
        this.slettPeriode(periode, skalSlettetPeriodeErstattesMedHull(periode, this.perioder)).buildUttaksplan();
        return this;
    }

    finnOgErstattHullMedOpprinneligPlan() {
        const perioder = this.perioder;
        const opprinneligPlan = this.opprinneligPlan;
        const opprinneligePerioderSomSkalLeggesInnIPlan: Periode[] = [];
        if (perioder && perioder.length > 0 && opprinneligPlan) {
            this.perioder.filter(isHull).forEach((hull) => {
                const opprinneligePerioder = Periodene(
                    opprinneligPlan.filter((p) => isInfoPeriode(p) === true)
                ).finnOverlappendePerioder(hull);
                const hullErFørstePeriodeIPlanen = this.perioder.indexOf(hull) === 0;
                opprinneligePerioder.forEach((periode) => {
                    const op: Periode = {
                        ...periode,
                        id: guid(),
                        tidsperiode: {
                            fom: hullErFørstePeriodeIPlanen
                                ? periode.tidsperiode.fom
                                : moment.max([moment(hull.tidsperiode.fom), moment(periode.tidsperiode.fom)]).toDate(),
                            tom: moment.min([moment(hull.tidsperiode.tom), moment(periode.tidsperiode.tom)]).toDate()
                        }
                    };

                    if (isUttakAnnenPart(op) && op.ønskerSamtidigUttak) {
                        const infoPeriode: UttakAnnenPartInfoPeriode = { ...op, visPeriodeIPlan: true };
                        opprinneligePerioderSomSkalLeggesInnIPlan.push(infoPeriode);
                    } else {
                        opprinneligePerioderSomSkalLeggesInnIPlan.push(op);
                    }
                });
            });
            const nyPlan: Periode[] = [...perioder].filter((p) => !isHull(p));
            this.perioder = finnOgSettInnHull(settInnPerioder(nyPlan, opprinneligePerioderSomSkalLeggesInnIPlan));
        }

        return this;
    }

    settInnOpprinneligeInfoPerioderUtenforPlan() {
        if (this.opprinneligPlan && this.perioder.length > 0) {
            const førstePeriode = this.perioder[0];
            const sistePeriode = this.perioder[this.perioder.length - 1];

            const opprinneligePerioderFørFørstePeriode = this.opprinneligPlan
                .filter((p) => Perioden(p).starterFør(førstePeriode.tidsperiode.fom))
                .filter(isInfoPeriode || isGruppertInfoPeriode)
                .map((p) => {
                    if (Perioden(p).slutterSammeDagEllerEtter(førstePeriode.tidsperiode.fom)) {
                        return {
                            ...p,
                            tidsperiode: {
                                fom: p.tidsperiode.fom,
                                tom: Uttaksdagen(førstePeriode.tidsperiode.fom).forrige()
                            }
                        };
                    }
                    return clonePeriode(p);
                });

            this.perioder = [
                ...opprinneligePerioderFørFørstePeriode,
                ...this.perioder,
                ...this.opprinneligPlan
                    .filter((p) => moment(p.tidsperiode.fom).isAfter(sistePeriode.tidsperiode.tom, 'day'))
                    .filter(isInfoPeriode || isGruppertInfoPeriode)
                    .map(clonePeriode)
            ];
        }
        return this;
    }

    private slettPeriode(periode: Periode, erstattMedHull?: boolean) {
        this.perioder = this.perioder.filter((p) => p.id !== periode.id);
        if (erstattMedHull) {
            this.perioder.push({
                id: guid(),
                type: Periodetype.Hull,
                tidsperiode: { ...periode.tidsperiode }
            });
        }
        return this;
    }

    private erstattPeriode(periode: Periode) {
        this.perioder = this.perioder.map((p) => (p.id === periode.id ? periode : p));
        const periodeSomSkalSettesInn: Periode[] =
            periode.type === Periodetype.Utsettelse &&
            periode.årsak === UtsettelseÅrsakType.Ferie &&
            Perioden(periode).inneholderFridager()
                ? splittPeriodeMedHelligdager(periode)
                : [periode];

        const idx = this.perioder.findIndex((p) => p.id === periode.id);
        this.perioder = [...this.perioder.slice(0, idx), ...periodeSomSkalSettesInn, ...this.perioder.slice(idx + 1)];
        return this;
    }
    private oppdaterPerioderVedEndretPeriode(periode: Periode, oldPeriode: Periode) {
        if (Tidsperioden(periode.tidsperiode).erLik(oldPeriode.tidsperiode)) {
            return this;
        }
        this.justerOverskrivbarePerioderRundtPeriode(periode);
        const nyePeriodehull = periodeHasValidTidsrom(periode)
            ? finnHullVedEndretTidsperiode(oldPeriode, periode)
            : undefined;
        if (nyePeriodehull) {
            this.perioder = this.perioder.concat(nyePeriodehull);
            this.sort();
        }
        return this;
    }

    private justerOverskrivbarePerioderRundtPeriode(periode: Periode) {
        this.perioder = fjernOverskrivbarePerioderIPeriodetidsrom(this.perioder, periode);
        return this;
    }

    private slåSammenLikePerioder() {
        this.perioder = slåSammenLikePerioder(this.perioder);
        return this;
    }

    private fjernHullPåStarten() {
        while (this.perioder.findIndex((p) => p.type === Periodetype.Hull) === 0) {
            this.perioder.shift();
        }
        return this;
    }

    private fjernHullPåSlutten() {
        this.perioder.reverse();
        this.fjernHullPåStarten();
        this.perioder.reverse();
        return this;
    }

    private finnOgSettInnHull() {
        this.perioder = finnOgSettInnHull(this.perioder, this.familiehendelsesdato);
        return this;
    }

    private sort() {
        this.perioder.sort(sorterPerioder);
        return this;
    }
}

function fjernOverskrivbarePerioderIPeriodetidsrom(perioder: Periode[], periode: Periode): Periode[] {
    const nyePerioder: Periode[] = perioder.filter((p) => isOverskrivbarPeriode(p) === false);
    const overskrivbarePerioder = perioder.filter((p) => isOverskrivbarPeriode(p));
    overskrivbarePerioder.forEach((overskrivbarPeriode) => {
        if (isUttakAnnenPart(overskrivbarPeriode) && overskrivbarPeriode.ønskerSamtidigUttak) {
            nyePerioder.push(overskrivbarPeriode);

            return;
        }

        if (Tidsperioden(overskrivbarPeriode.tidsperiode).erOmsluttetAv(periode.tidsperiode)) {
            return;
        } else if (Tidsperioden(overskrivbarPeriode.tidsperiode).erUtenfor(periode.tidsperiode)) {
            nyePerioder.push(overskrivbarPeriode);
        } else if (moment(overskrivbarPeriode.tidsperiode.fom).isBefore(periode.tidsperiode.fom, 'day')) {
            nyePerioder.push({
                ...overskrivbarPeriode,
                tidsperiode: {
                    fom: overskrivbarPeriode.tidsperiode.fom,
                    tom: Uttaksdagen(periode.tidsperiode.fom).forrige()
                }
            });
            if (moment(overskrivbarPeriode.tidsperiode.tom).isAfter(periode.tidsperiode.tom, 'day')) {
                nyePerioder.push({
                    ...overskrivbarPeriode,
                    id: guid(),
                    tidsperiode: {
                        fom: Uttaksdagen(periode.tidsperiode.tom).neste(),
                        tom: overskrivbarPeriode.tidsperiode.tom
                    }
                });
            }
        } else {
            nyePerioder.push({
                ...overskrivbarPeriode,
                tidsperiode: {
                    fom: Uttaksdagen(periode.tidsperiode.tom).neste(),
                    tom: overskrivbarPeriode.tidsperiode.tom
                }
            });
        }
    });
    return nyePerioder;
}

function settInnPerioder(perioder: Periode[], fastePerioder: Periode[]): Periode[] {
    if (perioder.length === 0) {
        return fastePerioder;
    }
    let nyePerioder: Periode[] = [...perioder];
    fastePerioder.sort(sorterPerioder).forEach((periode) => {
        nyePerioder = settInnPeriode(nyePerioder, periode);
    });
    return nyePerioder.sort(sorterPerioder);
}

function settInnPerioderInnITidsrom(
    perioder: Periode[],
    perioderSomSkalSettesInn: Periode[],
    tidsperiode: Tidsperiode
): Periode[] {
    const placeholderPeriode: PeriodeHull = {
        id: guid(),
        type: Periodetype.Hull,
        tidsperiode
    };
    const nyePerioder = settInnPeriode(perioder, placeholderPeriode);
    return [...nyePerioder.filter((p) => p.id !== placeholderPeriode.id), ...perioderSomSkalSettesInn];
}

function settInnPeriode(perioder: Periode[], nyPeriode: Periode): Periode[] {
    if (perioder.length === 0) {
        return [nyPeriode];
    }
    const berørtePerioder = Periodene(perioder).finnOverlappendePerioder(nyPeriode);
    const periodeSomMåSplittes = Periodene(perioder).finnPeriodeMedDato(nyPeriode.tidsperiode.fom);
    if (berørtePerioder.length === 0 && !periodeSomMåSplittes) {
        const nyPeriodeliste = [...perioder, nyPeriode].sort(sorterPerioder);
        if (nyPeriodeliste[nyPeriodeliste.length - 1].id === nyPeriode.id) {
            return finnOgSettInnHull(nyPeriodeliste);
        }
        return nyPeriodeliste;
    }

    if (!periodeSomMåSplittes) {
        const foregåendePeriode = Periodene(perioder)
            .finnAlleForegåendePerioder(nyPeriode)
            .pop();
        if (foregåendePeriode) {
            return leggTilPeriodeEtterPeriode(perioder, foregåendePeriode, nyPeriode);
        }
        return leggTilPeriodeFørPeriode(perioder, perioder[0], nyPeriode);
    }

    if (Perioden(periodeSomMåSplittes).erUtsettelse()) {
        throw new Error('Kan ikke dele opp en utsettelse');
    }
    if (moment(periodeSomMåSplittes.tidsperiode.fom).isSame(nyPeriode.tidsperiode.fom, 'day')) {
        return leggTilPeriodeEtterPeriode(perioder, periodeSomMåSplittes, nyPeriode);
    } else {
        return leggTilPeriodeIPeriode(perioder, periodeSomMåSplittes, nyPeriode);
    }
}

export function finnHullIPerioder(perioder: Periode[], startdato?: Date): PeriodeHull[] {
    const hull: PeriodeHull[] = [];
    const len = perioder.length;

    if (startdato && len > 0 && perioder[0].type !== Periodetype.Hull) {
        const fom = Uttaksdagen(startdato).denneEllerNeste();
        const uttagsdagerMellomStartOgFørstePeriode = Tidsperioden({
            fom,
            tom: Uttaksdagen(perioder[0].tidsperiode.fom).forrige()
        }).getAntallUttaksdager();
        if (uttagsdagerMellomStartOgFørstePeriode > 0) {
            hull.push(getNyttPeriodehull(getTidsperiode(fom, uttagsdagerMellomStartOgFørstePeriode)));
        }
    }
    perioder.forEach((periode, idx) => {
        if (idx === len - 1) {
            return;
        }
        const nestePeriode = perioder[idx + 1];

        const tidsperiodeMellomPerioder: Tidsperiode = {
            fom: Uttaksdagen(periode.tidsperiode.tom).neste(),
            tom: Uttaksdagen(nestePeriode.tidsperiode.fom).forrige()
        };
        if (moment(tidsperiodeMellomPerioder.tom).isBefore(tidsperiodeMellomPerioder.fom, 'day')) {
            return;
        }

        const uttaksdagerITidsperiode = Tidsperioden(tidsperiodeMellomPerioder).getAntallUttaksdager();

        if (uttaksdagerITidsperiode > 0) {
            hull.push({
                id: guid(),
                type: Periodetype.Hull,
                tidsperiode: tidsperiodeMellomPerioder
            });
        }
    });
    return hull;
}

function resetTidsperioder(perioder: Periode[]): Periode[] {
    let forrigePeriode: Periode;
    const sammenslåttePerioder = slåSammenLikePerioder(perioder.sort(sorterPerioder));
    const resattePerioder = sammenslåttePerioder.map((periode) => {
        if (forrigePeriode === undefined) {
            forrigePeriode = periode;
            return periode;
        }
        forrigePeriode = {
            ...periode,
            tidsperiode: getTidsperiode(
                Uttaksdagen(forrigePeriode.tidsperiode.tom).neste(),
                Tidsperioden(periode.tidsperiode).getAntallUttaksdager()
            )
        };
        return {
            ...periode,
            tidsperiode: { ...forrigePeriode.tidsperiode }
        };
    });

    return resattePerioder;
}

export function slåSammenLikePerioder(perioder: Periode[]): Periode[] {
    if (perioder.length <= 1) {
        return perioder;
    }
    const nyePerioder: Periode[] = [];
    let forrigePeriode: Periode | undefined = { ...perioder[0] };
    perioder.forEach((periode, index) => {
        if (index === 0) {
            return;
        }
        if (forrigePeriode === undefined) {
            forrigePeriode = periode;
            return;
        }
        if (Perioden(forrigePeriode).erLik(periode) && Perioden(forrigePeriode).erSammenhengende(periode)) {
            forrigePeriode.tidsperiode.tom = periode.tidsperiode.tom;
            return;
        } else {
            nyePerioder.push(forrigePeriode);
            forrigePeriode = undefined;
        }
        forrigePeriode = periode;
    });
    nyePerioder.push(forrigePeriode);

    return nyePerioder;
}

function leggTilPeriodeEtterPeriode(perioder: Periode[], periode: Periode, nyPeriode: Periode): Periode[] {
    if (isInfoPeriode(nyPeriode)) {
        return perioder;
    }

    const perioderFør = Periodene(perioder).finnAlleForegåendePerioder(periode);
    const perioderEtter = Periodene(perioder).finnAllePåfølgendePerioder(periode);
    const uttaksdager: number =
        (isUttakAnnenPart(nyPeriode) && nyPeriode.ønskerSamtidigUttak) ||
        (isUttaksperiode(nyPeriode) && nyPeriode.ønskerSamtidigUttak)
            ? 0
            : Tidsperioden(nyPeriode.tidsperiode).getAntallUttaksdager();
    return [...perioderFør, ...[nyPeriode], ...Periodene([periode, ...perioderEtter]).forskyvPerioder(uttaksdager)];
}

function leggTilPeriodeFørPeriode(perioder: Periode[], periode: Periode, nyPeriode: Periode): Periode[] {
    if (isInfoPeriode(nyPeriode)) {
        return perioder;
    }

    const perioderEtter = Periodene(perioder).finnAllePåfølgendePerioder(periode);
    const uttaksdager: number =
        isUttaksperiode(nyPeriode) && nyPeriode.ønskerSamtidigUttak
            ? 0
            : Tidsperioden(nyPeriode.tidsperiode).getAntallUttaksdager();
    return [...[nyPeriode], ...Periodene([periode, ...perioderEtter]).forskyvPerioder(uttaksdager)];
}

function leggTilPeriodeIPeriode(perioder: Periode[], periode: Periode, nyPeriode: Periode): Periode[] {
    if (isInfoPeriode(nyPeriode)) {
        return perioder;
    }

    const perioderFør = Periodene(perioder).finnAlleForegåendePerioder(periode);
    const perioderEtter = Periodene(perioder).finnAllePåfølgendePerioder(periode);
    const splittetPeriode = splittPeriodeMedPeriode(periode, nyPeriode);
    const opprinneligVarighet = Perioden(periode).getAntallUttaksdager();
    const nyVarighet = Tidsperioden({
        fom: splittetPeriode[0].tidsperiode.fom,
        tom: splittetPeriode[2].tidsperiode.tom // Ta høyde for at split inneholdt opphold
    }).getAntallUttaksdager();
    const uttaksdager = nyVarighet - opprinneligVarighet;
    return [...perioderFør, ...splittetPeriode, ...Periodene(perioderEtter).forskyvPerioder(uttaksdager)];
}

function splittPeriodeMedPeriode(periode: Periode, nyPeriode: Periode): Periode[] {
    const dagerIPeriode = Tidsperioden(periode.tidsperiode).getAntallUttaksdager();
    const dagerForsteDel = Tidsperioden({
        fom: periode.tidsperiode.fom,
        tom: Uttaksdagen(nyPeriode.tidsperiode.fom).forrige()
    }).getAntallUttaksdager();
    let dagerSisteDel = dagerIPeriode - dagerForsteDel;
    const forste: Periode = {
        ...periode,
        tidsperiode: {
            fom: periode.tidsperiode.fom,
            tom: Uttaksdagen(nyPeriode.tidsperiode.fom).forrige()
        }
    };
    const midt: Periode = {
        ...nyPeriode,
        tidsperiode: {
            fom: Uttaksdagen(nyPeriode.tidsperiode.fom).denneEllerNeste(),
            tom: Uttaksdagen(nyPeriode.tidsperiode.tom).denneEllerNeste()
        }
    };
    const startSisteDel: Date = Uttaksdagen(midt.tidsperiode.tom).neste();

    if (Perioden(periode).erOpphold()) {
        dagerSisteDel = dagerSisteDel - Perioden(midt).getAntallUttaksdager();
    }

    const siste: Periode = {
        ...periode,
        id: guid(),
        tidsperiode: getTidsperiode(startSisteDel, dagerSisteDel)
    };
    return [forste, midt, siste];
}

function finnHullVedEndretTidsperiode(oldPeriode: Periode, periode: Periode): PeriodeHull[] | undefined {
    if (periodeHasValidTidsrom(periode) === false || periodeHasValidTidsrom(oldPeriode) === false) {
        return undefined;
    }
    /*
     TODO - sjekk at ikke opphold kolliderer med andre perioder
     */
    const periodehull: PeriodeHull[] = [];
    const diffStartdato = Uttaksdagen(oldPeriode.tidsperiode.fom).getUttaksdagerFremTilDato(periode.tidsperiode.fom);
    if (diffStartdato > 0) {
        periodehull.push(getNyttPeriodehull(getTidsperiode(oldPeriode.tidsperiode.fom, diffStartdato)));
    }
    const diffSluttdato = Uttaksdagen(oldPeriode.tidsperiode.tom).getUttaksdagerFremTilDato(periode.tidsperiode.tom);
    if (diffSluttdato < 0) {
        periodehull.push(
            getNyttPeriodehull({
                fom: Uttaksdagen(periode.tidsperiode.tom).neste(),
                tom: oldPeriode.tidsperiode.tom
            })
        );
    }
    return periodehull.length > 0 ? periodehull : undefined;
}

function skalSlettetPeriodeErstattesMedHull(periode: Periode, perioder: Periode[]): boolean {
    if (periode.type === Periodetype.Hull) {
        return false;
    }
    const idx = perioder.findIndex((p) => p.id === periode.id);
    if (idx === 0 || idx === perioder.length - 1) {
        return false;
    }
    return periode.type !== Periodetype.Utsettelse;
}

export function finnOgSettInnHull(perioder: Periode[], startdato?: Date): Periode[] {
    const hull = finnHullIPerioder(perioder, startdato);
    return [...perioder, ...hull].sort(sorterPerioder);
}

function settInnFerieMedHelligdager(perioder: Periode[], periode: Periode) {
    const splittetPeriode = splittPeriodeMedHelligdager(periode);
    return settInnPerioderInnITidsrom(perioder, splittetPeriode, periode.tidsperiode);
}

const getNyttPeriodehull = (tidsperiode: Tidsperiode, årsak?: PeriodeHullÅrsak): PeriodeHull => ({
    id: guid(),
    type: Periodetype.Hull,
    tidsperiode,
    årsak
});

export function splittPeriodeMedHelligdager(periode: Periode): Periode[] {
    const nyePerioder: Periode[] = [];
    const { tidsperiode } = periode;
    const friperioder = getFriperioderITidsperiode(tidsperiode);
    let fom = periode.tidsperiode.fom;
    friperioder.forEach((friperiode, idx) => {
        if (moment(friperiode.fom).isSame(fom, 'day')) {
            nyePerioder.push(getNyttPeriodehull(friperiode, PeriodeHullÅrsak.Fridag));
            fom = Uttaksdagen(friperiode.tom).neste();
        } else {
            nyePerioder.push({
                ...periode,
                id: guid(),
                tidsperiode: {
                    fom,
                    tom: Uttaksdagen(friperiode.fom).forrige()
                }
            });
            nyePerioder.push(getNyttPeriodehull(friperiode, PeriodeHullÅrsak.Fridag));
            fom = Uttaksdagen(friperiode.tom).neste();
        }
    });
    if (moment(fom).isSameOrBefore(tidsperiode.tom, 'day')) {
        nyePerioder.push({
            ...periode,
            id: guid(),
            tidsperiode: {
                fom,
                tom: tidsperiode.tom
            }
        });
    }
    return nyePerioder;
}

export function getFriperioderITidsperiode(tidsperiode: Tidsperiode): Tidsperiode[] {
    const friperioder: Tidsperiode[] = [];
    const fridagerIPerioden = getOffentligeFridager(tidsperiode).filter((d) => Uttaksdagen(d.date).erUttaksdag());
    if (fridagerIPerioden.length === 0) {
        return [];
    }

    let fom: Date = moment(fridagerIPerioden[0].date).toDate();
    const antallFridager = fridagerIPerioden.length;
    fridagerIPerioden.forEach((fridag, idx: number) => {
        if (idx === antallFridager - 1 && fom) {
            friperioder.push({
                fom,
                tom: moment(fridagerIPerioden[idx].date).toDate()
            });
        } else {
            const nextDate = moment(fridagerIPerioden[idx + 1].date).toDate();
            if (
                moment(fom)
                    .add(24, 'hours')
                    .isSame(nextDate, 'day') === false
            ) {
                friperioder.push({
                    fom,
                    tom: moment(fridag.date).toDate()
                });
                fom = nextDate;
            }
        }
    });

    return friperioder;
}
