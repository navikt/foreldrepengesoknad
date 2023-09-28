import { createContext, useReducer, FunctionComponent, ReactNode, useContext, useCallback } from 'react';
import { OmBarnet } from 'types/OmBarnet';
import { Søkersituasjon } from 'types/Søkersituasjon';
import { Utenlandsopphold, UtenlandsoppholdNeste, UtenlandsoppholdSiste } from 'types/Utenlandsopphold';

export enum EsDataType {
    SØKERSITUASJON = 'SØKERSITUASJON',
    OM_BARNET = 'OM_BARNET',
    UTENLANDSOPPHOLD = 'UTENLANDSOPPHOLD',
    UTENLANDSOPPHOLD_NESTE = 'UTENLANDSOPPHOLD_NESTE',
    UTENLANDSOPPHOLD_SISTE = 'UTENLANDSOPPHOLD_SISTE',
}

export type EsDataMap = {
    [EsDataType.SØKERSITUASJON]?: Søkersituasjon;
    [EsDataType.OM_BARNET]?: OmBarnet;
    [EsDataType.UTENLANDSOPPHOLD]?: Utenlandsopphold;
    [EsDataType.UTENLANDSOPPHOLD_NESTE]?: UtenlandsoppholdNeste;
    [EsDataType.UTENLANDSOPPHOLD_SISTE]?: UtenlandsoppholdSiste;
};

const defaultInitialState = {} as EsDataMap;

type Action = { type: 'update'; key: EsDataType; data: any } | { type: 'reset' };
type Dispatch = (action: Action) => void;
type State = EsDataMap;

const EsStateContext = createContext<State>(defaultInitialState);
const EsDispatchContext = createContext<Dispatch | undefined>(undefined);

interface OwnProps {
    children: ReactNode;
    initialState?: EsDataMap;
}

export const EsDataContext: FunctionComponent<OwnProps> = ({ children, initialState }): JSX.Element => {
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

    return (
        <EsStateContext.Provider value={state}>
            <EsDispatchContext.Provider value={dispatch}>{children}</EsDispatchContext.Provider>
        </EsStateContext.Provider>
    );
};

export function useEsStateSaveFn<TYPE extends EsDataType>(key: TYPE): (data: EsDataMap[TYPE]) => void {
    const dispatch = useContext(EsDispatchContext);
    return useCallback(
        (data: EsDataMap[TYPE]) => {
            if (dispatch) {
                dispatch({ type: 'update', key, data });
            }
        },
        [dispatch],
    );
}

export function useEsStateResetFn(): () => void {
    const dispatch = useContext(EsDispatchContext);
    return useCallback(() => {
        if (dispatch) {
            dispatch({ type: 'reset' });
        }
    }, [dispatch]);
}

export function useEsStateData<TYPE extends EsDataType>(key: TYPE): EsDataMap[TYPE] {
    const state = useContext(EsStateContext);
    return state[key];
}
