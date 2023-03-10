import React, { createContext, Dispatch, FunctionComponent, ReactNode, useMemo, useReducer } from 'react';
import { ForeldrepengesøknadContextAction } from './action/actionCreator';
import { ForeldrepengesøknadContextState, foreldrepengesøknadInitialState } from './ForeldrepengesøknadContextConfig';
import foreldrepengesøknadReducer from './reducer/foreldrepengesøknadReducer';

interface ForeldrepengesøknadContextData {
    state: ForeldrepengesøknadContextState;
    dispatch: Dispatch<ForeldrepengesøknadContextAction>;
}

export const ForeldrepengesøknadContext = createContext<ForeldrepengesøknadContextData>(null!);

interface Props {
    children: ReactNode;
}

const ForeldrepengesøknadContextProvider: FunctionComponent<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(foreldrepengesøknadReducer, foreldrepengesøknadInitialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return <ForeldrepengesøknadContext.Provider value={contextValue}>{children}</ForeldrepengesøknadContext.Provider>;
};

export default ForeldrepengesøknadContextProvider;
