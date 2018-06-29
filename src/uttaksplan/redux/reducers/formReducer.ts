import {
    UttaksplanActionTypes,
    UttaksplanActionTypeKeys
} from '../actions/actionTypes';
import { UttaksplanFormState } from '../types';
import { getAntallUkerFellesperiode } from '../../utils/permisjonUtils';
import { getPermisjonsregler } from 'uttaksplan/utils/regler/permisjonsregler';

const getInitialState = (): UttaksplanFormState => {
    const permisjonsregler = getPermisjonsregler();
    const ukerFellesperiode = getAntallUkerFellesperiode(
        permisjonsregler,
        '100%'
    );
    const ukerForelder1 = Math.round(ukerFellesperiode / 2);
    const ukerForelder2 = ukerFellesperiode - ukerForelder1;

    return {
        dekningsgrad: '100%',
        ukerFellesperiode,
        fellesperiodeukerForelder1: ukerForelder1,
        fellesperiodeukerForelder2: ukerForelder2
    };
};

const beregnUkerForelder2 = (
    ukerFellesperiode: number | undefined,
    ukerForelder1: number | undefined
): number => (ukerFellesperiode ? ukerFellesperiode - (ukerForelder1 || 0) : 0);

const FormReducer = (
    state = getInitialState(),
    action: UttaksplanActionTypes
): UttaksplanFormState => {
    switch (action.type) {
        case UttaksplanActionTypeKeys.SET_DEKNINGSGRAD:
            if (!action.dekningsgrad) {
                return state;
            }
            const pstForelder1 =
                100 /
                state.ukerFellesperiode *
                state.fellesperiodeukerForelder1;
            const ukerFellesperiode = getAntallUkerFellesperiode(
                action.permisjonsregler,
                action.dekningsgrad
            );
            const fellesperiodeukerForelder1 = Math.round(
                ukerFellesperiode / 100 * pstForelder1
            );
            const fellesperiodeukerForelder2 =
                ukerFellesperiode - fellesperiodeukerForelder1;
            return {
                ...state,
                dekningsgrad: action.dekningsgrad,
                ukerFellesperiode,
                fellesperiodeukerForelder1,
                fellesperiodeukerForelder2
            };
        case UttaksplanActionTypeKeys.SET_UKER_FORELDER1:
            return {
                ...state,
                fellesperiodeukerForelder1: action.uker,
                fellesperiodeukerForelder2: beregnUkerForelder2(
                    state.ukerFellesperiode,
                    action.uker
                )
            };
        default:
            return state;
    }
};

export default FormReducer;
