import {
    UttaksplanActionTypes,
    UttaksplanActionTypeKeys
} from '../actions/actionTypes';
import { UttaksplanViewState, SynligInfoMap } from 'uttaksplan/redux/types';

export enum Infotekster {
    sats = 'sats',
    fordelingFellesperiode = 'fordeling',
    ferie = 'ferie'
}

const defaultState: UttaksplanViewState = {
    synligInfo: new Map(),
    visTidslinje: false,
    dialogErApen: false,
    valgtPeriode: undefined
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

const ViewReducer = (state = defaultState, action: UttaksplanActionTypes) => {
    switch (action.type) {
        case UttaksplanActionTypeKeys.PERIODE_VIS_DIALOG:
            return {
                ...state,
                dialogErApen: true,
                valgtPeriode: {
                    periodetype: action.periodetype,
                    periode: action.periode
                }
            };

        case UttaksplanActionTypeKeys.PERIODE_LUKK_DIALOG:
            return {
                ...state,
                dialogErApen: false,
                valgtPeriode: undefined
            };

        case UttaksplanActionTypeKeys.INFO_VIS:
            return {
                ...state,
                synligInfo: leggTilInfo(state.synligInfo, action.id)
            };
        case UttaksplanActionTypeKeys.INFO_SKJUL:
            return {
                ...state,
                synligInfo: fjernInfo(state.synligInfo, action.id)
            };
        case UttaksplanActionTypeKeys.VIS_TIDSLINJE:
            return {
                ...state,
                visTidslinje: action.synlig
            };
        default:
            return state;
    }
};

export default ViewReducer;
