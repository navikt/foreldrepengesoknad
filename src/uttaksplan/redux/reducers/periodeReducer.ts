import {
    PlanleggerActionTypes,
    PlanleggerActionTypeKeys
} from '../actions/actionTypes';
import { PeriodeState, PeriodeStatePartial } from '../types';
import { mockUtsettelser } from 'uttaksplan/redux/reducers/mockdata';
import { opprettUttaksperioder } from 'uttaksplan/uttaksplaner/uttaksplanPlanlegger';
import { Uttaksplan } from 'uttaksplan/utils/UttaksplanBuilder';

const defaultState: PeriodeState = {
    dialogErApen: false,
    valgtPeriode: undefined,
    perioder: mockUtsettelser
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
                perioder: opprettUttaksperioder(
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
            return updateState(state, {
                perioder: action.periode.id
                    ? Uttaksplan(state.perioder).oppdaterPeriode(action.periode)
                          .perioder
                    : Uttaksplan(state.perioder).leggTilPeriode(action.periode)
                          .perioder,
                dialogErApen: false
            });

        case PlanleggerActionTypeKeys.PERIODE_SLETT:
            return updateState(state, {
                perioder: Uttaksplan(state.perioder).slettPeriode(
                    action.periode
                ).perioder,
                valgtPeriode: undefined,
                dialogErApen: false
            });

        case PlanleggerActionTypeKeys.DEV_ACTION:
            return updateState(state, {
                perioder: Uttaksplan(state.perioder).perioder
            });

        default:
            return state;
    }
};

export default PeriodeReducer;
