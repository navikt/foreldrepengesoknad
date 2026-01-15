import { createContext, useContext, useMemo } from 'react';

import {
    Barn,
    Familiesituasjon,
    KontoBeregningDto,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { getFamiliehendelsedato, getFamiliesituasjon } from '@navikt/fp-utils';

import { ForeldreInfo } from '../types/ForeldreInfo';
import { sorterPerioder } from '../utils/periodeUtils';

type Props = {
    barn: Barn;
    foreldreInfo: ForeldreInfo;
    valgtStønadskonto: KontoBeregningDto;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    uttakPerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    children: React.ReactNode;
};

type ContextValues = Omit<Props, 'children'> & {
    familiesituasjon: Familiesituasjon;
    familiehendelsedato: string;
};

const UttaksplanDataContext = createContext<ContextValues | null>(null);

export const UttaksplanDataProvider = (props: Props) => {
    const { children, ...otherProps } = props;

    const value = useMemo(() => {
        const familiehendelsedato = getFamiliehendelsedato(otherProps.barn);
        const familiesituasjon = getFamiliesituasjon(otherProps.barn);

        const sortertePerioder = [...otherProps.uttakPerioder].sort(sorterPerioder);

        return {
            ...otherProps,
            familiehendelsedato,
            familiesituasjon,
            uttakPerioder: sortertePerioder,
        };
    }, [otherProps]);

    return <UttaksplanDataContext value={value}>{children}</UttaksplanDataContext>;
};

export const useUttaksplanData = () => {
    const context = useContext(UttaksplanDataContext);
    if (!context) {
        throw new Error('UttaksplanDataContext.Provider er ikke satt opp');
    }
    return context;
};
