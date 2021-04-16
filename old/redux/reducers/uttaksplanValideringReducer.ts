import {
    UttaksplanValideringActionTypes,
    UttaksplanValideringActionKeys,
} from '../actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';
import { UttaksplanRegelTestresultat } from '../../regler/uttaksplanValidering/types';

export interface UttaksplanValideringState {
    resultat: UttaksplanRegelTestresultat;
    erGyldig: boolean;
}

const getDefaultState = (): UttaksplanValideringState => {
    return {
        resultat: {
            avvik: [],
            resultat: [],
            avvikPerPeriode: {},
            harFeil: false,
        },
        erGyldig: true,
    };
};

const uttaksplanValideringReducer = (
    state = getDefaultState(),
    action: UttaksplanValideringActionTypes
): UttaksplanValideringState => {
    switch (action.type) {
        case UttaksplanValideringActionKeys.SET_UTTAKSPLAN_VALIDERING:
            const { resultat } = action;
            return {
                ...state,
                erGyldig: resultat.harFeil === false,
                resultat: action.resultat,
            };
        case UttaksplanValideringActionKeys.RESET_UTTAKSPLANVALIDERING:
            return getDefaultState();
        default:
            return state;
    }
};

export default uttaksplanValideringReducer;
