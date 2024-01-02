import { AnnenPartVedtakDTO } from 'app/types/AnnenPartVedtakDTO';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { createContext, useReducer, FunctionComponent, ReactNode, useContext } from 'react';

export enum FpApiDataType {
    ANNEN_PART_VEDTAK = 'ANNEN_PART_VEDTAK',
    NESTE_SAK_ANNEN_PART_VEDTAK = 'NESTE_SAK_ANNEN_PART_VEDTAK',
    STØNADSKONTOER_100 = 'STØNADSKONTOER_100',
    STØNADSKONTOER_80 = 'STØNADSKONTOER_80',
}

export type FpApiDataHashMap = {
    [FpApiDataType.ANNEN_PART_VEDTAK]?: [number, AnnenPartVedtakDTO];
    [FpApiDataType.NESTE_SAK_ANNEN_PART_VEDTAK]?: [number, AnnenPartVedtakDTO];
    [FpApiDataType.STØNADSKONTOER_100]?: [number, TilgjengeligeStønadskontoerDTO];
    [FpApiDataType.STØNADSKONTOER_80]?: [number, TilgjengeligeStønadskontoerDTO];
};

const defaultInitialState = {} as FpApiDataHashMap;

export type Action = { type: 'update'; key: FpApiDataType; hash: number; data: any } | { type: 'reset' };
type Dispatch = (action: Action) => void;
type State = FpApiDataHashMap;

const FpApiStateContext = createContext<State>(defaultInitialState);
const FpApiDispatchContext = createContext<Dispatch | undefined>(undefined);

interface OwnProps {
    children: ReactNode;
    initialState?: FpApiDataHashMap;
    onDispatch?: (action: Action) => void;
}

export const FpApiDataContext: FunctionComponent<OwnProps> = ({ children }): JSX.Element => {
    const [state, dispatch] = useReducer((oldState: State, action: Action) => {
        switch (action.type) {
            case 'update':
                return {
                    ...oldState,
                    [action.key]: [action.hash, action.data],
                };
            case 'reset':
                return {};
            default:
                throw new Error();
        }
    }, defaultInitialState);

    return (
        <FpApiStateContext.Provider value={state}>
            <FpApiDispatchContext.Provider value={dispatch}>{children}</FpApiDispatchContext.Provider>
        </FpApiStateContext.Provider>
    );
};

export const useApiContextGetData = <TYPE extends FpApiDataType>(key: TYPE, hash: number) => {
    const state = useContext(FpApiStateContext);
    const typeData = state[key];
    return typeData && typeData[0] === hash ? typeData[1] : undefined;
};

export const useApiContextSaveData = <TYPE extends FpApiDataType>(key: TYPE, hash: number) => {
    const dispatch = useContext(FpApiDispatchContext);
    return (data: NonNullable<FpApiDataHashMap[TYPE]>[1]) => {
        if (dispatch) {
            dispatch({ type: 'update', key, hash, data });
        }
    };
};
