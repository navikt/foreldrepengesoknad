import { FunctionComponent, ReactNode, createContext, useContext, useReducer } from 'react';
import { ArbeidIUtlandet } from 'types/ArbeidIUtlandet';
import { AvtaltFerie } from 'types/AvtaltFerie';
import { Barn } from 'types/Barn';
import Tilrettelegging from 'types/Tilrettelegging';

import {
    ArbeidsforholdOgInntektSvp,
    EgenNæring,
    Frilans,
    Utenlandsopphold,
    UtenlandsoppholdPeriode,
} from '@navikt/fp-types';

import SøknadRoutes from './routes';

export enum ContextDataType {
    APP_ROUTE = 'APP_ROUTE',
    OM_BARNET = 'OM_BARNET',
    UTENLANDSOPPHOLD = 'UTENLANDSOPPHOLD',
    UTENLANDSOPPHOLD_SENERE = 'UTENLANDSOPPHOLD_SENERE',
    UTENLANDSOPPHOLD_TIDLIGERE = 'UTENLANDSOPPHOLD_TIDLIGERE',
    ARBEIDSFORHOLD_OG_INNTEKT = 'ARBEIDSFORHOLD_OG_INNTEKT',
    FRILANS = 'FRILANS',
    ARBEID_I_UTLANDET = 'ARBEID_I_UTLANDET',
    EGEN_NÆRING = 'EGEN_NÆRING',
    TILRETTELEGGINGER = 'TILRETTELEGGINGER',
    VALGT_TILRETTELEGGING_ID = 'VALGT_TILRETTELEGGING_ID',
    FERIE = 'FERIE',
}

export type ContextDataMap = {
    [ContextDataType.APP_ROUTE]?: SøknadRoutes;
    [ContextDataType.OM_BARNET]?: Barn;
    [ContextDataType.UTENLANDSOPPHOLD]?: Utenlandsopphold;
    [ContextDataType.UTENLANDSOPPHOLD_SENERE]?: UtenlandsoppholdPeriode[];
    [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]?: UtenlandsoppholdPeriode[];
    [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]?: ArbeidsforholdOgInntektSvp;
    [ContextDataType.FRILANS]?: Frilans;
    [ContextDataType.ARBEID_I_UTLANDET]?: ArbeidIUtlandet;
    [ContextDataType.EGEN_NÆRING]?: EgenNæring;
    [ContextDataType.TILRETTELEGGINGER]?: Tilrettelegging[];
    [ContextDataType.FERIE]?: AvtaltFerie[];
    [ContextDataType.VALGT_TILRETTELEGGING_ID]?: string;
};

const defaultInitialState: ContextDataMap = {};

export type Action = { type: 'update'; key: ContextDataType; data: any } | { type: 'reset' };
type Dispatch = (action: Action) => void;

const SvpStateContext = createContext<ContextDataMap>(defaultInitialState);
const SvpDispatchContext = createContext<Dispatch | undefined>(undefined);

interface OwnProps {
    children: ReactNode;
    initialState?: ContextDataMap;
    onDispatch?: (action: Action) => void;
}

export const SvpDataContext: FunctionComponent<OwnProps> = ({ children, initialState, onDispatch }): JSX.Element => {
    const [state, dispatch] = useReducer((oldState: ContextDataMap, action: Action) => {
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
        <SvpStateContext.Provider value={state}>
            <SvpDispatchContext.Provider value={dispatchWrapper}>{children}</SvpDispatchContext.Provider>
        </SvpStateContext.Provider>
    );
};

/** Hook returns data for one specific data type  */
export const useContextGetData = <TYPE extends ContextDataType>(key: TYPE): ContextDataMap[TYPE] => {
    const state = useContext(SvpStateContext);
    return state[key];
};

/** Hook returns function capable of getting all types of data from context state  */
export const useContextGetAnyData = () => {
    const state = useContext(SvpStateContext);

    return <TYPE extends ContextDataType>(key: TYPE) => {
        return state[key];
    };
};

/** Hook returns save function for one specific data type */
export const useContextSaveData = <TYPE extends ContextDataType>(key: TYPE): ((data: ContextDataMap[TYPE]) => void) => {
    const dispatch = useContext(SvpDispatchContext);
    return (data: ContextDataMap[TYPE]) => {
        if (dispatch) {
            dispatch({ type: 'update', key, data });
        }
    };
};

/** Hook returns save function usable with all data types  */
export const useContextSaveAnyData = () => {
    const dispatch = useContext(SvpDispatchContext);
    return <TYPE extends ContextDataType>(key: TYPE, data: ContextDataMap[TYPE]) => {
        if (dispatch) {
            dispatch({ type: 'update', key, data });
        }
    };
};

/** Hook returns state reset function  */
export const useContextReset = () => {
    const dispatch = useContext(SvpDispatchContext);
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
    return useContext(SvpStateContext);
};
