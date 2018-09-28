import {
    UttaksplanValideringActionKeys,
    UttaksplanValideringActionTypes,
    ValiderUtsettelsePayload
} from './uttaksplanValideringActionDefinitions';

export function validerUtsettelseAction(payload: ValiderUtsettelsePayload): UttaksplanValideringActionTypes {
    return {
        type: UttaksplanValideringActionKeys.VALIDER_UTSETTELSE,
        payload
    };
}

export default {
    validerUtsettelseAction
};
