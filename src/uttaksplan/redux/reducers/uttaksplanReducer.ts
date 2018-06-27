import {
    PlanleggerActionTypes,
    PlanleggerActionTypeKeys
} from '../actions/actionTypes';
import { UttaksplanState, UttaksplanStatePartial } from '../types';
import { UttaksplanBuilder } from 'uttaksplan/utils/UttaksplanBuilder';
import { UttaksplanManuell } from 'uttaksplan/utils/UttaksplanManuell';
import { opprettUttaksperioderEnkel } from 'uttaksplan/uttaksplaner/uttaksplanDeler';

const defaultState: UttaksplanState = {
    perioder: [],
    manuellOppdatering: false
};

const updateState = (
    state: UttaksplanState,
    newState: UttaksplanStatePartial
): UttaksplanState => ({
    ...state,
    ...newState
});

const UttaksplanReducer = (
    state = defaultState,
    action: PlanleggerActionTypes
): UttaksplanState => {
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

        case PlanleggerActionTypeKeys.PERIODE_OPPRETT_ELLER_OPPDATER:
            if (state.manuellOppdatering) {
                return updateState(state, {
                    perioder: UttaksplanManuell(
                        state.perioder
                    ).leggTilEllerOppdater(action.periode).perioder
                });
            }
            return updateState(state, {
                perioder: UttaksplanBuilder(
                    state.perioder
                ).leggTilEllerOppdaterPeriode(action.periode).perioder
            });

        case PlanleggerActionTypeKeys.PERIODE_SLETT:
            if (state.manuellOppdatering) {
                return updateState(state, {
                    perioder: UttaksplanManuell(state.perioder).slettPeriode(
                        action.periode
                    ).perioder
                });
            }
            return updateState(state, {
                perioder: UttaksplanBuilder(state.perioder).slettPeriodeOgBuild(
                    action.periode
                ).perioder
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

export default UttaksplanReducer;
