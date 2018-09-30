import {
    UttaksplanValideringActionTypes,
    UttaksplanValideringActionKeys,
    ValiderUtsettelsePayload
} from '../actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';
import { validerUtsettelsePeriode } from '../../util/validation/periode/utsettelse';

export enum PeriodeValideringErrorKey {
    'FORM_INCOMPLETE' = 'formIncomplete'
}

interface PeriodeInfo {
    valideringsfeil?: Valideringsfeil[];
    advarsler?: string[];
    informasjon?: string[];
}

export interface UttaksplanValideringState {
    validering: UttaksplanValidering;
}

export interface UttaksplanValidering {
    [periodeId: string]: PeriodeInfo | undefined;
}

export interface Valideringsfeil {
    feilKey: PeriodeValideringErrorKey;
}

const getDefaultState = (): UttaksplanValideringState => {
    return {
        validering: {}
    };
};

const updatePeriodeValidering = (
    perioder: UttaksplanValidering,
    periodeId: string,
    valideringsfeil: Valideringsfeil[] | undefined
): UttaksplanValidering => {
    return {
        ...perioder,
        [periodeId]: {
            valideringsfeil
        }
    };
};

const validerUtsettelser = (payload: ValiderUtsettelsePayload[]): UttaksplanValidering => {
    const validering: UttaksplanValidering = {};
    payload.forEach((p) => {
        validering[p.periode.id!] = { valideringsfeil: validerUtsettelsePeriode(p) };
    });
    return validering;
};

const uttaksplanValideringReducer = (
    state = getDefaultState(),
    action: UttaksplanValideringActionTypes
): UttaksplanValideringState => {
    switch (action.type) {
        case UttaksplanValideringActionKeys.VALIDER_UTSETTELSE:
            const { periode } = action.payload;
            if (periode.id) {
                return {
                    ...state,
                    validering: updatePeriodeValidering(
                        state.validering,
                        periode.id,
                        validerUtsettelsePeriode(action.payload)
                    )
                };
            }
            return state;
        case UttaksplanValideringActionKeys.VALIDER_UTSETTELSER:
            return {
                ...state,
                validering: validerUtsettelser(action.payload)
            };
    }
    return state;
};

export default uttaksplanValideringReducer;
