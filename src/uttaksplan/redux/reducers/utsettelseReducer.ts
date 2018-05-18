import {
    PlanleggerActionTypes,
    PlanleggerActionTypeKeys
} from '../actions/actionTypes';
import { UtsettelseState, UtsettelseStatePartial } from '../types';
import { Utsettelsesperiode } from '../../types';
import { guid } from 'nav-frontend-js-utils';
import { mockUtsettelser } from 'uttaksplan/redux/reducers/mockdata';

const defaultState: UtsettelseState = {
    dialogErApen: false,
    utsettelser: mockUtsettelser
};

const opprettEllerOppdaterUtsettelse = (
    state: UtsettelseState,
    utsettelse: Utsettelsesperiode
): UtsettelseState => {
    const utsettelser = utsettelse.id
        ? state.utsettelser.map(
              (u, idx) =>
                  u.id === utsettelse.id ? utsettelse : state.utsettelser[idx]
          )
        : [
              ...state.utsettelser,
              {
                  ...utsettelse,
                  id: guid()
              }
          ];
    return {
        ...state,
        utsettelser,
        dialogErApen: false
    };
};

const updateState = (
    state: UtsettelseState,
    newState: UtsettelseStatePartial
): UtsettelseState => ({
    ...state,
    ...newState
});

const UtsettelseReducer = (
    state = defaultState,
    action: PlanleggerActionTypes
) => {
    switch (action.type) {
        case PlanleggerActionTypeKeys.SET_TERMINDATO:
            return defaultState;
        case PlanleggerActionTypeKeys.UTSETTELSE_VIS_DIALOG:
            return updateState(state, {
                dialogErApen: true,
                valgtUtsettelse: action.utsettelse
            });
        case PlanleggerActionTypeKeys.UTSETTELSE_LUKK_DIALOG:
            return updateState(state, {
                dialogErApen: false,
                valgtUtsettelse: undefined
            });
        case PlanleggerActionTypeKeys.UTSETTELSE_OPPRETT_ELLER_OPPDATER:
            return opprettEllerOppdaterUtsettelse(state, action.utsettelse);
        case PlanleggerActionTypeKeys.UTSETTELSE_SLETT:
            return updateState(state, {
                utsettelser: state.utsettelser.filter(
                    (u) => u.id !== action.utsettelse.id
                ),
                valgtUtsettelse: undefined,
                dialogErApen: false
            });
        default:
            return state;
    }
};

export default UtsettelseReducer;
