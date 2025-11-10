import { createContext, useContext, useMemo } from 'react';

import { Barn, Familiesituasjon, KontoBeregningDto, NavnPåForeldre, UttaksplanModus } from '@navikt/fp-types';
import { getFamiliehendelsedato, getFamiliesituasjon } from '@navikt/fp-utils';

type Props = {
    barn: Barn;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    modus: UttaksplanModus;
    valgtStønadskonto: KontoBeregningDto;
    aleneOmOmsorg: boolean;
    erMedmorDelAvSøknaden: boolean;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    bareFarMedmorHarRett: boolean;
    erDeltUttak: boolean;
    children: React.ReactNode[] | React.ReactNode;
};

type ContextValues = Props & {
    familiesituasjon: Familiesituasjon;
    familiehendelsedato: string;
};

const UttaksplanDataContext = createContext<Omit<ContextValues, 'children'> | null>(null);

export const UttaksplanDataProvider = (props: Props) => {
    const { children, ...otherProps } = props;

    const value = useMemo(
        () => ({
            ...otherProps,
            familiehendelsedato: getFamiliehendelsedato(otherProps.barn),
            familiesituasjon: getFamiliesituasjon(otherProps.barn),
        }),
        [otherProps],
    );

    return <UttaksplanDataContext value={value}>{children}</UttaksplanDataContext>;
};

export const useUttaksplanData = () => {
    const context = useContext(UttaksplanDataContext);
    if (!context) {
        throw new Error('UttaksplanDataContext.Provider er ikke satt opp');
    }
    return context;
};
