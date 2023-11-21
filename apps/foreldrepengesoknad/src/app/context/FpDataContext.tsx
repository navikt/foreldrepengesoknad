import { createContext, useReducer, FunctionComponent, ReactNode, useContext, useCallback } from 'react';
import { SøkersituasjonFp } from '@navikt/fp-types';
import { AnnenForelder, Barn, BarnFraNesteSak, EksisterendeSak, Periode } from '@navikt/fp-common';
import { Opphold, SenereOpphold, TidligereOpphold } from './types/InformasjonOmUtenlandsopphold';
import SøknadRoutes from 'app/routes/routes';
import Søker from './types/Søker';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';
import UttaksplanInfo from './types/UttaksplanInfo';

export enum FpDataType {
    APP_ROUTE = 'APP_ROUTE',
    EKSISTERENDE_SAK = 'EKSISTERENDE_SAK',
    BARN_FRA_NESTE_SAK = 'BARN_FRA_NESTE_SAK',
    SØKERSITUASJON = 'SØKERSITUASJON',
    OM_BARNET = 'OM_BARNET',
    ANNEN_FORELDER = 'ANNEN_FORELDER',
    SØKER = 'SØKER',
    UTENLANDSOPPHOLD = 'UTENLANDSOPPHOLD',
    UTENLANDSOPPHOLD_SENERE = 'UTENLANDSOPPHOLD_SENERE',
    UTENLANDSOPPHOLD_TIDLIGERE = 'UTENLANDSOPPHOLD_TIDLIGERE',
    UTTAKSPLAN_INFO = 'UTTAKSPLAN_INFO',
    UTTAKSPLAN = 'UTTAKSPLAN',
    UTTAKSPLAN_METADATA = 'UTTAKSPLAN_METADATA',
}

export type FpDataMap = {
    [FpDataType.APP_ROUTE]?: SøknadRoutes;
    [FpDataType.EKSISTERENDE_SAK]?: EksisterendeSak;
    [FpDataType.BARN_FRA_NESTE_SAK]?: BarnFraNesteSak;
    [FpDataType.SØKERSITUASJON]?: SøkersituasjonFp;
    [FpDataType.OM_BARNET]?: Barn;
    [FpDataType.ANNEN_FORELDER]?: AnnenForelder;
    [FpDataType.SØKER]?: Søker;
    [FpDataType.UTENLANDSOPPHOLD]?: Opphold;
    [FpDataType.UTENLANDSOPPHOLD_SENERE]?: SenereOpphold;
    [FpDataType.UTENLANDSOPPHOLD_TIDLIGERE]?: TidligereOpphold;
    [FpDataType.UTTAKSPLAN_INFO]?: UttaksplanInfo;
    [FpDataType.UTTAKSPLAN]?: Periode[];
    [FpDataType.UTTAKSPLAN_METADATA]?: UttaksplanMetaData;
};

const defaultInitialState = {} as FpDataMap;

export type Action = { type: 'update'; key: FpDataType; data: any } | { type: 'reset' };
type Dispatch = (action: Action) => void;
type State = FpDataMap;

const FpStateContext = createContext<State>(defaultInitialState);
const FpDispatchContext = createContext<Dispatch | undefined>(undefined);

interface OwnProps {
    children: ReactNode;
    initialState?: FpDataMap;
    onDispatch?: (action: Action) => void;
}

export const FpDataContext: FunctionComponent<OwnProps> = ({ children, initialState, onDispatch }): JSX.Element => {
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

    const dispatchWrapper = useCallback(
        (a: Action) => {
            if (onDispatch) {
                onDispatch(a);
            }
            dispatch(a);
        },
        [onDispatch],
    );

    return (
        <FpStateContext.Provider value={state}>
            <FpDispatchContext.Provider value={dispatchWrapper}>{children}</FpDispatchContext.Provider>
        </FpStateContext.Provider>
    );
};

/** Hook returns save function for one specific data type */
export const useFpStateSaveFn = <TYPE extends FpDataType>(key: TYPE): ((data: FpDataMap[TYPE]) => void) => {
    const dispatch = useContext(FpDispatchContext);
    return useCallback(
        (data: FpDataMap[TYPE]) => {
            if (dispatch) {
                dispatch({ type: 'update', key, data });
            }
        },
        [dispatch, key],
    );
};

/** Hook returns save function usable with all data types  */
export const useAllStateSaveFn = () => {
    const dispatch = useContext(FpDispatchContext);
    return useCallback(
        <TYPE extends FpDataType>(key: TYPE, data: FpDataMap[TYPE]) => {
            if (dispatch) {
                dispatch({ type: 'update', key, data });
            }
        },
        [dispatch],
    );
};

/** Hook returns state reset function  */
export const useFpStateResetFn = () => {
    const dispatch = useContext(FpDispatchContext);
    return useCallback(() => {
        if (dispatch) {
            dispatch({ type: 'reset' });
        }
    }, [dispatch]);
};

/** Hook returns data for one specific data type  */
export const useFpStateData = <TYPE extends FpDataType>(key: TYPE): FpDataMap[TYPE] => {
    const state = useContext(FpStateContext);
    return state[key];
};

/** Hook returns function capable of getting all types of data from context state  */
export const useFpStateAllDataFn = () => {
    const state = useContext(FpStateContext);

    return useCallback(
        <TYPE extends FpDataType>(key: TYPE) => {
            return state[key];
        },
        [state],
    );
};

// TODO (TOR) Fjern denne
/**
 * @deprecated Bruk heller useFpStateData eller useFpStateAllDataFn
 */
export const useFpState = () => {
    return useContext(FpStateContext);
};
