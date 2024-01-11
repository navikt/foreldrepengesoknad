import { createContext, useReducer, FunctionComponent, ReactNode, useContext } from 'react';
import SøknadRoutes from 'app/routes/routes';
import { Barn } from 'app/types/Barn';
import { Opphold, SenereOpphold, TidligereOpphold } from 'app/types/InformasjonOmUtenlandsopphold';
import Tilrettelegging from 'app/types/Tilrettelegging';
import { Inntektsinformasjon } from 'app/types/Inntektsinformasjon';
import { Frilans } from 'app/types/Frilans';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import { EgenNæring } from 'app/types/EgenNæring';

export enum ContextDataType {
    APP_ROUTE = 'APP_ROUTE',
    OM_BARNET = 'OM_BARNET',
    UTENLANDSOPPHOLD = 'UTENLANDSOPPHOLD',
    UTENLANDSOPPHOLD_SENERE = 'UTENLANDSOPPHOLD_SENERE',
    UTENLANDSOPPHOLD_TIDLIGERE = 'UTENLANDSOPPHOLD_TIDLIGERE',
    INNTEKTSINFORMASJON = 'INNTEKTSINFORMASJON',
    FRILANS = 'FRILANS',
    ARBEID_I_UTLANDET = 'ARBEID_I_UTLANDET',
    EGEN_NÆRING = 'EGEN_NÆRING',
    TILRETTELEGGING = 'TILRETTELEGGING',
    VALGT_TILRETTELEGGING_ID = 'VALGT_TILRETTELEGGING_ID',
}

export type ContextDataMap = {
    [ContextDataType.APP_ROUTE]?: SøknadRoutes;
    [ContextDataType.OM_BARNET]?: Barn;
    [ContextDataType.UTENLANDSOPPHOLD]?: Opphold;
    [ContextDataType.UTENLANDSOPPHOLD_SENERE]?: SenereOpphold;
    [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]?: TidligereOpphold;
    [ContextDataType.INNTEKTSINFORMASJON]?: Inntektsinformasjon;
    [ContextDataType.FRILANS]?: Frilans;
    [ContextDataType.ARBEID_I_UTLANDET]?: ArbeidIUtlandet[];
    [ContextDataType.EGEN_NÆRING]?: EgenNæring;
    [ContextDataType.TILRETTELEGGING]?: Tilrettelegging[];
    [ContextDataType.VALGT_TILRETTELEGGING_ID]?: string;
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
