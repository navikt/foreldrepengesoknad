import { createContext, use, useCallback, useMemo } from 'react';

import { UttakPeriodeDto } from '@navikt/fp-types';
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
    setEndredePerioder: (perioder: Array<{ fom: string; tom: string }>) => void;
};

type ContextValues = Omit<Props, 'children' | 'valgtePerioder' | 'oppdaterUttaksplan'> & {
    sammenslåtteValgtePerioder: CalendarPeriod[];
    leggTilUttaksplanPerioder: (perioder: UttakPeriodeDto[], skalForskyvePeriode: boolean) => void;
    slettUttaksplanPerioder: (perioder: Array<{ fom: string; tom: string }>, skalForskyveBakover: boolean) => void;
};

const KalenderRedigeringContext = createContext<ContextValues | null>(null);

export const KalenderRedigeringProvider = ({
    valgtePerioder,
    children,
    setValgtePerioder,
    setEndredePerioder,
}: Props) => {
    const { perioder, erPeriodeneTilAnnenPartLåst } = useUttaksplanData();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const sammenslåtteValgtePerioder = useMemo(() => slåSammenTilstøtendePerioder(valgtePerioder), [valgtePerioder]);

    const leggTilUttaksplanPerioder = useCallback(
        (nyePerioder: UttakPeriodeDto[], skalForskyvePeriode: boolean) => {
            const nyeUttakPerioder = new UttakPeriodeBuilder(perioder, 'kalender')
                .leggTilUttakPerioder(nyePerioder, skalForskyvePeriode)
                .getUttakPerioder();

            notEmpty(uttaksplanRedigering).oppdaterUttaksplan(nyeUttakPerioder);
        },
        [uttaksplanRedigering, perioder],
    );

    const slettUttaksplanPerioder = useCallback(
        (perioderSomSkalSlettes: Array<{ fom: string; tom: string }>, skalForskyveBakover: boolean) => {
            const uttakPeriodeBuilder = new UttakPeriodeBuilder(perioder, 'kalender');
            uttakPeriodeBuilder.fjernUttakPerioder(
                perioderSomSkalSlettes,
                skalForskyveBakover,
                erPeriodeneTilAnnenPartLåst,
            );
            notEmpty(uttaksplanRedigering).oppdaterUttaksplan(uttakPeriodeBuilder.getUttakPerioder());
        },
        [uttaksplanRedigering, perioder, erPeriodeneTilAnnenPartLåst],
    );

    const value = useMemo(() => {
        return {
            sammenslåtteValgtePerioder,
            leggTilUttaksplanPerioder,
            slettUttaksplanPerioder,
            setValgtePerioder,
            setEndredePerioder,
        };
    }, [
        sammenslåtteValgtePerioder,
        leggTilUttaksplanPerioder,
        slettUttaksplanPerioder,
        setValgtePerioder,
        setEndredePerioder,
    ]);

    return <KalenderRedigeringContext value={value}>{children}</KalenderRedigeringContext>;
};

export const useKalenderRedigeringContext = () => {
    const context = use(KalenderRedigeringContext);
    if (!context) {
        throw new Error('KalenderRedigeringContext.Provider er ikke satt opp');
    }
    return context;
};
