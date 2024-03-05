import { FunctionComponent, ReactNode, createContext, useContext, useReducer } from 'react';

import { AnnenForelder, Barn, BarnFraNesteSak, EksisterendeSak, Periode } from '@navikt/fp-common';
import { SøkersituasjonFp } from '@navikt/fp-types';

import SøknadRoutes from 'app/routes/routes';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';
import { VedleggDataType } from 'app/types/VedleggDataType';

import { Opphold, SenereOpphold, TidligereOpphold } from './types/InformasjonOmUtenlandsopphold';
import PeriodeMedForeldrepenger from './types/PeriodeMedForeldrepenger';
import SøkerData from './types/SøkerData';
import UttaksplanInfo from './types/UttaksplanInfo';

export enum ContextDataType {
    APP_ROUTE = 'APP_ROUTE',
    EKSISTERENDE_SAK = 'EKSISTERENDE_SAK',
    BARN_FRA_NESTE_SAK = 'BARN_FRA_NESTE_SAK',
    SØKERSITUASJON = 'SØKERSITUASJON',
    OM_BARNET = 'OM_BARNET',
    ANNEN_FORELDER = 'ANNEN_FORELDER',
    SØKER_DATA = 'SØKER',
    UTENLANDSOPPHOLD = 'UTENLANDSOPPHOLD',
    UTENLANDSOPPHOLD_SENERE = 'UTENLANDSOPPHOLD_SENERE',
    UTENLANDSOPPHOLD_TIDLIGERE = 'UTENLANDSOPPHOLD_TIDLIGERE',
    PERIODE_MED_FORELDREPENGER = 'PERIODE_MED_FORELDREPENGER',
    UTTAKSPLAN_INFO = 'UTTAKSPLAN_INFO',
    UTTAKSPLAN = 'UTTAKSPLAN',
    UTTAKSPLAN_METADATA = 'UTTAKSPLAN_METADATA',
    VEDLEGG = 'VEDLEGG',
}

export type ContextDataMap = {
    [ContextDataType.APP_ROUTE]?: SøknadRoutes;
    [ContextDataType.EKSISTERENDE_SAK]?: EksisterendeSak;
    [ContextDataType.BARN_FRA_NESTE_SAK]?: BarnFraNesteSak;
    [ContextDataType.SØKERSITUASJON]?: SøkersituasjonFp;
    [ContextDataType.OM_BARNET]?: Barn;
    [ContextDataType.ANNEN_FORELDER]?: AnnenForelder;
    [ContextDataType.SØKER_DATA]?: SøkerData;
    [ContextDataType.UTENLANDSOPPHOLD]?: Opphold;
    [ContextDataType.UTENLANDSOPPHOLD_SENERE]?: SenereOpphold;
    [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]?: TidligereOpphold;
    [ContextDataType.PERIODE_MED_FORELDREPENGER]?: PeriodeMedForeldrepenger;
    [ContextDataType.UTTAKSPLAN_INFO]?: UttaksplanInfo;
    [ContextDataType.UTTAKSPLAN]?: Periode[];
    [ContextDataType.UTTAKSPLAN_METADATA]?: UttaksplanMetaData;
    [ContextDataType.VEDLEGG]?: VedleggDataType;
};

const defaultInitialState = {} as ContextDataMap;

export type Action = { type: 'update'; key: ContextDataType; data: any } | { type: 'reset' };
type Dispatch = (action: Action) => void;
type State = ContextDataMap;

const FpStateContext = createContext<State>(defaultInitialState);
const FpDispatchContext = createContext<Dispatch | undefined>(undefined);

interface OwnProps {
    children: ReactNode;
    initialState?: ContextDataMap;
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

    const dispatchWrapper = (a: Action) => {
        if (onDispatch) {
            onDispatch(a);
        }
        dispatch(a);
    };

    return (
        <FpStateContext.Provider value={state}>
            <FpDispatchContext.Provider value={dispatchWrapper}>{children}</FpDispatchContext.Provider>
        </FpStateContext.Provider>
    );
};

/** Hook returns data for one specific data type  */
export const useContextGetData = <TYPE extends ContextDataType>(key: TYPE): ContextDataMap[TYPE] => {
    const state = useContext(FpStateContext);
    return state[key];
};

/** Hook returns function capable of getting all types of data from context state  */
export const useContextGetAnyData = () => {
    const state = useContext(FpStateContext);

    return <TYPE extends ContextDataType>(key: TYPE) => {
        return state[key];
    };
};

/** Hook returns save function for one specific data type */
export const useContextSaveData = <TYPE extends ContextDataType>(key: TYPE): ((data: ContextDataMap[TYPE]) => void) => {
    const dispatch = useContext(FpDispatchContext);
    return (data: ContextDataMap[TYPE]) => {
        if (dispatch) {
            dispatch({ type: 'update', key, data });
        }
    };
};

/** Hook returns save function usable with all data types  */
export const useContextSaveAnyData = () => {
    const dispatch = useContext(FpDispatchContext);
    return <TYPE extends ContextDataType>(key: TYPE, data: ContextDataMap[TYPE]) => {
        if (dispatch) {
            dispatch({ type: 'update', key, data });
        }
    };
};

/** Hook returns state reset function  */
export const useContextReset = () => {
    const dispatch = useContext(FpDispatchContext);
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
    return useContext(FpStateContext);
};
