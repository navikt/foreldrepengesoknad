import {
    Uttaksplanperiode,
    erFamiliehendelseDato,
    erPeriodeUtenUttakHull,
    erTapteDagerHull,
    erVanligUttakPeriode,
} from '../../types/UttaksplanPeriode';

export const getFørsteUttaksplanperiodeFom = (uttaksplanperioder: Uttaksplanperiode[]) => {
    return uttaksplanperioder.at(0)!.fom;
};

export const getSisteUttaksplanperiodeTom = (uttaksplanperioder: Uttaksplanperiode[]) => {
    return uttaksplanperioder.at(-1)!.tom;
};

export const erUttaksplanperiodeFamiliehendelseDato = (uttaksplanperioder: Uttaksplanperiode[]) => {
    const periode = uttaksplanperioder.at(0)!;
    return uttaksplanperioder.length === 1 && erFamiliehendelseDato(periode);
};

export const erUttaksplanperiodeTapteDager = (uttaksplanperioder: Uttaksplanperiode[]) => {
    const periode = uttaksplanperioder.at(0)!;
    return uttaksplanperioder.length === 1 && erTapteDagerHull(periode);
};

export const erUttaksplanperiodeUtenUttak = (uttaksplanperioder: Uttaksplanperiode[]) => {
    const periode = uttaksplanperioder.at(0)!;
    return uttaksplanperioder.length === 1 && erPeriodeUtenUttakHull(periode);
};

export const erUttaksplanperiodeSamtidigUttak = (uttaksplanperioder: Uttaksplanperiode[]) => {
    if (uttaksplanperioder.length !== 2) {
        return false;
    }
    const periode1 = uttaksplanperioder.at(0)!;
    const periode2 = uttaksplanperioder.at(1)!;

    if (periode1.fom !== periode2.fom || periode1.tom !== periode2.tom) {
        return false;
    }

    return (
        erVanligUttakPeriode(periode1) &&
        erVanligUttakPeriode(periode2) &&
        periode1.samtidigUttak !== undefined &&
        periode2.samtidigUttak !== undefined
    );
};

export const harUttaksplanperiodePrematuruker = (uttaksplanperioder: Uttaksplanperiode[]) => {
    if (uttaksplanperioder.length !== 1) {
        return false;
    }
    const periode = uttaksplanperioder.at(0)!;
    return erVanligUttakPeriode(periode) && periode.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER';
};

export const erUttaksplanperiodeUtsettelseOpphold = (uttaksplanperioder: Uttaksplanperiode[]) => {
    if (uttaksplanperioder.length !== 1) {
        return false;
    }
    const periode = uttaksplanperioder.at(0)!;
    return erVanligUttakPeriode(periode) && !!periode.oppholdÅrsak;
};

export const getUttaksplanperiodeUtsettelseÅrsak = (uttaksplanperioder: Uttaksplanperiode[]) => {
    if (uttaksplanperioder.length !== 1) {
        return undefined;
    }
    const periode = uttaksplanperioder.at(0)!;
    return erVanligUttakPeriode(periode) ? periode.utsettelseÅrsak : undefined;
};

export const erUttaksplanperiodeUtsettelse = (uttaksplanperioder: Uttaksplanperiode[]) => {
    return !!getUttaksplanperiodeUtsettelseÅrsak(uttaksplanperioder);
};

export const getUttaksplanperiodeForelder = (uttaksplanperioder: Uttaksplanperiode[]) => {
    if (erUttaksplanperiodeSamtidigUttak(uttaksplanperioder)) {
        return undefined;
    }
    const periode = uttaksplanperioder.at(0)!;
    return erVanligUttakPeriode(periode) ? periode.forelder : undefined;
};

export const erUttaksplanperiodeErForelderMor = (uttaksplanperioder: Uttaksplanperiode[]) => {
    const forelder = getUttaksplanperiodeForelder(uttaksplanperioder);
    return forelder === 'MOR';
};
