import { JSX, ReactNode, createContext, useContext, useReducer } from 'react';

import { Barn, NavnPåForeldre } from '@navikt/fp-common';
import { Familiesituasjon, TilgjengeligeStønadskontoerForDekningsgrad, UttaksplanModus } from '@navikt/fp-types';

import { Planperiode } from '../types/Planperiode';

export enum UttaksplanContextDataType {
    UTTAKSPLAN = 'UTTAKSPLAN',
    FAMILIEHENDELSEDATO = 'FAMILIEHENDELSEDATO',
    ER_FAR_ELLER_MEDMOR = 'ER_FAR_ELLER_MEDMOR',
    NAVN_PÅ_FORELDRE = 'NAVN_PÅ_FORELDRE',
    BARN = 'BARN',
    FAMILIESITUASJON = 'FAMILIESITUASJON',
    MODUS = 'MODUS',
    VALGT_STØNADSKONTO = 'VALGT_STØNADSKONTO',
    ALENE_OM_OMSORG = 'ALENE_OM_OMSORG',
}

export type UttaksplanContextDataMap = {
    [UttaksplanContextDataType.UTTAKSPLAN]?: Planperiode[];
    [UttaksplanContextDataType.FAMILIEHENDELSEDATO]?: string;
    [UttaksplanContextDataType.ER_FAR_ELLER_MEDMOR]?: boolean;
    [UttaksplanContextDataType.NAVN_PÅ_FORELDRE]?: NavnPåForeldre;
    [UttaksplanContextDataType.BARN]?: Barn;
    [UttaksplanContextDataType.FAMILIESITUASJON]?: Familiesituasjon;
    [UttaksplanContextDataType.MODUS]?: UttaksplanModus;
    [UttaksplanContextDataType.VALGT_STØNADSKONTO]?: TilgjengeligeStønadskontoerForDekningsgrad;
    [UttaksplanContextDataType.ALENE_OM_OMSORG]?: boolean;
};

const defaultInitialState = {} as UttaksplanContextDataMap;

export type Action =
    | { type: 'update'; key: UttaksplanContextDataType; data: UttaksplanContextDataMap[keyof UttaksplanContextDataMap] }
    | { type: 'reset' };
type Dispatch = (action: Action) => void;

const UttaksplanStateContext = createContext<UttaksplanContextDataMap>(defaultInitialState);
const UttaksplanDispatchContext = createContext<Dispatch | undefined>(undefined);

interface Props {
    children: ReactNode;
    initialState?: UttaksplanContextDataMap;
    onDispatch?: (action: Action) => void;
}

export const UttaksplanDataContext = ({ children, initialState, onDispatch }: Props): JSX.Element => {
    const [state, dispatch] = useReducer((oldState: UttaksplanContextDataMap, action: Action) => {
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
        <UttaksplanStateContext.Provider value={state}>
            <UttaksplanDispatchContext.Provider value={dispatchWrapper}>{children}</UttaksplanDispatchContext.Provider>
        </UttaksplanStateContext.Provider>
    );
};

/** Hook returns data for one specific data type  */
export const useContextGetData = <TYPE extends UttaksplanContextDataType>(
    key: TYPE,
): UttaksplanContextDataMap[TYPE] => {
    const state = useContext(UttaksplanStateContext);
    return state[key];
};
