import { createContext, useReducer, FunctionComponent, ReactNode, useContext } from 'react';
import SøknadRoutes from 'app/routes/routes';
import { Barn } from 'app/types/Barn';
import { Opphold, SenereOpphold, TidligereOpphold } from 'app/types/InformasjonOmUtenlandsopphold';
import { Søker } from 'app/types/Søker';
import Tilrettelegging from 'app/types/Tilrettelegging';

export enum ContextDataType {
    APP_ROUTE = 'APP_ROUTE',
    OM_BARNET = 'OM_BARNET',
    UTENLANDSOPPHOLD = 'UTENLANDSOPPHOLD',
    UTENLANDSOPPHOLD_SENERE = 'UTENLANDSOPPHOLD_SENERE',
    UTENLANDSOPPHOLD_TIDLIGERE = 'UTENLANDSOPPHOLD_TIDLIGERE',
    SØKER = 'SØKER',
    TILRETTELEGGING = 'TILRETTELEGGING',
    TILRETTELEGGING_ID = 'TILRETTELEGGING_ID',
}

export type ContextDataMap = {
    [ContextDataType.APP_ROUTE]?: SøknadRoutes | string;
    [ContextDataType.OM_BARNET]?: Barn;
    [ContextDataType.UTENLANDSOPPHOLD]?: Opphold;
    [ContextDataType.UTENLANDSOPPHOLD_SENERE]?: SenereOpphold;
    [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]?: TidligereOpphold;
    [ContextDataType.SØKER]?: Søker;
    [ContextDataType.TILRETTELEGGING]?: Tilrettelegging[];
    [ContextDataType.TILRETTELEGGING_ID]?: string;
};

const defaultInitialState = {} as ContextDataMap;

export type Action = { type: 'update'; key: ContextDataType; data: any } | { type: 'reset' };
type Dispatch = (action: Action) => void;
type State = ContextDataMap;

const SvpStateContext = createContext<State>(defaultInitialState);
const SvpDispatchContext = createContext<Dispatch | undefined>(undefined);

interface OwnProps {
    children: ReactNode;
    initialState?: ContextDataMap;
    onDispatch?: (action: Action) => void;
}

export const SvpDataContext: FunctionComponent<OwnProps> = ({ children, initialState, onDispatch }): JSX.Element => {
    const [state, dispatch] = useReducer((oldState: State, action: Action) => {
        switch (action.type) {
            case 'update':
                return {
                    ...oldState,
                    [action.key]: action.data,
                };
            case 'reset':
                return {};
            default:
                throw new Error();
        }
    }, initialState || defaultInitialState);

    const dispatchWrapper = (a: Action) => {
        if (onDispatch) {
            onDispatch(a);
        }
        dispatch(a);
    };

    return (
        <SvpStateContext.Provider value={state}>
            <SvpDispatchContext.Provider value={dispatchWrapper}>{children}</SvpDispatchContext.Provider>
        </SvpStateContext.Provider>
    );
};

/** Hook returns data for one specific data type  */
export const useContextGetData = <TYPE extends ContextDataType>(key: TYPE): ContextDataMap[TYPE] => {
    const state = useContext(SvpStateContext);
    return state[key];
};

/** Hook returns function capable of getting all types of data from context state  */
export const useContextGetAnyData = () => {
    const state = useContext(SvpStateContext);

    return <TYPE extends ContextDataType>(key: TYPE) => {
        return state[key];
    };
};

/** Hook returns save function for one specific data type */
export const useContextSaveData = <TYPE extends ContextDataType>(key: TYPE): ((data: ContextDataMap[TYPE]) => void) => {
    const dispatch = useContext(SvpDispatchContext);
    return (data: ContextDataMap[TYPE]) => {
        if (dispatch) {
            dispatch({ type: 'update', key, data });
        }
    };
};

/** Hook returns save function usable with all data types  */
export const useContextSaveAnyData = () => {
    const dispatch = useContext(SvpDispatchContext);
    return <TYPE extends ContextDataType>(key: TYPE, data: ContextDataMap[TYPE]) => {
        if (dispatch) {
            dispatch({ type: 'update', key, data });
        }
    };
};

/** Hook returns state reset function  */
export const useContextReset = () => {
    const dispatch = useContext(SvpDispatchContext);
    return () => {
        if (dispatch) {
            dispatch({ type: 'reset' });
        }
    };
};

// TODO (TOR) Fjern denne
/**
 * @deprecated Bruk heller useFpStateData eller useFpStateAllDataFn
 */
export const useContextComplete = () => {
    return useContext(SvpStateContext);
};
