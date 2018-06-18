import {
    PlanleggerActionTypes,
    PlanleggerActionTypeKeys
} from '../actions/actionTypes';
import { PeriodeState, PeriodeStatePartial } from '../types';
import { mockUtsettelser } from 'uttaksplan/redux/reducers/mockdata';
import { opprettUttaksperioder } from 'uttaksplan/uttaksplaner/uttaksplanPlanlegger';
import { UttaksplanBuilder } from 'uttaksplan/utils/UttaksplanBuilder';
import { UttaksplanManuell } from 'uttaksplan/utils/UttaksplanManuell';

const defaultState: PeriodeState = {
    dialogErApen: false,
    valgtPeriode: undefined,
    perioder: mockUtsettelser,
    manuellOppdatering: true
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
                perioder: UttaksplanBuilder(
                    opprettUttaksperioder(
                        action.termindato,
                        action.fellesukerForelder1,
                        action.fellesukerForelder2,
                        action.permisjonsregler
                    )
                ).buildUttaksplan().perioder
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
            if (state.manuellOppdatering) {
                return updateState(state, {
                    perioder: UttaksplanManuell(
                        state.perioder
                    ).leggTilEllerOppdater(action.periode).perioder,
                    dialogErApen: false
                });
            }
            return updateState(state, {
                perioder: UttaksplanBuilder(
                    state.perioder
                ).leggTilEllerOppdater(action.periode).perioder,
                dialogErApen: false
            });

        case PlanleggerActionTypeKeys.PERIODE_SLETT:
            if (state.manuellOppdatering) {
                return updateState(state, {
                    perioder: UttaksplanManuell(state.perioder).slettPeriode(
                        action.periode
                    ).perioder,
                    dialogErApen: false
                });
            }
            return updateState(state, {
                perioder: UttaksplanBuilder(state.perioder).slettPeriodeOgBuild(
                    action.periode
                ).perioder,
                valgtPeriode: undefined,
                dialogErApen: false
            });

        case PlanleggerActionTypeKeys.SET_MANUELL_UTTAKSPLAN:
            return updateState(state, {
                manuellOppdatering: action.manuellUttaksplan
            });

        case PlanleggerActionTypeKeys.DEV_ACTION:
            return updateState(state, {
                perioder: UttaksplanBuilder(state.perioder).perioder
            });

        default:
            return state;
    }
};

export default PeriodeReducer;
