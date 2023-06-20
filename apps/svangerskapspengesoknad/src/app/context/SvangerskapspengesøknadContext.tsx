import { createContext, Dispatch, FunctionComponent, ReactNode, useMemo, useReducer } from 'react';
import {
    SvangerskapspengesøknadContextState as SvangerskapspengerContextState,
    svangerskapspengesøknadInitialState,
} from './SvangerskapspengesøknadContextConfig';
import { SvangerskapspengerContextAction } from './action/actionCreator';
import svangerskapspengesøknadReducer from './reducer/svangerskapspengesøknadReducer';

interface SvangerskapspengerContextData {
    state: SvangerskapspengerContextState;
    dispatch: Dispatch<SvangerskapspengerContextAction>;
}

export const SvangerskapspengesøknadContext = createContext<SvangerskapspengerContextData>(null!);

interface Props {
    children: ReactNode;
}

const SvangerskapspengesøknadContextProvider: FunctionComponent<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(svangerskapspengesøknadReducer, svangerskapspengesøknadInitialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return (
        <SvangerskapspengesøknadContext.Provider value={contextValue}>
            {children}
        </SvangerskapspengesøknadContext.Provider>
    );
};

export default SvangerskapspengesøknadContextProvider;
