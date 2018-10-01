import {
    UttaksplanValideringActionKeys,
    UttaksplanValideringActionTypes,
    ValidertPeriode
} from './uttaksplanValideringActionDefinitions';

export function setValidertPeriode(validertPeriode: ValidertPeriode): UttaksplanValideringActionTypes {
    return {
        type: UttaksplanValideringActionKeys.SET_VALIDERT_PERIODE,
        validertPeriode
    };
}

export function setValidertePerioder(validertePerioder: ValidertPeriode[]): UttaksplanValideringActionTypes {
    return {
        type: UttaksplanValideringActionKeys.SET_VALIDERTE_PERIODER,
        validertePerioder
    };
}

export function validerUttaksplanAction() {
    return {
        type: UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN
    };
}

export default {
    setValidertPeriode,
    setValidertePerioder,
    validerUttaksplanAction
};
