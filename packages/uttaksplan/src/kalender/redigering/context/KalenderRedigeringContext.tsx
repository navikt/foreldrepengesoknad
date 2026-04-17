import { createContext, useContext } from 'react';

import { UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../../../context/UttaksplanRedigeringContext';
import { UttakPeriodeBuilder } from '../../../utils/UttakPeriodeBuilder';
import { slåSammenTilstøtendePerioder } from '../utils/kalenderPeriodeUtils';

type Props = {
    valgtePerioder: CalendarPeriod[];
    children: React.ReactNode;
    setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
    setEndredePerioder: React.Dispatch<React.SetStateAction<Array<{ fom: string; tom: string }>>>;
};

type ContextValues = Omit<Props, 'children' | 'valgtePerioder' | 'oppdaterUttaksplan'> & {
    sammenslåtteValgtePerioder: CalendarPeriod[];
    leggTilUttaksplanPerioder: (perioder: UttakPeriode_fpoversikt[], skalForskyvePeriode: boolean) => void;
    slettUttaksplanPerioder: (perioder: Array<{ fom: string; tom: string }>, skalForskyveBakover: boolean) => void;
};

const KalenderRedigeringContext = createContext<ContextValues | null>(null);

export const KalenderRedigeringProvider = ({
    valgtePerioder,
    children,
    setValgtePerioder,
    setEndredePerioder,
}: Props) => {
    const { uttakPerioder } = useUttaksplanData();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const sammenslåtteValgtePerioder = slåSammenTilstøtendePerioder(valgtePerioder);

    const leggTilUttaksplanPerioder = (perioder: UttakPeriode_fpoversikt[], skalForskyvePeriode: boolean) => {
        const nyeUttakPerioder = new UttakPeriodeBuilder(uttakPerioder)
            .leggTilUttakPerioder(perioder, skalForskyvePeriode)
            .getUttakPerioder();

        notEmpty(uttaksplanRedigering).oppdaterUttaksplan(nyeUttakPerioder);
    };

    const slettUttaksplanPerioder = (perioder: Array<{ fom: string; tom: string }>, skalForskyveBakover: boolean) => {
        const uttakPeriodeBuilder = new UttakPeriodeBuilder(uttakPerioder);
        uttakPeriodeBuilder.fjernUttakPerioder(perioder, skalForskyveBakover);
        notEmpty(uttaksplanRedigering).oppdaterUttaksplan(uttakPeriodeBuilder.getUttakPerioder());
    };

    const value = {
        sammenslåtteValgtePerioder,
        leggTilUttaksplanPerioder,
        slettUttaksplanPerioder,
        setValgtePerioder,
        setEndredePerioder,
    };

    return <KalenderRedigeringContext value={value}>{children}</KalenderRedigeringContext>;
};

export const useKalenderRedigeringContext = () => {
    const context = useContext(KalenderRedigeringContext);
    if (!context) {
        throw new Error('KalenderRedigeringContext.Provider er ikke satt opp');
    }
    return context;
};
