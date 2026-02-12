import { SøknadRoutes } from 'appData/routes';
import { JSX, ReactNode, createContext, useContext, useReducer } from 'react';
import { AndreInntektskilder } from 'types/AndreInntektskilder';
import { Fordeling } from 'types/Fordeling';
import { UttaksplanMetaData } from 'types/UttaksplanMetaData';
import { VedleggDataType } from 'types/VedleggDataType';

import { AnnenForelder, Barn, BarnFraNesteSak, EksisterendeSak, Periode } from '@navikt/fp-common';
import {
    ArbeidsforholdOgInntektFp,
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
    EKSISTERENDE_SAK = 'EKSISTERENDE_SAK',
    BARN_FRA_NESTE_SAK = 'BARN_FRA_NESTE_SAK',
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
    UTTAKSPLAN_NY = 'UTTAKSPLAN_NY',
    UTTAKSPLAN_METADATA = 'UTTAKSPLAN_METADATA',
    UTTAKSPLAN_METADATA_NY = 'UTTAKSPLAN_METADATA_NY',
    VEDLEGG = 'VEDLEGG',
}

export type ContextDataMap = {
    [ContextDataType.APP_ROUTE]?: SøknadRoutes;
    [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]?: string;
    [ContextDataType.EKSISTERENDE_SAK]?: EksisterendeSak;
    [ContextDataType.BARN_FRA_NESTE_SAK]?: BarnFraNesteSak;
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
    [ContextDataType.UTTAKSPLAN]?: Periode[];
    [ContextDataType.UTTAKSPLAN_NY]?: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    [ContextDataType.UTTAKSPLAN_METADATA]?: UttaksplanMetaData;
    // TODO (TOR) Vurder etterkvart om denne trengs. Om det er kun ønskerJustertUttakVedFødsel så vurder å legg denne til UTTAKSPLAN_NY
    [ContextDataType.UTTAKSPLAN_METADATA_NY]?: {
        ønskerJustertUttakVedFødsel?: boolean;
    };
    [ContextDataType.VEDLEGG]?: VedleggDataType;
};

const defaultInitialState = {} as ContextDataMap;

export type Action =
    | { type: 'update'; key: ContextDataType; data: ContextDataMap[keyof ContextDataMap] }
    | { type: 'reset' };
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
