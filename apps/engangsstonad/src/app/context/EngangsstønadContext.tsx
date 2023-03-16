import React, { createContext, Dispatch, FunctionComponent, ReactNode, useMemo, useReducer } from 'react';
import { EngangsstønadContextAction } from './action/actionCreator';
import { EngangsstønadContextState, engangsstønadInitialState } from './EngangsstønadContextConfig';
import engangsstønadReducer from './reducer/engangsstønadReducer';

interface EngangsstønadContextData {
    state: EngangsstønadContextState;
    dispatch: Dispatch<EngangsstønadContextAction>;
}

export const EngangsstønadContext = createContext<EngangsstønadContextData>(null!);

interface Props {
    children: ReactNode;
}

const EngangsstønadContextProvider: FunctionComponent<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(engangsstønadReducer, engangsstønadInitialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return <EngangsstønadContext.Provider value={contextValue}>{children}</EngangsstønadContext.Provider>;
};

export default EngangsstønadContextProvider;
