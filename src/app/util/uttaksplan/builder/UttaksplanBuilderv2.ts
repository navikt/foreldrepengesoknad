import moment from 'moment';
import { guid } from 'nav-frontend-js-utils';
import {
    Periode,
    Periodetype,
    isOverskrivbarPeriode,
    isUttakAnnenPart,
    TilgjengeligStønadskonto,
    PeriodeHull,
    PeriodeHullÅrsak,
    isUttaksperiode,
    isInfoPeriode
} from '../../../types/uttaksplan/periodetyper';
import { Periodene, sorterPerioder } from '../Periodene';
import { Tidsperioden, getTidsperiode } from '../Tidsperioden';
import { Uttaksdagen } from '../Uttaksdagen';
import { Perioden } from '../Perioden';
import { Tidsperiode } from 'common/types';
import { Søknadsinfo } from 'app/selectors/types';

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

// const periodeHasValidTidsrom = (periode: Periode): boolean =>
//     periode.tidsperiode.fom !== undefined && periode.tidsperiode.tom !== undefined;

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

        // Fjern perioder med andre parts samtidige uttak og sett inn eventuelle hull som kan oppstå
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
        this.slåSammenLikePerioder();
        if (foreldrepengerFørTermin === undefined) {
            this.fjernHullPåStarten();
        }
        this.fjernHullPåSlutten();
        this.sort();

        this.perioder = [
            ...perioderFørFamDato.filter((p) => isOverskrivbarPeriode(p) === false),
            ...this.perioder,
            ...perioderMedUgyldigTidsperiode
        ];
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

const getNyttPeriodehull = (tidsperiode: Tidsperiode, årsak?: PeriodeHullÅrsak): PeriodeHull => ({
    id: guid(),
    type: Periodetype.Hull,
    tidsperiode,
    årsak
});

export function settInnPerioder(perioder: Periode[], fastePerioder: Periode[]): Periode[] {
    if (perioder.length === 0) {
        return fastePerioder;
    }
    let nyePerioder: Periode[] = [...perioder];
    [...fastePerioder.sort(sorterPerioder)].forEach((periode) => {
        nyePerioder = settInnPeriode(nyePerioder, periode);
    });
    return nyePerioder.sort(sorterPerioder);
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

function leggTilPeriodeEtterPeriode(perioder: Periode[], periode: Periode, nyPeriode: Periode): Periode[] {
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
    const perioderEtter = Periodene(perioder).finnAllePåfølgendePerioder(periode);
    const uttaksdager: number =
        (isUttakAnnenPart(nyPeriode) && nyPeriode.ønskerSamtidigUttak) ||
        (isUttaksperiode(nyPeriode) && nyPeriode.ønskerSamtidigUttak)
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

export const resetTidsperioder = (perioder: Periode[]): Periode[] => {
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
};

export const finnOgSettInnHull = (perioder: Periode[], familiehendelsesdato?: Date): Periode[] => {
    const hull = finnHullIPerioder(perioder, familiehendelsesdato);
    return [...perioder, ...hull].sort(sorterPerioder);
};

export const finnHullIPerioder = (perioder: Periode[], familiehendelsesdato?: Date): PeriodeHull[] => {
    const hull: PeriodeHull[] = [];
    const perioderLength = perioder.length;
    const shouldHullBeInsertedBetweenFamiliehendelsedatoAndFirstPeriode =
        familiehendelsesdato !== undefined && perioderLength > 0 && perioder[0].type !== Periodetype.Hull;

    if (familiehendelsesdato && shouldHullBeInsertedBetweenFamiliehendelsedatoAndFirstPeriode) {
        const fom = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
        const uttaksdagerMellomStartOgFørstePeriode = Tidsperioden({
            fom,
            tom: Uttaksdagen(perioder[0].tidsperiode.fom).forrige()
        }).getAntallUttaksdager();
        const hullExistsBetweenStartdatoAndFirstPeriode = uttaksdagerMellomStartOgFørstePeriode > 0;

        if (hullExistsBetweenStartdatoAndFirstPeriode) {
            hull.push(getNyttPeriodehull(getTidsperiode(fom, uttaksdagerMellomStartOgFørstePeriode)));
        }
    }

    perioder.forEach((periode, idx) => {
        if (idx === perioderLength - 1) {
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
            hull.push(getNyttPeriodehull(tidsperiodeMellomPerioder));
        }
    });
    return hull;
};

export const slåSammenLikePerioder = (perioder: Periode[]): Periode[] => {
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
};
