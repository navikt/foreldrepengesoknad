import {
    UttaksplanValideringActionKeys,
    UttaksplanValideringActionTypes
} from './uttaksplanValideringActionDefinitions';
import { Periodevalidering, ValidertPeriode } from '../../reducers/uttaksplanValideringReducer';

export function setValidertPeriode(
    periodeId: string,
    validertPeriode: ValidertPeriode
): UttaksplanValideringActionTypes {
    return {
        type: UttaksplanValideringActionKeys.SET_VALIDERT_PERIODE,
        periodeId,
        validertPeriode
    };
}

export function setValidertePerioder(validertePerioder: Periodevalidering): UttaksplanValideringActionTypes {
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
