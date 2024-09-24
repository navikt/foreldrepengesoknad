import { FunctionComponent, ReactNode, createContext, useContext, useReducer } from 'react';

import { Barn, NavnPåForeldre } from '@navikt/fp-common';
import { Familiesituasjon, SaksperiodeNy } from '@navikt/fp-types';

export enum UttaksplanContextDataType {
    UTTAKSPLAN = 'UTTAKSPLAN',
    FAMILIEHENDELSEDATO = 'FAMILIEHENDELSEDATO',
    ER_FAR_ELLER_MEDMOR = 'ER_FAR_ELLER_MEDMOR',
    NAVN_PÅ_FORELDRE = 'NAVN_PÅ_FORELDRE',
    BARN = 'BARN',
    FAMILIESITUASJON = 'FAMILIESITUASJON',
}

export type UttaksplanContextDataMap = {
    [UttaksplanContextDataType.UTTAKSPLAN]?: SaksperiodeNy[];
    [UttaksplanContextDataType.FAMILIEHENDELSEDATO]?: string;
    [UttaksplanContextDataType.ER_FAR_ELLER_MEDMOR]?: boolean;
    [UttaksplanContextDataType.NAVN_PÅ_FORELDRE]?: NavnPåForeldre;
    [UttaksplanContextDataType.BARN]?: Barn;
    [UttaksplanContextDataType.FAMILIESITUASJON]?: Familiesituasjon;
};

const defaultInitialState = {} as UttaksplanContextDataMap;

export type Action = { type: 'update'; key: UttaksplanContextDataType; data: any } | { type: 'reset' };
type Dispatch = (action: Action) => void;

const UttaksplanStateContext = createContext<UttaksplanContextDataMap>(defaultInitialState);
const UttaksplanDispatchContext = createContext<Dispatch | undefined>(undefined);

interface OwnProps {
    children: ReactNode;
    initialState?: UttaksplanContextDataMap;
    onDispatch?: (action: Action) => void;
}

export const UttaksplanDataContext: FunctionComponent<OwnProps> = ({
    children,
    initialState,
    onDispatch,
}): JSX.Element => {
    const [state, dispatch] = useReducer((oldState: UttaksplanContextDataMap, action: Action) => {
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
        <UttaksplanStateContext.Provider value={state}>
            <UttaksplanDispatchContext.Provider value={dispatchWrapper}>{children}</UttaksplanDispatchContext.Provider>
        </UttaksplanStateContext.Provider>
    );
};

/** Hook returns data for one specific data type  */
export const useContextGetData = <TYPE extends UttaksplanContextDataType>(
    key: TYPE,
): UttaksplanContextDataMap[TYPE] => {
    const state = useContext(UttaksplanStateContext);
    return state[key];
};

/** Hook returns function capable of getting all types of data from context state  */
export const useContextGetAnyData = () => {
    const state = useContext(UttaksplanStateContext);

    return <TYPE extends UttaksplanContextDataType>(key: TYPE) => {
        return state[key];
    };
};

/** Hook returns save function for one specific data type */
export const useContextSaveData = <TYPE extends UttaksplanContextDataType>(
    key: TYPE,
): ((data: UttaksplanContextDataMap[TYPE]) => void) => {
    const dispatch = useContext(UttaksplanDispatchContext);
    return (data: UttaksplanContextDataMap[TYPE]) => {
        if (dispatch) {
            dispatch({ type: 'update', key, data });
        }
    };
};

/** Hook returns save function usable with all data types  */
export const useContextSaveAnyData = () => {
    const dispatch = useContext(UttaksplanDispatchContext);
    return <TYPE extends UttaksplanContextDataType>(key: TYPE, data: UttaksplanContextDataMap[TYPE]) => {
        if (dispatch) {
            dispatch({ type: 'update', key, data });
        }
    };
};

/** Hook returns state reset function  */
export const useContextReset = () => {
    const dispatch = useContext(UttaksplanDispatchContext);
    return () => {
        if (dispatch) {
            dispatch({ type: 'reset' });
        }
    };
};
