import { SøknadRoutes } from 'appData/routes';
import { JSX, ReactNode, createContext, use, useCallback, useEffect, useReducer, useRef } from 'react';
import { AndreInntektskilder } from 'types/AndreInntektskilder';
import { AnnenForelder } from 'types/AnnenForelder';
import { Fordeling } from 'types/Fordeling';
import { VedleggDataType } from 'types/VedleggDataType';

import {
    ArbeidsforholdOgInntektFp,
    Barn,
    Dekningsgrad,
    Frilans,
    NæringDto,
    SøkersituasjonFp,
    Utenlandsopphold,
    UtenlandsoppholdPeriode,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';

export enum ContextDataType {
    APP_ROUTE = 'APP_ROUTE',
    VALGT_EKSISTERENDE_SAKSNR = 'VALGT_EKSISTERENDE_SAKSNR',
    SØKERSITUASJON = 'SØKERSITUASJON',
    OM_BARNET = 'OM_BARNET',
    ANNEN_FORELDER = 'ANNEN_FORELDER',
    ARBEIDSFORHOLD_OG_INNTEKT = 'ARBEIDSFORHOLD_OG_INNTEKT',
    EGEN_NÆRING = 'EGEN_NÆRING',
    FRILANS = 'FRILANS',
    ANDRE_INNTEKTSKILDER = 'ANDRE_INNTEKTSKILDER',
    UTENLANDSOPPHOLD = 'UTENLANDSOPPHOLD',
    UTENLANDSOPPHOLD_SENERE = 'UTENLANDSOPPHOLD_SENERE',
    UTENLANDSOPPHOLD_TIDLIGERE = 'UTENLANDSOPPHOLD_TIDLIGERE',
    PERIODE_MED_FORELDREPENGER = 'PERIODE_MED_FORELDREPENGER',
    FORDELING = 'FORDELING',
    UTTAKSPLAN = 'UTTAKSPLAN',
    OPPRINNELIG_UTTAKSPLAN = 'OPPRINNELIG_UTTAKSPLAN',
    HAR_JUSTERT_UTTAK_VED_FØDSEL = 'HAR_JUSTERT_UTTAK_VED_FØDSEL',
    VEDLEGG = 'VEDLEGG',
    KOMMER_FRA_PLANLEGGER = 'KOMMER_FRA_PLANLEGGER',
}

export type OpprinneligUttaksplan = {
    saksnummer: string;
    perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
};

export type ContextDataMap = {
    [ContextDataType.APP_ROUTE]?: SøknadRoutes;
    [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]?: string;
    [ContextDataType.SØKERSITUASJON]?: SøkersituasjonFp;
    [ContextDataType.OM_BARNET]?: Barn;
    [ContextDataType.ANNEN_FORELDER]?: AnnenForelder;
    [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]?: ArbeidsforholdOgInntektFp;
    [ContextDataType.EGEN_NÆRING]?: NæringDto;
    [ContextDataType.FRILANS]?: Frilans;
    [ContextDataType.ANDRE_INNTEKTSKILDER]?: AndreInntektskilder[];
    [ContextDataType.UTENLANDSOPPHOLD]?: Utenlandsopphold;
    [ContextDataType.UTENLANDSOPPHOLD_SENERE]?: UtenlandsoppholdPeriode[];
    [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]?: UtenlandsoppholdPeriode[];
    [ContextDataType.PERIODE_MED_FORELDREPENGER]?: Dekningsgrad;
    [ContextDataType.FORDELING]?: Fordeling;
    [ContextDataType.UTTAKSPLAN]?: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    [ContextDataType.OPPRINNELIG_UTTAKSPLAN]?: OpprinneligUttaksplan;
    [ContextDataType.HAR_JUSTERT_UTTAK_VED_FØDSEL]?: boolean;
    [ContextDataType.VEDLEGG]?: VedleggDataType;
    [ContextDataType.KOMMER_FRA_PLANLEGGER]?: boolean;
};

const defaultInitialState = {} as ContextDataMap;

export type Action =
    { type: 'update'; key: ContextDataType; data: ContextDataMap[keyof ContextDataMap] } | { type: 'reset' };
type Dispatch = (action: Action) => void;

const FpStateContext = createContext<ContextDataMap>(defaultInitialState);
const FpDispatchContext = createContext<Dispatch | undefined>(undefined);

interface Props {
    children: ReactNode;
    initialState?: ContextDataMap;
    onDispatch?: (action: Action) => void;
}

export const FpDataContext = ({ children, initialState, onDispatch }: Props): JSX.Element => {
    const [state, dispatch] = useReducer((oldState: ContextDataMap, action: Action) => {
        switch (action.type) {
            case 'update': {
                return {
                    ...oldState,
                    [action.key]: action.data,
                };
            }
            case 'reset': {
                return {};
            }
            default: {
                throw new Error('Ukjent handling i søknadsdata-reduceren.');
            }
        }
    }, initialState || defaultInitialState);

    // onDispatch kjem frå stories/testar og er ofte ein ny closure per render. Held den i ein
    // ref slik at dispatch-funksjonen under er referansestabil – elles ville kvar render av
    // FpDataContext gitt ny context-verdi og rendra alle konsumentar på nytt.
    const onDispatchRef = useRef(onDispatch);
    useEffect(() => {
        onDispatchRef.current = onDispatch;
    }, [onDispatch]);

    const dispatchWrapper = useCallback((a: Action) => {
        onDispatchRef.current?.(a);
        dispatch(a);
    }, []);

    return (
        <FpStateContext value={state}>
            <FpDispatchContext value={dispatchWrapper}>{children}</FpDispatchContext>
        </FpStateContext>
    );
};

/**
Hook returns data for one specific data type
*/
export const useContextGetData = <TYPE extends ContextDataType>(key: TYPE): ContextDataMap[TYPE] => {
    const state = use(FpStateContext);
    return state[key];
};

/**
Hook returns function capable of getting all types of data from context state
*/
export const useContextGetAnyData = () => {
    const state = use(FpStateContext);

    // Må vere referansestabil så lenge state er uendra, elles blir useMemo/useEffect
    // hos konsumentar (t.d. useStepConfig) invalidert på kvar einaste render.
    return useCallback(<TYPE extends ContextDataType>(key: TYPE) => state[key], [state]);
};

/**
Hook returns save function for one specific data type
*/
export const useContextSaveData = <TYPE extends ContextDataType>(key: TYPE): ((data: ContextDataMap[TYPE]) => void) => {
    const dispatch = use(FpDispatchContext);
    return useCallback(
        (data: ContextDataMap[TYPE]) => {
            dispatch?.({ type: 'update', key, data });
        },
        [dispatch, key],
    );
};

/**
Hook returns save function usable with all data types
*/
export const useContextSaveAnyData = () => {
    const dispatch = use(FpDispatchContext);
    return useCallback(
        <TYPE extends ContextDataType>(key: TYPE, data: ContextDataMap[TYPE]) => {
            dispatch?.({ type: 'update', key, data });
        },
        [dispatch],
    );
};

/**
Hook returns state reset function
*/
export const useContextReset = () => {
    const dispatch = use(FpDispatchContext);
    return useCallback(() => {
        dispatch?.({ type: 'reset' });
    }, [dispatch]);
};

export const useContextComplete = (): ContextDataMap => {
    return use(FpStateContext);
};
