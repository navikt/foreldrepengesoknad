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
    HAR_JUSTERT_UTTAK_VED_FØDSEL = 'HAR_JUSTERT_UTTAK_VED_FØDSEL',
    VEDLEGG = 'VEDLEGG',
    KOMMER_FRA_PLANLEGGER = 'KOMMER_FRA_PLANLEGGER',
}

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
    [ContextDataType.HAR_JUSTERT_UTTAK_VED_FØDSEL]?: boolean;
    [ContextDataType.VEDLEGG]?: VedleggDataType;
    [ContextDataType.KOMMER_FRA_PLANLEGGER]?: boolean;
};

const defaultInitialState = {} as ContextDataMap;

export type Action =
    | { type: 'update'; key: ContextDataType; data: ContextDataMap[keyof ContextDataMap] }
    | { type: 'reset' };
type Dispatch = (action: Action) => void;

const reduser = (oldState: ContextDataMap, action: Action): ContextDataMap => {
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
};

const FpStateContext = createContext<ContextDataMap>(defaultInitialState);
const FpDispatchContext = createContext<Dispatch | undefined>(undefined);

// Held ein synkron spegel av state. Sjå kommentaren i dispatchWrapper.
const FpLatestStateContext = createContext<{ current: ContextDataMap }>({ current: defaultInitialState });

interface Props {
    children: ReactNode;
    initialState?: ContextDataMap;
    onDispatch?: (action: Action) => void;
}

export const FpDataContext = ({ children, initialState, onDispatch }: Props): JSX.Element => {
    const startState = initialState || defaultInitialState;
    const [state, dispatch] = useReducer(reduser, startState);

    // onDispatch kjem frå stories/testar og er ofte ein ny closure per render. Held den i ein
    // ref slik at dispatch-funksjonen under er referansestabil – elles ville kvar render av
    // FpDataContext gitt ny context-verdi og rendra alle konsumentar på nytt.
    const onDispatchRef = useRef(onDispatch);
    useEffect(() => {
        onDispatchRef.current = onDispatch;
    }, [onDispatch]);

    // Kode som lagrar rett etter ein dispatch (t.d. mellomlagring frå ein submit-handler)
    // må sjå den ferske verdien med ein gong. React-state er først oppdatert i neste render,
    // så vi speglar reduseraren synkront her.
    const stateRef = useRef(startState);

    const dispatchWrapper = useCallback((a: Action) => {
        stateRef.current = reduser(stateRef.current, a);
        onDispatchRef.current?.(a);
        dispatch(a);
    }, []);

    return (
        <FpStateContext value={state}>
            <FpLatestStateContext value={stateRef}>
                <FpDispatchContext value={dispatchWrapper}>{children}</FpDispatchContext>
            </FpLatestStateContext>
        </FpStateContext>
    );
};

/** Hook returns data for one specific data type  */
export const useContextGetData = <TYPE extends ContextDataType>(key: TYPE): ContextDataMap[TYPE] => {
    const state = use(FpStateContext);
    return state[key];
};

/** Hook returns function capable of getting all types of data from context state  */
export const useContextGetAnyData = () => {
    const state = use(FpStateContext);

    // Må vere referansestabil så lenge state er uendra, elles blir useMemo/useEffect
    // hos konsumentar (t.d. useStepConfig) invalidert på kvar einaste render.
    return useCallback(<TYPE extends ContextDataType>(key: TYPE) => state[key], [state]);
};

/** Hook returns save function for one specific data type */
export const useContextSaveData = <TYPE extends ContextDataType>(key: TYPE): ((data: ContextDataMap[TYPE]) => void) => {
    const dispatch = use(FpDispatchContext);
    return useCallback(
        (data: ContextDataMap[TYPE]) => {
            dispatch?.({ type: 'update', key, data });
        },
        [dispatch, key],
    );
};

/** Hook returns save function usable with all data types  */
export const useContextSaveAnyData = () => {
    const dispatch = use(FpDispatchContext);
    return useCallback(
        <TYPE extends ContextDataType>(key: TYPE, data: ContextDataMap[TYPE]) => {
            dispatch?.({ type: 'update', key, data });
        },
        [dispatch],
    );
};

/** Hook returns state reset function  */
export const useContextReset = () => {
    const dispatch = use(FpDispatchContext);
    return useCallback(() => {
        dispatch?.({ type: 'reset' });
    }, [dispatch]);
};

export const useContextComplete = (): ContextDataMap => {
    return use(FpStateContext);
};

/**
 * Returnerer ein funksjon som gir all context-data slik den er *no* – også når kallaren
 * nettopp har dispatcha ei oppdatering i same hendingshandtering. Bruk denne når data
 * skal sendast til backend rett etter ein dispatch (mellomlagring). Til rendering skal
 * du bruke useContextGetData/useContextComplete, som gir React-state.
 */
export const useContextGetLatestComplete = (): (() => ContextDataMap) => {
    const stateRef = use(FpLatestStateContext);
    return useCallback(() => stateRef.current, [stateRef]);
};
