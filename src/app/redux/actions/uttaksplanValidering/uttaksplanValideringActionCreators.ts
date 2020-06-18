import {
    UttaksplanValideringActionKeys,
    UttaksplanValideringActionTypes,
} from './uttaksplanValideringActionDefinitions';
import { UttaksplanRegelTestresultat } from '../../../regler/uttaksplanValidering/types';

export function setUttaksplanValidering(resultat: UttaksplanRegelTestresultat): UttaksplanValideringActionTypes {
    return {
        type: UttaksplanValideringActionKeys.SET_UTTAKSPLAN_VALIDERING,
        resultat,
    };
}

export function validerUttaksplanAction() {
    return {
        type: UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN,
    };
}

export function resetUttaksplanvalideringAction() {
    return {
        type: UttaksplanValideringActionKeys.RESET_UTTAKSPLANVALIDERING,
    };
}

export default {
    setUttaksplanValidering,
    validerUttaksplanAction,
    resetUttaksplanvalideringAction,
};
