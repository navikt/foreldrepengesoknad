import {
    UttaksplanValideringActionTypes,
    UttaksplanValideringActionKeys,
    ValidertPeriode
} from '../actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';

export enum PeriodeValideringErrorKey {
    'FORM_INCOMPLETE' = 'formIncomplete'
}

export interface Periodevalidering {
    [periodeId: string]: ValidertPeriode;
}

export interface UttaksplanValideringState {
    periodevalidering: Periodevalidering;
}

export interface PeriodeValideringsfeil {
    feilKey: PeriodeValideringErrorKey;
}

const getDefaultState = (): UttaksplanValideringState => {
    return {
        periodevalidering: {}
    };
};

const uttaksplanValideringReducer = (
    state = getDefaultState(),
    action: UttaksplanValideringActionTypes
): UttaksplanValideringState => {
    switch (action.type) {
        case UttaksplanValideringActionKeys.SET_VALIDERT_PERIODE:
            return {
                ...state,
                periodevalidering: {
                    ...state.periodevalidering,
                    [action.periodeId]: action.validertPeriode
                }
            };
        case UttaksplanValideringActionKeys.SET_VALIDERTE_PERIODER:
            return {
                ...state,
                periodevalidering: action.validertePerioder
            };
    }
    return state;
};

export default uttaksplanValideringReducer;
