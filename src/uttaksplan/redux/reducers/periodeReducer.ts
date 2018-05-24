import {
    PlanleggerActionTypes,
    PlanleggerActionTypeKeys
} from '../actions/actionTypes';
import { PeriodeState, PeriodeStatePartial } from '../types';
import { Utsettelsesperiode } from '../../types';
import { guid } from 'nav-frontend-js-utils';
import { mockUtsettelser } from 'uttaksplan/redux/reducers/mockdata';

const defaultState: PeriodeState = {
    dialogErApen: false,
    perioder: mockUtsettelser
};

const opprettEllerOppdaterUtsettelse = (
    state: PeriodeState,
    utsettelse: Utsettelsesperiode
): PeriodeState => {
    const perioder = utsettelse.id
        ? state.perioder.map(
              (u, idx) =>
                  u.id === utsettelse.id ? utsettelse : state.perioder[idx]
          )
        : [
              ...state.perioder,
              {
                  ...utsettelse,
                  id: guid()
              }
          ];
    return {
        ...state,
        perioder,
        dialogErApen: false
    };
};

const updateState = (
    state: PeriodeState,
    newState: PeriodeStatePartial
): PeriodeState => ({
    ...state,
    ...newState
});

const PeriodeReducer = (
    state = defaultState,
    action: PlanleggerActionTypes
): PeriodeState => {
    switch (action.type) {
        case PlanleggerActionTypeKeys.SET_TERMINDATO:
            return defaultState;
        case PlanleggerActionTypeKeys.UTSETTELSE_VIS_DIALOG:
            return updateState(state, {
                dialogErApen: true,
                valgtPeriode: action.utsettelse
            });
        case PlanleggerActionTypeKeys.UTSETTELSE_LUKK_DIALOG:
            return updateState(state, {
                dialogErApen: false,
                valgtPeriode: undefined
            });
        case PlanleggerActionTypeKeys.UTSETTELSE_OPPRETT_ELLER_OPPDATER:
            return opprettEllerOppdaterUtsettelse(state, action.utsettelse);
        case PlanleggerActionTypeKeys.UTSETTELSE_SLETT:
            return updateState(state, {
                perioder: state.perioder.filter(
                    (u) => u.id !== action.utsettelse.id
                ),
                valgtPeriode: undefined,
                dialogErApen: false
            });
        default:
            return state;
    }
};

export default PeriodeReducer;
