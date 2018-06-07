import {
    PlanleggerActionTypes,
    PlanleggerActionTypeKeys
} from '../actions/actionTypes';
import { PeriodeState, PeriodeStatePartial } from '../types';
import { Periode } from '../../types';
import { guid } from 'nav-frontend-js-utils';
import { mockUtsettelser } from 'uttaksplan/redux/reducers/mockdata';
import { refordelPerioder } from 'uttaksplan/utils/periodeUtils';
import { opprettUttaksperioder } from 'uttaksplan/utils/permisjonUtils';

const defaultState: PeriodeState = {
    dialogErApen: false,
    valgtPeriode: undefined,
    perioder: mockUtsettelser
};

const oppdaterPeriode = (perioder: Periode[], periode: Periode) =>
    perioder.map((p, idx) => (p.id === periode.id ? periode : p));

const leggTilPeriode = (perioder: Periode[], periode: Periode) => [
    ...perioder,
    {
        ...periode,
        id: guid()
    }
];

const opprettEllerOppdaterPeriode = (
    perioder: Periode[],
    periode: Periode
): Periode[] => {
    return refordelPerioder(
        periode.id
            ? oppdaterPeriode(perioder, periode)
            : leggTilPeriode(perioder, periode)
    );
};

const slettPeriode = (perioder: Periode[], periode: Periode): Periode[] => {
    return refordelPerioder(perioder.filter((p) => p.id !== periode.id));
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
                perioder: opprettEllerOppdaterPeriode(
                    state.perioder,
                    action.periode
                ),
                dialogErApen: false
            });

        case PlanleggerActionTypeKeys.PERIODE_SLETT:
            return updateState(state, {
                perioder: slettPeriode(state.perioder, action.periode),
                valgtPeriode: undefined,
                dialogErApen: false
            });

        case PlanleggerActionTypeKeys.DEV_ACTION:
            return updateState(state, {
                perioder: refordelPerioder(state.perioder)
            });

        default:
            return state;
    }
};

export default PeriodeReducer;
