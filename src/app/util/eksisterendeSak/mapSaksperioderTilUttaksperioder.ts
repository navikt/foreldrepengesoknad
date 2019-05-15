import {
    Periode,
    Periodetype,
    Uttaksperiode,
    Utsettelsesperiode,
    PeriodeHull,
    PeriodeHullÅrsak,
    AvslåttPeriode,
    Oppholdsperiode,
    OppholdÅrsakType,
    StønadskontoType
} from '../../types/uttaksplan/periodetyper';
import { guid } from 'nav-frontend-js-utils';
import { sorterPerioder } from '../uttaksplan/Periodene';
import { Perioden } from '../uttaksplan/Perioden';
import { Uttaksdagen, erUttaksdag } from '../uttaksplan/Uttaksdagen';
import { getUtsettelseÅrsakFromSaksperiode } from '../uttaksplan/uttaksperiodeUtils';
import { Saksperiode, Saksgrunnlag, PeriodeResultatType } from '../../types/EksisterendeSak';
import { Forelder } from 'common/types';
import { isValidTidsperiode } from '../uttaksplan/Tidsperioden';
import { isFeatureEnabled, Feature } from 'app/Feature';

const slåSammenLikePerioder = (perioder: Periode[]): Periode[] => {
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

const harUttaksdager = (periode: Periode): boolean => {
    return Perioden(periode).getAntallUttaksdager() > 0;
};

const harGyldigTidsperiode = (periode: Periode): boolean => {
    return isValidTidsperiode(periode.tidsperiode);
};

const korrigerTidsperiode = (periode: Periode): Periode => {
    const { fom, tom } = periode.tidsperiode;
    const fomOk = erUttaksdag(fom);
    const tomOk = erUttaksdag(tom);
    if (fomOk && tomOk) {
        return periode;
    } else if (!fomOk && tomOk) {
        return {
            ...periode,
            tidsperiode: {
                fom: Uttaksdagen(fom).neste(),
                tom
            }
        };
    } else {
        return {
            ...periode,
            tidsperiode: {
                fom,
                tom: Uttaksdagen(tom).forrige()
            }
        };
    }
};

const getForelderForPeriode = (saksperiode: Saksperiode, søkerErFarEllerMedmor: boolean): Forelder => {
    if (saksperiode.gjelderAnnenPart) {
        return søkerErFarEllerMedmor ? Forelder.MOR : Forelder.FARMEDMOR;
    }
    return søkerErFarEllerMedmor ? Forelder.FARMEDMOR : Forelder.MOR;
};

const getOppholdÅrsakFromSaksperiode = (saksperiode: Saksperiode): OppholdÅrsakType | undefined => {
    if (saksperiode.flerbarnsdager) {
        return OppholdÅrsakType.UttakFlerbarnsukerAnnenForelder;
    }
    switch (saksperiode.stønadskontotype) {
        case StønadskontoType.Fedrekvote:
            return OppholdÅrsakType.UttakFedrekvoteAnnenForelder;
        case StønadskontoType.Fellesperiode:
            return OppholdÅrsakType.UttakFellesperiodeAnnenForelder;
        case StønadskontoType.Mødrekvote:
            return OppholdÅrsakType.UttakMødrekvoteAnnenForelder;
    }
    return undefined;
};

const mapOppholdFromSakesperiodeAnnenPart = (
    saksperiode: Saksperiode,
    grunnlag: Saksgrunnlag
): Oppholdsperiode | undefined => {
    const årsak = getOppholdÅrsakFromSaksperiode(saksperiode);
    if (årsak) {
        return {
            type: Periodetype.Opphold,
            id: guid(),
            årsak,
            tidsperiode: { ...saksperiode.tidsperiode },
            forelder: getForelderForPeriode(saksperiode, grunnlag.søkerErFarEllerMedmor)
        };
    }
    return undefined;
};

const mapUttaksperiodeFromSaksperiode = (saksperiode: Saksperiode, grunnlag: Saksgrunnlag): Periode | undefined => {
    const gradert = saksperiode.arbeidstidprosent !== 0;

    if (saksperiode.gjelderAnnenPart) {
        if (isFeatureEnabled(Feature.mapOpphold)) {
            return mapOppholdFromSakesperiodeAnnenPart(saksperiode, grunnlag);
        }
        return undefined;
    }

    const uttaksperiode: Uttaksperiode = {
        id: guid(),
        type: Periodetype.Uttak,
        konto: saksperiode.stønadskontotype,
        tidsperiode: { ...saksperiode.tidsperiode },
        forelder: getForelderForPeriode(saksperiode, grunnlag.søkerErFarEllerMedmor),
        ønskerSamtidigUttak: saksperiode.samtidigUttak,
        gradert,
        samtidigUttakProsent: saksperiode.samtidigUttaksprosent,
        stillingsprosent: gradert ? saksperiode.arbeidstidprosent : undefined
    };

    return uttaksperiode;
};

const mapUtsettelseperiodeFromSaksperiode = (
    saksperiode: Saksperiode,
    grunnlag: Saksgrunnlag
): Utsettelsesperiode | undefined => {
    const utsettelsesperiode: Utsettelsesperiode = {
        id: guid(),
        type: Periodetype.Utsettelse,
        årsak: getUtsettelseÅrsakFromSaksperiode(saksperiode.utsettelsePeriodeType)!,
        tidsperiode: { ...saksperiode.tidsperiode },
        forelder: getForelderForPeriode(saksperiode, grunnlag.søkerErFarEllerMedmor),
        erArbeidstaker: false
    };
    return utsettelsesperiode;
};

const mapPeriodehullFromAvslåttSaksperiode = (saksperiode: Saksperiode, grunnlag: Saksgrunnlag): PeriodeHull => {
    const hull: AvslåttPeriode = {
        id: guid(),
        type: Periodetype.Hull,
        tidsperiode: { ...saksperiode.tidsperiode },
        årsak: PeriodeHullÅrsak.avslåttPeriode,
        avslåttPeriodeType: saksperiode.utsettelsePeriodeType ? Periodetype.Utsettelse : Periodetype.Uttak,
        konto: saksperiode.stønadskontotype,
        gjelderAnnenPart: saksperiode.gjelderAnnenPart
    };
    return hull;
};

const getPeriodeFromSaksperiode = (saksperiode: Saksperiode, grunnlag: Saksgrunnlag): Periode | undefined => {
    if (
        saksperiode.utsettelsePeriodeType !== undefined &&
        (isFeatureEnabled(Feature.visAvslåttPeriode)
            ? true
            : saksperiode.periodeResultatType === PeriodeResultatType.INNVILGET)
    ) {
        return mapUtsettelseperiodeFromSaksperiode(saksperiode, grunnlag);
    }
    if (saksperiode.periodeResultatType === PeriodeResultatType.AVSLÅTT) {
        return mapPeriodehullFromAvslåttSaksperiode(saksperiode, grunnlag);
    }

    return mapUttaksperiodeFromSaksperiode(saksperiode, grunnlag);
};

const mapSaksperioderTilUttaksperioder = (
    saksperioder: Saksperiode[],
    grunnlag: Saksgrunnlag
): Periode[] | undefined => {
    const perioder = saksperioder.map((periode) => getPeriodeFromSaksperiode(periode, grunnlag));

    if (perioder.some((p) => p === undefined)) {
        return undefined;
    }

    return slåSammenLikePerioder(
        perioder
            .sort(sorterPerioder)
            .filter(harUttaksdager)
            .map(korrigerTidsperiode)
            .filter(harGyldigTidsperiode)
            .filter(harUttaksdager)
    );
};

export default mapSaksperioderTilUttaksperioder;
