import {
    PlanleggerActionTypes,
    PlanleggerActionTypeKeys
} from '../actions/actionTypes';
import {
    UttaksplanViewState,
    SynligInfoMap,
    UttaksplanViewStatePartial
} from 'uttaksplan/redux/types';

export enum Infotekster {
    sats = 'sats',
    fordelingFellesperiode = 'fordeling',
    ferie = 'ferie'
}

const defaultState: UttaksplanViewState = {
    synligInfo: new Map(),
    spraak: 'nb',
    visTidslinje: false
};

const leggTilInfo = (infoMap: SynligInfoMap, id: string): SynligInfoMap => {
    const map = new Map(infoMap);
    map.set(id, true);
    return map;
};

const fjernInfo = (infoMap: SynligInfoMap, id: string): SynligInfoMap => {
    const map = new Map(infoMap);
    map.delete(id);
    return map;
};

const updateState = (
    state: UttaksplanViewState,
    viewState: UttaksplanViewStatePartial
): UttaksplanViewState => {
    return {
        ...state,
        ...viewState
    };
};

const ViewReducer = (state = defaultState, action: PlanleggerActionTypes) => {
    switch (action.type) {
        case PlanleggerActionTypeKeys.SET_SPRAAK:
            return updateState(state, { spraak: action.spraak });
        case PlanleggerActionTypeKeys.INFO_VIS:
            return updateState(state, {
                synligInfo: leggTilInfo(state.synligInfo, action.id)
            });
        case PlanleggerActionTypeKeys.INFO_SKJUL:
            return updateState(state, {
                synligInfo: fjernInfo(state.synligInfo, action.id)
            });
        case PlanleggerActionTypeKeys.VIS_TIDSLINJE:
            return updateState(state, {
                visTidslinje: action.synlig
            });
        default:
            return state;
    }
};

export default ViewReducer;
