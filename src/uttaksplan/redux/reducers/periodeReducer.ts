import {
    PlanleggerActionTypes,
    PlanleggerActionTypeKeys
} from '../actions/actionTypes';
import { PeriodeState, PeriodeStatePartial } from '../types';
import { UttaksplanBuilder } from 'uttaksplan/utils/UttaksplanBuilder';
import { UttaksplanManuell } from 'uttaksplan/utils/UttaksplanManuell';
import { opprettUttaksperioderEnkel } from 'uttaksplan/uttaksplaner/uttaksplanDeler';

const defaultState: PeriodeState = {
    dialogErApen: false,
    valgtPeriode: undefined,
    perioder: [],
    manuellOppdatering: false
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
        case PlanleggerActionTypeKeys.OPPRETT_PERIODER:
            return {
                ...state,
                perioder: UttaksplanBuilder(
                    opprettUttaksperioderEnkel(
                        action.termindato,
                        action.dekningsgrad,
                        action.fellesukerForelder1,
                        action.fellesukerForelder2,
                        action.uttaksgrunnlag.permisjonsregler
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
                ).leggTilEllerOppdaterPeriode(action.periode).perioder,
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
