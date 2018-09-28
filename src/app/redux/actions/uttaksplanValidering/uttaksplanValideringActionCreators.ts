import {
    UttaksplanValideringActionKeys,
    UttaksplanValideringActionTypes,
    ValiderUtsettelsePayload
} from './uttaksplanValideringActionDefinitions';

export function validerUttaksplanAction(): UttaksplanValideringActionTypes {
    return {
        type: UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN
    };
}

export function validerUtsettelseAction(payload: ValiderUtsettelsePayload): UttaksplanValideringActionTypes {
    return {
        type: UttaksplanValideringActionKeys.VALIDER_UTSETTELSE,
        payload
    };
}

export function validerUtsettelserAction(payload: ValiderUtsettelsePayload[]): UttaksplanValideringActionTypes {
    return {
        type: UttaksplanValideringActionKeys.VALIDER_UTSETTELSER,
        payload
    };
}

export default {
    validerUttaksplanAction,
    validerUtsettelseAction,
    validerUtsettelserAction
};
