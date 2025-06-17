import { JSX, ReactNode, createContext, useContext, useReducer } from 'react';
import { ArbeidIUtlandet } from 'types/ArbeidIUtlandet';
import { AvtaltFeriePerArbeidsgiver } from 'types/AvtaltFerie';
import { Barn } from 'types/Barn';
import { DelvisTilrettelegging, IngenTilrettelegging, PeriodeMedVariasjon } from 'types/Tilrettelegging';

import {
    ArbeidsforholdOgInntektSvp,
    Attachment,
    Frilans,
    NæringFormValues,
    Utenlandsopphold,
    UtenlandsoppholdPeriode,
} from '@navikt/fp-types';

import { SøknadRoute } from './routes';

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
    VALGTE_ARBEIDSFORHOLD = 'VALGTE_ARBEIDSFORHOLD',
    TILRETTELEGGINGER_VEDLEGG = 'TILRETTELEGGINGER_VEDLEGG',
    TILRETTELEGGINGER = 'TILRETTELEGGINGER',
    TILRETTELEGGINGER_PERIODER = 'TILRETTELEGGINGER_PERIODER',
    FERIE = 'FERIE',
}

export type ContextDataMap = {
    [ContextDataType.APP_ROUTE]?: SøknadRoute | string;
    [ContextDataType.OM_BARNET]?: Barn;
    [ContextDataType.UTENLANDSOPPHOLD]?: Utenlandsopphold;
    [ContextDataType.UTENLANDSOPPHOLD_SENERE]?: UtenlandsoppholdPeriode[];
    [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]?: UtenlandsoppholdPeriode[];
    [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]?: ArbeidsforholdOgInntektSvp;
    [ContextDataType.FRILANS]?: Frilans;
    [ContextDataType.ARBEID_I_UTLANDET]?: ArbeidIUtlandet;
    [ContextDataType.EGEN_NÆRING]?: NæringFormValues;
    [ContextDataType.VALGTE_ARBEIDSFORHOLD]?: string[];
    [ContextDataType.TILRETTELEGGINGER_VEDLEGG]?: Record<string, Attachment[]>;
    [ContextDataType.TILRETTELEGGINGER]?: Record<string, DelvisTilrettelegging | IngenTilrettelegging>;
    [ContextDataType.FERIE]?: AvtaltFeriePerArbeidsgiver;
    [ContextDataType.TILRETTELEGGINGER_PERIODER]?: Record<string, PeriodeMedVariasjon[]>;
};

const defaultInitialState = {} satisfies ContextDataMap;

export type Action = { type: 'update'; key: ContextDataType; data: any } | { type: 'reset' };
type Dispatch = (action: Action) => void;

const SvpStateContext = createContext<ContextDataMap>(defaultInitialState);
const SvpDispatchContext = createContext<Dispatch | undefined>(undefined);

interface Props {
    children: ReactNode;
    initialState?: ContextDataMap;
    onDispatch?: (action: Action) => void;
}

export const SvpDataContext = ({ children, initialState, onDispatch }: Props): JSX.Element => {
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
