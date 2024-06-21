import { FunctionComponent, ReactNode, createContext, useContext, useReducer } from 'react';

import { TilgjengeligeStønadskontoer } from '@navikt/fp-types';

import { AnnenPartVedtakDTO } from 'app/types/AnnenPartVedtakDTO';

export enum FpApiDataType {
    ANNEN_PART_VEDTAK = 'ANNEN_PART_VEDTAK',
    NESTE_SAK_ANNEN_PART_VEDTAK = 'NESTE_SAK_ANNEN_PART_VEDTAK',
    STØNADSKONTOER = 'STØNADSKONTOER',
}

export type FpApiDataHashMap = {
    [FpApiDataType.ANNEN_PART_VEDTAK]?: [number, AnnenPartVedtakDTO];
    [FpApiDataType.NESTE_SAK_ANNEN_PART_VEDTAK]?: [number, AnnenPartVedtakDTO];
    [FpApiDataType.STØNADSKONTOER]?: [number, TilgjengeligeStønadskontoer];
};

const defaultInitialState = {} as FpApiDataHashMap;

export type Action = { type: 'update'; key: FpApiDataType; hash: number; data: any } | { type: 'reset' };
type Dispatch = (action: Action) => void;

const FpApiStateContext = createContext<FpApiDataHashMap>(defaultInitialState);
const FpApiDispatchContext = createContext<Dispatch | undefined>(undefined);

interface OwnProps {
    children: ReactNode;
    initialState?: FpApiDataHashMap;
}

export const FpApiDataContext: FunctionComponent<OwnProps> = ({ children, initialState }): JSX.Element => {
    const [state, dispatch] = useReducer((oldState: FpApiDataHashMap, action: Action) => {
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
    }, initialState || defaultInitialState);

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
