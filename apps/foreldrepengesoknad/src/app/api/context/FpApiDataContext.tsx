import { AnnenPartVedtakDTO } from 'app/types/AnnenPartVedtakDTO';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { createContext, useReducer, FunctionComponent, ReactNode, useContext } from 'react';

export enum FpApiDataType {
    ANNEN_PART_VEDTAK = 'ANNEN_PART_VEDTAK',
    STØNADSKONTOER_100 = 'STØNADSKONTOER_100',
    STØNADSKONTOER_80 = 'STØNADSKONTOER_80',
}

export type FpApiDataMap = {
    [FpApiDataType.ANNEN_PART_VEDTAK]?: Record<number, AnnenPartVedtakDTO>;
    [FpApiDataType.STØNADSKONTOER_100]?: Record<number, TilgjengeligeStønadskontoerDTO>;
    [FpApiDataType.STØNADSKONTOER_80]?: Record<number, TilgjengeligeStønadskontoerDTO>;
};

const defaultInitialState = {} as FpApiDataMap;

export type Action = { type: 'update'; key: FpApiDataType; hash: number; data: any } | { type: 'reset' };
type Dispatch = (action: Action) => void;
type State = FpApiDataMap;

const FpApiStateContext = createContext<State>(defaultInitialState);
const FpApiDispatchContext = createContext<Dispatch | undefined>(undefined);

interface OwnProps {
    children: ReactNode;
    initialState?: FpApiDataMap;
    onDispatch?: (action: Action) => void;
}

export const FpApiDataContext: FunctionComponent<OwnProps> = ({ children, initialState, onDispatch }): JSX.Element => {
    const [state, dispatch] = useReducer((oldState: State, action: Action) => {
        switch (action.type) {
            case 'update':
                return {
                    ...oldState,
                    [action.key]: { [action.hash]: action.data },
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
        <FpApiStateContext.Provider value={state}>
            <FpApiDispatchContext.Provider value={dispatchWrapper}>{children}</FpApiDispatchContext.Provider>
        </FpApiStateContext.Provider>
    );
};

export const useApiContextGetData = <TYPE extends FpApiDataType>(key: TYPE, hash: number) => {
    const state = useContext(FpApiStateContext);
    const typeData = state[key];
    return typeData ? typeData[hash] : undefined;
};

export const useApiContextSaveData = <TYPE extends FpApiDataType>(key: TYPE, hash: number) => {
    const dispatch = useContext(FpApiDispatchContext);
    //TODO (TOR) fix type her
    return (data: any) => {
        if (dispatch) {
            dispatch({ type: 'update', key, hash, data });
        }
    };
};
