import {
    PlanleggerActionTypes,
    PlanleggerActionTypeKeys
} from '../actions/actionTypes';
import { PeriodeState, PeriodeStatePartial } from '../types';
import { Periode } from '../../types';
import { guid } from 'nav-frontend-js-utils';
import { mockUtsettelser } from 'uttaksplan/redux/reducers/mockdata';
import { opprettStønadsperioder } from 'uttaksplan/utils/permisjonUtils';
import { finnOgLeggTilTapteUttak } from 'uttaksplan/utils/periodeUtils';

const defaultState: PeriodeState = {
    dialogErApen: false,
    valgtPeriode: undefined,
    perioder: mockUtsettelser
};

const opprettEllerOppdaterPeriode = (
    state: PeriodeState,
    periode: Periode
): PeriodeState => {
    let perioder = state.perioder;
    perioder = periode.id
        ? state.perioder.map(
              (u, idx) => (u.id === periode.id ? periode : state.perioder[idx])
          )
        : [
              ...state.perioder,
              {
                  ...periode,
                  id: guid()
              }
          ];
    perioder = finnOgLeggTilTapteUttak(perioder);
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

        case PlanleggerActionTypeKeys.OPPRETT_PERIODER:
            return {
                ...state,
                perioder: opprettStønadsperioder(
                    action.termindato,
                    action.dekningsgrad,
                    action.fellesukerForelder1,
                    action.fellesukerForelder2,
                    action.permisjonsregler
                )
            };

        case PlanleggerActionTypeKeys.PERIODE_VIS_DIALOG:
            return updateState(state, {
                dialogErApen: true,
                valgtPeriode: {
                    periodetype: action.periodetype,
                    periode: action.periode
                }
            });

        case PlanleggerActionTypeKeys.PERIODE_LUKK_DIALOG:
            return updateState(state, {
                dialogErApen: false,
                valgtPeriode: undefined
            });

        case PlanleggerActionTypeKeys.PERIODE_OPPRETT_ELLER_OPPDATER:
            return opprettEllerOppdaterPeriode(state, action.periode);

        case PlanleggerActionTypeKeys.PERIODE_SLETT:
            return updateState(state, {
                perioder: state.perioder.filter(
                    (u) => u.id !== action.periode.id
                ),
                valgtPeriode: undefined,
                dialogErApen: false
            });

        default:
            return state;
    }
};

export default PeriodeReducer;
