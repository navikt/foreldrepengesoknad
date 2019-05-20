import {
    UttaksplanValideringActionKeys,
    UttaksplanValideringActionTypes
} from './uttaksplanValideringActionDefinitions';
import { Periodevalidering } from '../../reducers/uttaksplanValideringReducer';
import { UttaksplanRegelTestresultat } from '../../../regler/uttaksplanValidering/types';

export function setUttaksplanValidering(
    validertePerioder: Periodevalidering,
    regelTestresultat?: UttaksplanRegelTestresultat | undefined
): UttaksplanValideringActionTypes {
    return {
        type: UttaksplanValideringActionKeys.SET_UTTAKSPLAN_VALIDERING,
        validertePerioder,
        regelTestresultat
    };
}

export function validerUttaksplanAction() {
    return {
        type: UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN
    };
}

export function resetUttaksplanvalideringAction() {
    return {
        type: UttaksplanValideringActionKeys.RESET_UTTAKSPLANVALIDERING
    };
}

export default {
    setUttaksplanValidering,
    validerUttaksplanAction,
    resetUttaksplanvalideringAction
};
