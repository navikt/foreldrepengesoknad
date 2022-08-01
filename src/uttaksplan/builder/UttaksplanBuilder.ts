import { TidsperiodeDate } from '@navikt/fp-common';
import { Perioden } from 'app/steps/uttaksplan-info/utils/Perioden';
import { Periodene, sorterPerioder } from 'app/steps/uttaksplan-info/utils/Periodene';
import { getTidsperiode, isValidTidsperiode, Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { førsteOktober2021ReglerGjelder } from 'app/utils/dateUtils';
import { getFloatFromString } from 'app/utils/numberUtils';
import dayjs from 'dayjs';
import { guid } from 'nav-frontend-js-utils';
import {
    isHull,
    isInfoPeriode,
    isOppholdsperiode,
    isOverskrivbarPeriode,
    isPeriodeUtenUttak,
    isUtsettelsesperiode,
    isUttakAnnenPart,
    isUttaksperiode,
    Periode,
    PeriodeHull,
    Periodetype,
    PeriodeUtenUttak,
    UttakAnnenPartInfoPeriode,
} from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { PeriodeHullÅrsak } from 'uttaksplan/types/PeriodeHullÅrsak';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import { Uttaksstatus } from 'uttaksplan/utils/uttaksstatus';
import { getOffentligeFridager } from 'app/utils/fridagerUtils';
import { justerAndrePartsUttakAvFellesperiodeOmMulig } from 'uttaksplan/utils/periodeUtils';

export const UttaksplanBuilder = (
    getUttaksstatusFunc: () => Uttaksstatus,
    perioder: Periode[],
    familiehendelsesdato: Date,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    erFlerbarnssøknad: boolean,
    erEndringsøknadUtenEkisterendeSak: boolean,
    relevantStartDatoForUttak: Date | undefined,
    harMidlertidigOmsorg: boolean,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    opprinneligPlan?: Periode[]
) => {
    return new UttaksplanAutoBuilder(
        perioder,
        familiehendelsesdato,
        tilgjengeligeStønadskontoer,
        getUttaksstatusFunc,
        erFlerbarnssøknad,
        erEndringsøknadUtenEkisterendeSak,
        relevantStartDatoForUttak,
        harMidlertidigOmsorg,
        harAktivitetskravIPeriodeUtenUttak,
        erAdopsjon,
        opprinneligPlan
    );
};

const periodeHasValidTidsrom = (periode: Periode): boolean =>
    periode.tidsperiode.fom !== undefined && periode.tidsperiode.tom !== undefined;

const clonePeriode = (periode: Periode): Periode => ({ ...periode, tidsperiode: { ...periode.tidsperiode } });

class UttaksplanAutoBuilder {
    protected familiehendelsesdato: Date;
    protected opprinneligPlan: Periode[] | undefined;
    protected tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    protected getUttaksstatusFunc: () => Uttaksstatus;
    protected erFlerbarnssøknad: boolean;
    protected erEndringsøknadUtenEkisterendeSak: boolean;
    protected relevantStartDatoForUttak: Date | undefined;
    protected harMidlertidigOmsorg: boolean;
    protected harAktivitetskravIPeriodeUtenUttak: boolean;
    protected erAdopsjon: boolean;

    public constructor(
        public perioder: Periode[],
        familiehendelsesdato: Date,
        tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
        getUttaksstatusFunc: () => Uttaksstatus,
        erFlerbarnssøknad: boolean,
        erEndringsøknadUtenEkisterendeSak: boolean,
        relevantStartDatoForUttak: Date | undefined,
        harMidlertidigOmsorg: boolean,
        harAktivitetskravIPeriodeUtenUttak: boolean,
        erAdopsjon: boolean,
        opprinneligPlan?: Periode[]
    ) {
        this.perioder = perioder;
        this.familiehendelsesdato = familiehendelsesdato;
        this.opprinneligPlan = opprinneligPlan;
        this.tilgjengeligeStønadskontoer = tilgjengeligeStønadskontoer;
        this.getUttaksstatusFunc = getUttaksstatusFunc;
        this.erFlerbarnssøknad = erFlerbarnssøknad;
        this.relevantStartDatoForUttak = relevantStartDatoForUttak;
        this.erEndringsøknadUtenEkisterendeSak = erEndringsøknadUtenEkisterendeSak;
        this.harMidlertidigOmsorg = harMidlertidigOmsorg;
        this.harAktivitetskravIPeriodeUtenUttak = harAktivitetskravIPeriodeUtenUttak;
        this.erAdopsjon = erAdopsjon;
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
            this.erEndringsøknadUtenEkisterendeSak,
            this.harMidlertidigOmsorg,
            this.harAktivitetskravIPeriodeUtenUttak,
            this.familiehendelsesdato,
            this.erAdopsjon,
            this.relevantStartDatoForUttak || this.familiehendelsesdato
        );

        const perioderMedUgyldigTidsperiode = Periodene(this.perioder).getPerioderMedUgyldigTidsperiode();

        const utsettelser = Periodene(perioderEtterFamDato).getUtsettelser();
        const opphold = Periodene(perioderEtterFamDato).getOpphold();
        const hullOgInfoOgPerioderUtenUttak = Periodene(perioderEtterFamDato).getHullOgInfoOgPerioderUtenUttak();
        const uttaksperioder = Periodene(perioderEtterFamDato).getUttak();
        const overføringer = Periodene(perioderEtterFamDato).getOverføringer();
        const foreldrepengerFørTermin = Periodene(perioderFørFamDato).getForeldrepengerFørTermin();

        this.perioder = resetTidsperioder([...uttaksperioder, ...overføringer]);

        const fastePerioder: Periode[] = [...opphold, ...utsettelser, ...hullOgInfoOgPerioderUtenUttak].sort(
            sorterPerioder
        );
        this.perioder = [
            ...settInnPerioder(
                this.perioder,
                fastePerioder,
                this.erEndringsøknadUtenEkisterendeSak,
                this.harMidlertidigOmsorg,
                this.harAktivitetskravIPeriodeUtenUttak,
                this.familiehendelsesdato,
                this.erAdopsjon
            ),
        ];

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
        const uttaksstatus = this.getUttaksstatusFunc();
        this.perioder = justerAndrePartsUttakAvFellesperiodeOmMulig(
            this.perioder,
            uttaksstatus.uttak.find((u) => u.konto === StønadskontoType.Fellesperiode)
        );
        this.finnOgSettInnHull();

        this.perioder = [
            ...perioderFørFamDato.filter((p) => isOverskrivbarPeriode(p) === false),
            ...this.perioder,
            ...perioderMedUgyldigTidsperiode,
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
            this.perioder = settInnFerieMedHelligdager(
                this.perioder,
                periode,
                this.erEndringsøknadUtenEkisterendeSak,
                this.harMidlertidigOmsorg,
                this.familiehendelsesdato,
                this.harAktivitetskravIPeriodeUtenUttak,
                this.erAdopsjon
            );
        } else {
            this.perioder = settInnPeriode(
                this.perioder,
                {
                    ...periode,
                },
                this.erEndringsøknadUtenEkisterendeSak,
                this.harMidlertidigOmsorg,
                this.harAktivitetskravIPeriodeUtenUttak,
                this.familiehendelsesdato,
                this.erAdopsjon
            );
        }
        this.buildUttaksplan();
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
        this.slettPeriode(periode, skalSlettetPeriodeErstattesMedHull(periode, this.perioder, true)).buildUttaksplan();
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

            overlappendeUttak.forEach((op) => {
                if (isUttakAnnenPart(op)) {
                    const nyPeriode: UttakAnnenPartInfoPeriode = {
                        ...op,
                        id: guid(),
                        ønskerSamtidigUttak: true,
                        visPeriodeIPlan: false,
                        samtidigUttakProsent: isUttaksperiode(p)
                            ? this.beregnSamtidigUttaksprosent(p.samtidigUttakProsent, op.samtidigUttakProsent)
                            : Dekningsgrad.HUNDRE_PROSENT,
                        tidsperiode: {
                            fom: dayjs(p.tidsperiode.fom).isSameOrAfter(dayjs(op.tidsperiode.fom), 'day')
                                ? p.tidsperiode.fom
                                : op.tidsperiode.fom,
                            tom: dayjs(p.tidsperiode.tom).isSameOrBefore(dayjs(op.tidsperiode.tom), 'day')
                                ? p.tidsperiode.tom
                                : op.tidsperiode.tom,
                        },
                    };

                    this.perioder.push(nyPeriode);
                    return;
                }
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

            overlappendeSamtidigUttak.forEach((op) => {
                if (isUttakAnnenPart(op)) {
                    this.perioder.push({
                        ...op,
                        id: guid(),
                        visPeriodeIPlan: false,
                        samtidigUttakProsent: isUttaksperiode(p)
                            ? this.beregnSamtidigUttaksprosent(p.samtidigUttakProsent, op.samtidigUttakProsent)
                            : Dekningsgrad.HUNDRE_PROSENT,
                        tidsperiode: {
                            fom: dayjs(p.tidsperiode.fom).isSameOrAfter(dayjs(op.tidsperiode.fom), 'day')
                                ? p.tidsperiode.fom
                                : op.tidsperiode.fom,
                            tom: dayjs(p.tidsperiode.tom).isSameOrBefore(dayjs(op.tidsperiode.tom), 'day')
                                ? p.tidsperiode.tom
                                : op.tidsperiode.tom,
                        },
                    });
                    return;
                }
            });
        });

        this.sort();
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
                                : dayjs.max([dayjs(hull.tidsperiode.fom), dayjs(periode.tidsperiode.fom)]).toDate(),
                            tom: dayjs.min([dayjs(hull.tidsperiode.tom), dayjs(periode.tidsperiode.tom)]).toDate(),
                        },
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
            this.perioder = settInnPerioder(
                nyPlan,
                opprinneligePerioderSomSkalLeggesInnIPlan,
                this.erEndringsøknadUtenEkisterendeSak,
                this.harMidlertidigOmsorg,
                this.harAktivitetskravIPeriodeUtenUttak,
                this.familiehendelsesdato,
                this.erAdopsjon
            );
            this.finnOgSettInnHull();
        }

        return this;
    }

    settInnOpprinneligeInfoPerioderUtenforPlan() {
        if (this.opprinneligPlan && this.perioder.length > 0) {
            const førstePeriode = this.perioder[0];
            const sistePeriode = this.perioder[this.perioder.length - 1];

            const opprinneligePerioderFørFørstePeriode = this.opprinneligPlan
                .filter((p) => Perioden(p).starterFør(førstePeriode.tidsperiode.fom))
                .filter(isInfoPeriode)
                .map((p) => {
                    if (Perioden(p).slutterSammeDagEllerEtter(førstePeriode.tidsperiode.fom)) {
                        return {
                            ...p,
                            tidsperiode: {
                                fom: p.tidsperiode.fom,
                                tom: Uttaksdagen(førstePeriode.tidsperiode.fom).forrige(),
                            },
                        };
                    }
                    return clonePeriode(p);
                });

            const opprinneligePerioderEtterSistePeriode = this.opprinneligPlan
                .filter(
                    (p) => isInfoPeriode(p) && dayjs(p.tidsperiode.tom).isAfter(sistePeriode.tidsperiode.tom, 'day')
                )
                .map(clonePeriode); // Unngå modifisering av perioden i opprinneligPlan i state

            if (opprinneligePerioderEtterSistePeriode.length > 0) {
                opprinneligePerioderEtterSistePeriode[0].tidsperiode.fom = Uttaksdagen(
                    sistePeriode.tidsperiode.tom
                ).neste();
            }

            this.perioder = [
                ...opprinneligePerioderFørFørstePeriode,
                ...this.perioder,
                ...opprinneligePerioderEtterSistePeriode,
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
                tidsperiode: { ...periode.tidsperiode },
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
            ? finnHullVedEndretTidsperiode(
                  oldPeriode,
                  periode,
                  førsteOktober2021ReglerGjelder(this.familiehendelsesdato),
                  this.harAktivitetskravIPeriodeUtenUttak,
                  this.familiehendelsesdato,
                  this.erAdopsjon
              )
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
        while (
            this.perioder.findIndex((p) => p.type === Periodetype.Hull || p.type === Periodetype.PeriodeUtenUttak) === 0
        ) {
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
        this.perioder = finnOgSettInnHull(
            this.perioder,
            this.erEndringsøknadUtenEkisterendeSak,
            this.harMidlertidigOmsorg,
            this.harAktivitetskravIPeriodeUtenUttak,
            this.familiehendelsesdato,
            this.erAdopsjon,
            this.relevantStartDatoForUttak || this.familiehendelsesdato
        );
        return this;
    }

    private sort() {
        this.perioder.sort(sorterPerioder);
        return this;
    }

    private beregnSamtidigUttaksprosent(
        søkersSamtidigUttaksprosent: string | undefined,
        andrepartsSamtidigUttaksprosent: string | undefined
    ): string {
        if (this.erFlerbarnssøknad) {
            if (andrepartsSamtidigUttaksprosent !== undefined) {
                return andrepartsSamtidigUttaksprosent;
            }

            return Dekningsgrad.HUNDRE_PROSENT;
        } else {
            let annenPartsProsent;
            const søkersProsent = getFloatFromString(søkersSamtidigUttaksprosent);
            if (andrepartsSamtidigUttaksprosent !== undefined) {
                annenPartsProsent = getFloatFromString(andrepartsSamtidigUttaksprosent);
            }

            if (annenPartsProsent !== undefined && søkersProsent !== undefined) {
                if (annenPartsProsent + søkersProsent > 150) {
                    return (150 - søkersProsent).toString();
                } else {
                    return annenPartsProsent.toString();
                }
            }

            annenPartsProsent = søkersProsent ? 150 - søkersProsent : 100;

            return Math.min(100, annenPartsProsent).toString();
        }
    }
}

function fjernOverskrivbarePerioderIPeriodetidsrom(perioder: Periode[], periode: Periode): Periode[] {
    const nyePerioder: Periode[] = perioder.filter((p) => isOverskrivbarPeriode(p) === false);
    const overskrivbarePerioder = perioder.filter((p) => isOverskrivbarPeriode(p));
    overskrivbarePerioder.forEach((overskrivbarPeriode) => {
        if (Tidsperioden(overskrivbarPeriode.tidsperiode).erOmsluttetAv(periode.tidsperiode)) {
            return;
        } else if (Tidsperioden(overskrivbarPeriode.tidsperiode).erUtenfor(periode.tidsperiode)) {
            nyePerioder.push(overskrivbarPeriode);
        } else if (dayjs(overskrivbarPeriode.tidsperiode.fom).isBefore(periode.tidsperiode.fom, 'day')) {
            nyePerioder.push({
                ...overskrivbarPeriode,
                tidsperiode: {
                    fom: overskrivbarPeriode.tidsperiode.fom,
                    tom: Uttaksdagen(periode.tidsperiode.fom).forrige(),
                },
            });
            if (dayjs(overskrivbarPeriode.tidsperiode.tom).isAfter(periode.tidsperiode.tom, 'day')) {
                nyePerioder.push({
                    ...overskrivbarPeriode,
                    id: guid(),
                    tidsperiode: {
                        fom: Uttaksdagen(periode.tidsperiode.tom).neste(),
                        tom: overskrivbarPeriode.tidsperiode.tom,
                    },
                });
            }
        } else {
            nyePerioder.push({
                ...overskrivbarPeriode,
                tidsperiode: {
                    fom: Uttaksdagen(periode.tidsperiode.tom).neste(),
                    tom: overskrivbarPeriode.tidsperiode.tom,
                },
            });
        }
    });
    return nyePerioder.sort(sorterPerioder);
}

function settInnPerioder(
    perioder: Periode[],
    fastePerioder: Periode[],
    erEndringssøknad: boolean,
    harMidlertidigOmsorg: boolean,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    familiehendelsesdato: Date,
    erAdopsjon: boolean
): Periode[] {
    if (perioder.length === 0) {
        return fastePerioder;
    }
    let nyePerioder: Periode[] = [...perioder];
    [...fastePerioder].sort(sorterPerioder).forEach((periode) => {
        nyePerioder = settInnPeriode(
            nyePerioder,
            periode,
            erEndringssøknad,
            harMidlertidigOmsorg,
            harAktivitetskravIPeriodeUtenUttak,
            familiehendelsesdato,
            erAdopsjon
        );
    });
    return nyePerioder.sort(sorterPerioder);
}

function settInnPerioderInnITidsrom(
    perioder: Periode[],
    perioderSomSkalSettesInn: Periode[],
    tidsperiode: TidsperiodeDate,
    erEndringsøknadUtenEkisterendeSak: boolean,
    harMidlertidigOmsorg: boolean,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    familiehendelsesdato: Date,
    erAdopsjon: boolean
): Periode[] {
    const placeholderPeriode: PeriodeHull = {
        id: guid(),
        type: Periodetype.Hull,
        tidsperiode,
    };
    const nyePerioder = settInnPeriode(
        perioder,
        placeholderPeriode,
        erEndringsøknadUtenEkisterendeSak,
        harMidlertidigOmsorg,
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsesdato,
        erAdopsjon
    );
    return [...nyePerioder.filter((p) => p.id !== placeholderPeriode.id), ...perioderSomSkalSettesInn];
}

function settInnPeriode(
    perioder: Periode[],
    nyPeriode: Periode,
    erEndringsøknadUtenEkisterendeSak: boolean,
    harMidlertidigOmsorg: boolean,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    familiehendelsesdato: Date,
    erAdopsjon: boolean
): Periode[] {
    if (perioder.length === 0) {
        return [nyPeriode];
    }
    const berørtePerioder = Periodene(perioder).finnOverlappendePerioder(nyPeriode);
    const periodeSomMåSplittes = Periodene(perioder).finnPeriodeMedDato(nyPeriode.tidsperiode.fom);
    if (berørtePerioder.length === 0 && !periodeSomMåSplittes) {
        const nyPeriodeliste = [...perioder, nyPeriode].sort(sorterPerioder);
        if (nyPeriodeliste[nyPeriodeliste.length - 1].id === nyPeriode.id) {
            return finnOgSettInnHull(
                nyPeriodeliste,
                erEndringsøknadUtenEkisterendeSak,
                harMidlertidigOmsorg,
                harAktivitetskravIPeriodeUtenUttak,
                familiehendelsesdato,
                erAdopsjon
            );
        }
        return nyPeriodeliste;
    }

    if (!periodeSomMåSplittes) {
        const foregåendePeriode = Periodene(perioder).finnAlleForegåendePerioder(nyPeriode).pop();
        if (foregåendePeriode) {
            return leggTilPeriodeEtterPeriode(perioder, foregåendePeriode, nyPeriode);
        }
        return leggTilPeriodeFørPeriode(perioder, perioder[0], nyPeriode);
    }

    if (isUtsettelsesperiode(periodeSomMåSplittes) && !isPeriodeUtenUttak(periodeSomMåSplittes)) {
        throw new Error('Kan ikke dele opp en utsettelse');
    }

    if (isPeriodeUtenUttak(periodeSomMåSplittes)) {
        return perioder;
    }

    if (dayjs(periodeSomMåSplittes.tidsperiode.fom).isSame(nyPeriode.tidsperiode.fom, 'day')) {
        return leggTilPeriodeEtterPeriode(perioder, periodeSomMåSplittes, nyPeriode);
    } else {
        return leggTilPeriodeIPeriode(perioder, periodeSomMåSplittes, nyPeriode);
    }
}

export function finnHullIPerioder(
    perioder: Periode[],
    erEndringsøknadUtenEkisterendeSak: boolean,
    harMidlertidigOmsorg: boolean,
    skalLeggeInnPerioderUtenUttak: boolean,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
    startDato?: Date
): Array<PeriodeHull | PeriodeUtenUttak> {
    const hullEllerPeriodeUtenUttak: Array<PeriodeHull | PeriodeUtenUttak> = [];
    const perioderLength = perioder.length;
    const shouldHullBeInsertedBetweenFamiliehendelsedatoAndFirstPeriode =
        startDato !== undefined &&
        perioderLength > 0 &&
        perioder[0].type !== Periodetype.Hull &&
        !harMidlertidigOmsorg &&
        !erEndringsøknadUtenEkisterendeSak;

    if (startDato && shouldHullBeInsertedBetweenFamiliehendelsedatoAndFirstPeriode) {
        const fom = Uttaksdagen(startDato).denneEllerNeste();
        const uttaksdagerMellomStartOgFørstePeriode = Tidsperioden({
            fom,
            tom: Uttaksdagen(perioder[0].tidsperiode.fom).forrige(),
        }).getAntallUttaksdager();

        if (uttaksdagerMellomStartOgFørstePeriode > 0) {
            const tidsperiode = getTidsperiode(fom, uttaksdagerMellomStartOgFørstePeriode);

            hullEllerPeriodeUtenUttak.push(
                ...getNyttPeriodehull(
                    tidsperiode,
                    skalLeggeInnPerioderUtenUttak,
                    harAktivitetskravIPeriodeUtenUttak,
                    familiehendelsesdato,
                    erAdopsjon
                )
            );
        }
    }
    perioder.forEach((periode, idx) => {
        if (idx === perioderLength - 1) {
            return;
        }
        const nestePeriode = perioder[idx + 1];

        const tidsperiodeMellomPerioder: TidsperiodeDate = {
            fom: Uttaksdagen(periode.tidsperiode.tom).neste(),
            tom: Uttaksdagen(nestePeriode.tidsperiode.fom).forrige(),
        };
        if (dayjs(tidsperiodeMellomPerioder.tom).isBefore(tidsperiodeMellomPerioder.fom, 'day')) {
            return;
        }

        const uttaksdagerITidsperiode = Tidsperioden(tidsperiodeMellomPerioder).getAntallUttaksdager();

        if (uttaksdagerITidsperiode > 0) {
            hullEllerPeriodeUtenUttak.push(
                ...getNyttPeriodehull(
                    tidsperiodeMellomPerioder,
                    skalLeggeInnPerioderUtenUttak,
                    harAktivitetskravIPeriodeUtenUttak,
                    familiehendelsesdato,
                    erAdopsjon
                )
            );
        }
    });

    return hullEllerPeriodeUtenUttak;
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
            ),
        };
        return {
            ...periode,
            tidsperiode: { ...forrigePeriode.tidsperiode },
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

const getAntallOverlappendeUttaksdager = (periode: Periode, nyPeriode: Periode): number => {
    if (Periodene([periode]).finnOverlappendePerioder(nyPeriode).length > 0) {
        const dateArray = [
            dayjs(periode.tidsperiode.fom),
            dayjs(periode.tidsperiode.tom),
            dayjs(nyPeriode.tidsperiode.fom),
            dayjs(nyPeriode.tidsperiode.tom),
        ];
        const minDate = dayjs.min(dateArray);
        const maxDate = dayjs.max(dateArray);
        const overlappendeTidsperiode = dateArray.filter((date) => date !== minDate && date !== maxDate);
        return Tidsperioden({
            fom: dayjs.min(overlappendeTidsperiode).toDate(),
            tom: dayjs.max(overlappendeTidsperiode).toDate(),
        }).getAntallUttaksdager();
    }
    return 0;
};

function leggTilPeriodeEtterPeriode(perioder: Periode[], periode: Periode, nyPeriode: Periode): Periode[] {
    const perioderFør = Periodene(perioder).finnAlleForegåendePerioder(periode);
    const perioderEtter = Periodene(perioder).finnAllePåfølgendePerioder(periode);
    const antallOverlappendeUttaksdager = getAntallOverlappendeUttaksdager(periode, nyPeriode);
    const antallUttaksdagerNyPeriode = Tidsperioden(nyPeriode.tidsperiode).getAntallUttaksdager();
    const antallDagerForskyvning = Tidsperioden(periode.tidsperiode).erOmsluttetAv(nyPeriode.tidsperiode)
        ? antallUttaksdagerNyPeriode
        : antallOverlappendeUttaksdager;

    const uttaksdager: number =
        (isUttakAnnenPart(nyPeriode) && nyPeriode.ønskerSamtidigUttak) ||
        (isUttaksperiode(nyPeriode) && nyPeriode.ønskerSamtidigUttak)
            ? 0
            : antallDagerForskyvning;
    return [...perioderFør, ...[nyPeriode], ...Periodene([periode, ...perioderEtter]).forskyvPerioder(uttaksdager)];
}

function leggTilPeriodeFørPeriode(perioder: Periode[], periode: Periode, nyPeriode: Periode): Periode[] {
    const perioderEtter = Periodene(perioder).finnAllePåfølgendePerioder(periode);
    const antallOverlappendeUttaksdager = getAntallOverlappendeUttaksdager(periode, nyPeriode);
    const uttaksdager: number =
        (isUttakAnnenPart(nyPeriode) && nyPeriode.ønskerSamtidigUttak) ||
        (isUttaksperiode(nyPeriode) && nyPeriode.ønskerSamtidigUttak)
            ? 0
            : antallOverlappendeUttaksdager;
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
        tom: splittetPeriode[2].tidsperiode.tom, // Ta høyde for at split inneholdt opphold
    }).getAntallUttaksdager();
    const uttaksdager = nyVarighet - opprinneligVarighet;
    return [...perioderFør, ...splittetPeriode, ...Periodene(perioderEtter).forskyvPerioder(uttaksdager)];
}

function splittPeriodeMedPeriode(periode: Periode, nyPeriode: Periode): Periode[] {
    const dagerIPeriode = Tidsperioden(periode.tidsperiode).getAntallUttaksdager();
    const dagerForsteDel = Tidsperioden({
        fom: periode.tidsperiode.fom,
        tom: Uttaksdagen(nyPeriode.tidsperiode.fom).forrige(),
    }).getAntallUttaksdager();
    let dagerSisteDel = dagerIPeriode - dagerForsteDel;
    const forste: Periode = {
        ...periode,
        tidsperiode: {
            fom: periode.tidsperiode.fom,
            tom: Uttaksdagen(nyPeriode.tidsperiode.fom).forrige(),
        },
    };
    const midt: Periode = {
        ...nyPeriode,
        tidsperiode: {
            fom: Uttaksdagen(nyPeriode.tidsperiode.fom).denneEllerNeste(),
            tom: Uttaksdagen(nyPeriode.tidsperiode.tom).denneEllerNeste(),
        },
    };
    const startSisteDel: Date = Uttaksdagen(midt.tidsperiode.tom).neste();

    if (isOppholdsperiode(periode) || isInfoPeriode(periode)) {
        dagerSisteDel = dagerSisteDel - Perioden(midt).getAntallUttaksdager();
    }

    const siste: Periode = {
        ...periode,
        id: guid(),
        tidsperiode: getTidsperiode(startSisteDel, dagerSisteDel),
    };
    return [forste, midt, siste];
}

function finnHullVedEndretTidsperiode(
    oldPeriode: Periode,
    periode: Periode,
    skalLeggeInnPerioderUtenUttak: boolean,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    familiehendelsesdato: Date,
    erAdopsjon: boolean
): Array<PeriodeHull | PeriodeUtenUttak> | undefined {
    if (periodeHasValidTidsrom(periode) === false || periodeHasValidTidsrom(oldPeriode) === false) {
        return undefined;
    }
    /*
     TODO - sjekk at ikke opphold kolliderer med andre perioder
     */
    const periodehull: Array<PeriodeHull | PeriodeUtenUttak> = [];
    const diffStartdato = Uttaksdagen(oldPeriode.tidsperiode.fom).getUttaksdagerFremTilDato(periode.tidsperiode.fom);

    if (diffStartdato > 0) {
        const tidsperiode = getTidsperiode(oldPeriode.tidsperiode.fom, diffStartdato);

        periodehull.push(
            ...getNyttPeriodehull(
                tidsperiode,
                skalLeggeInnPerioderUtenUttak,
                harAktivitetskravIPeriodeUtenUttak,
                familiehendelsesdato,
                erAdopsjon
            )
        );
    }

    const diffSluttdato = Uttaksdagen(oldPeriode.tidsperiode.tom).getUttaksdagerFremTilDato(periode.tidsperiode.tom);

    if (diffSluttdato < 0) {
        periodehull.push(
            ...getNyttPeriodehull(
                {
                    fom: Uttaksdagen(periode.tidsperiode.tom).neste(),
                    tom: oldPeriode.tidsperiode.tom,
                },
                skalLeggeInnPerioderUtenUttak,
                harAktivitetskravIPeriodeUtenUttak,
                familiehendelsesdato,
                erAdopsjon
            )
        );
    }

    return periodehull.length > 0 ? periodehull : undefined;
}

function skalSlettetPeriodeErstattesMedHull(
    periode: Periode,
    perioder: Periode[],
    skalLeggeInnPerioderUtenUttak: boolean
): boolean {
    if (skalLeggeInnPerioderUtenUttak) {
        return false;
    }

    if (periode.type === Periodetype.Hull) {
        return false;
    }
    const idx = perioder.findIndex((p) => p.id === periode.id);
    if (idx === 0 || idx === perioder.length - 1) {
        return false;
    }
    return periode.type !== Periodetype.Utsettelse;
}

export function finnOgSettInnHull(
    perioder: Periode[],
    erEndringsøknadUtenEkisterendeSak: boolean,
    harMidlertidigOmsorg: boolean,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
    startdato?: Date
): Periode[] {
    const skalLeggeInnPerioderUtenUttak = førsteOktober2021ReglerGjelder(familiehendelsesdato);

    const hull = finnHullIPerioder(
        perioder,
        erEndringsøknadUtenEkisterendeSak,
        harMidlertidigOmsorg,
        skalLeggeInnPerioderUtenUttak,
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsesdato,
        erAdopsjon,
        startdato
    );
    return [...perioder, ...hull].sort(sorterPerioder);
}

function settInnFerieMedHelligdager(
    perioder: Periode[],
    periode: Periode,
    erEndringsøknadUtenEkisterendeSak: boolean,
    harMidlertidigOmsorg: boolean,
    familiehendelsesdato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean
) {
    const splittetPeriode = splittPeriodeMedHelligdager(periode);
    return settInnPerioderInnITidsrom(
        perioder,
        splittetPeriode,
        periode.tidsperiode,
        erEndringsøknadUtenEkisterendeSak,
        harMidlertidigOmsorg,
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsesdato,
        erAdopsjon
    );
}

const getNyttPeriodehull = (
    tidsperiode: TidsperiodeDate,
    skalLeggeInnPerioderUtenUttak: boolean,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
    årsak?: PeriodeHullÅrsak
): Array<PeriodeHull | PeriodeUtenUttak> => {
    if (skalLeggeInnPerioderUtenUttak) {
        const ANTALL_UTTAKSDAGER_SEKS_UKER = 30;
        const førsteUttaksdagFamiliehendelsesdato = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
        const førsteUttaksdagEtterSeksUker = Uttaksdagen(førsteUttaksdagFamiliehendelsesdato).leggTil(
            ANTALL_UTTAKSDAGER_SEKS_UKER
        );
        const tidsperiodeErInnenFørsteSeksUker =
            Tidsperioden(tidsperiode).erInnenforFørsteSeksUker(familiehendelsesdato);

        if (harAktivitetskravIPeriodeUtenUttak) {
            return [getPeriodeHull(tidsperiode, årsak)];
        }

        if (tidsperiodeErInnenFørsteSeksUker && !erAdopsjon) {
            if (dayjs(tidsperiode.tom).isBefore(førsteUttaksdagEtterSeksUker, 'day')) {
                return [getPeriodeHull(tidsperiode, årsak)];
            }

            const antallDagerFraFomTilFørsteUttaksdagSeksUker =
                Tidsperioden({ fom: tidsperiode.fom, tom: førsteUttaksdagEtterSeksUker }).getAntallUttaksdager() - 2;

            const nyPeriodeUtenUttakTidsperiodeLengde =
                Tidsperioden(tidsperiode).getAntallUttaksdager() - antallDagerFraFomTilFørsteUttaksdagSeksUker;

            const førsteSeksUkerTidsperiode: TidsperiodeDate = {
                fom: tidsperiode.fom,
                tom: Uttaksdagen(førsteUttaksdagEtterSeksUker).leggTil(-1),
            };

            const periodeUtenUttakTidsperiode: TidsperiodeDate = {
                fom: førsteUttaksdagEtterSeksUker,
                tom: Uttaksdagen(førsteUttaksdagEtterSeksUker).leggTil(nyPeriodeUtenUttakTidsperiodeLengde - 2),
            };

            const periodeHull = getPeriodeHull(førsteSeksUkerTidsperiode, årsak);
            const periodeUtenUttak = getNyPeriodeUtenUttak(periodeUtenUttakTidsperiode);

            return [periodeHull, periodeUtenUttak];
        }

        return [getNyPeriodeUtenUttak(tidsperiode)];
    }

    return [getPeriodeHull(tidsperiode, årsak)];
};

const getPeriodeHull = (tidsperiode: TidsperiodeDate, årsak?: PeriodeHullÅrsak): PeriodeHull => ({
    id: guid(),
    type: Periodetype.Hull,
    tidsperiode,
    årsak,
});

const getNyPeriodeUtenUttak = (tidsperiode: TidsperiodeDate): PeriodeUtenUttak => ({
    id: guid(),
    type: Periodetype.PeriodeUtenUttak,
    tidsperiode,
});

export function splittPeriodeMedHelligdager(periode: Periode): Periode[] {
    const nyePerioder: Periode[] = [];
    const { tidsperiode } = periode;
    const friperioder = getFriperioderITidsperiode(tidsperiode);
    let fom = periode.tidsperiode.fom;
    friperioder.forEach((friperiode) => {
        if (dayjs(friperiode.fom).isSame(fom, 'day')) {
            nyePerioder.push(getPeriodeHull(friperiode, PeriodeHullÅrsak.fridag));
            fom = Uttaksdagen(friperiode.tom).neste();
        } else {
            nyePerioder.push({
                ...periode,
                id: guid(),
                tidsperiode: {
                    fom,
                    tom: Uttaksdagen(friperiode.fom).forrige(),
                },
            });
            nyePerioder.push(getPeriodeHull(friperiode, PeriodeHullÅrsak.fridag));
            fom = Uttaksdagen(friperiode.tom).neste();
        }
    });
    if (dayjs(fom).isSameOrBefore(tidsperiode.tom, 'day')) {
        nyePerioder.push({
            ...periode,
            id: guid(),
            tidsperiode: {
                fom,
                tom: tidsperiode.tom,
            },
        });
    }
    return nyePerioder;
}

export function getFriperioderITidsperiode(tidsperiode: TidsperiodeDate): TidsperiodeDate[] {
    const friperioder: TidsperiodeDate[] = [];
    const fridagerIPerioden = getOffentligeFridager(tidsperiode).filter((d) =>
        Uttaksdagen(dayjs(d.date).toDate()).erUttaksdag()
    );
    if (fridagerIPerioden.length === 0) {
        return [];
    }

    let fom: Date = dayjs.utc(fridagerIPerioden[0].date).toDate();
    const antallFridager = fridagerIPerioden.length;
    fridagerIPerioden.forEach((fridag, idx: number) => {
        if (idx === antallFridager - 1 && fom) {
            friperioder.push({
                fom,
                tom: dayjs.utc(fridagerIPerioden[idx].date).toDate(),
            });
        } else {
            const nextDate = dayjs(fridagerIPerioden[idx + 1].date).toDate();
            if (dayjs(fom).add(24, 'hours').isSame(nextDate, 'day') === false) {
                friperioder.push({
                    fom,
                    tom: dayjs.utc(fridag.date).toDate(),
                });
                fom = nextDate;
            }
        }
    });

    return friperioder;
}
