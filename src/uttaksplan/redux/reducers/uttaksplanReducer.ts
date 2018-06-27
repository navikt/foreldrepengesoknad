import {
    UttaksplanActionTypes,
    UttaksplanActionTypeKeys
} from '../actions/actionTypes';
import { UttaksplanState } from '../types';
import { UttaksplanBuilder } from 'uttaksplan/utils/UttaksplanBuilder';
import { UttaksplanManuell } from 'uttaksplan/utils/UttaksplanManuell';
import { opprettUttaksperioderEnkel } from 'uttaksplan/uttaksplaner/uttaksplanDeler';
import {
    getUttaksdatoer,
    getUttaksgrunnlag
} from 'uttaksplan/utils/uttaksgrunnlagUtils';

const defaultState: UttaksplanState = {
    perioder: [],
    manuellOppdatering: false
};

const UttaksplanReducer = (
    state = defaultState,
    action: UttaksplanActionTypes
): UttaksplanState => {
    switch (action.type) {
        case UttaksplanActionTypeKeys.INIT_UTTAKSPLAN:
            return {
                manuellOppdatering: false,
                perioder: [],
                uttaksdatoer: getUttaksdatoer(action.props.termindato),
                uttaksgrunnlag: getUttaksgrunnlag(
                    action.props,
                    action.dekningsgrad
                )
            };
        case UttaksplanActionTypeKeys.OPPRETT_PERIODER:
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

        case UttaksplanActionTypeKeys.PERIODE_OPPRETT_ELLER_OPPDATER:
            if (state.manuellOppdatering) {
                return {
                    ...state,
                    perioder: UttaksplanManuell(
                        state.perioder
                    ).leggTilEllerOppdater(action.periode).perioder
                };
            }
            return {
                ...state,
                perioder: UttaksplanBuilder(
                    state.perioder
                ).leggTilEllerOppdaterPeriode(action.periode).perioder
            };

        case UttaksplanActionTypeKeys.PERIODE_SLETT:
            if (state.manuellOppdatering) {
                return {
                    ...state,
                    perioder: UttaksplanManuell(state.perioder).slettPeriode(
                        action.periode
                    ).perioder
                };
            }
            return {
                ...state,
                perioder: UttaksplanBuilder(state.perioder).slettPeriodeOgBuild(
                    action.periode
                ).perioder
            };

        case UttaksplanActionTypeKeys.SET_MANUELL_UTTAKSPLAN:
            return {
                ...state,
                manuellOppdatering: action.manuellUttaksplan
            };

        case UttaksplanActionTypeKeys.DEV_ACTION:
            return {
                ...state,
                perioder: UttaksplanBuilder(state.perioder).perioder
            };

        default:
            return state;
    }
};

export default UttaksplanReducer;
