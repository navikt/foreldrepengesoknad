import { createContext, useCallback, useContext, useMemo } from 'react';

import { UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { SaksperiodeBuilder } from '../../../builder/SaksperiodeBuilder';
import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../../../context/UttaksplanRedigeringContext';
import { slåSammenTilstøtendePerioder } from '../utils/kalenderPeriodeUtils';

type Props = {
    valgtePerioder: CalendarPeriod[];
    children: React.ReactNode;
    setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
};

type ContextValues = Omit<Props, 'children' | 'valgtePerioder' | 'oppdaterUttaksplan'> & {
    sammenslåtteValgtePerioder: CalendarPeriod[];
    leggTilUttaksplanPerioder: (perioder: UttakPeriode_fpoversikt[]) => void;
    slettUttaksplanPerioder: (perioder: UttakPeriode_fpoversikt[]) => void;
};

const KalenderRedigeringContext = createContext<ContextValues | null>(null);

export const KalenderRedigeringProvider = ({ valgtePerioder, children, setValgtePerioder }: Props) => {
    const { saksperioder } = useUttaksplanData();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const sammenslåtteValgtePerioder = useMemo(() => slåSammenTilstøtendePerioder(valgtePerioder), [valgtePerioder]);

    const leggTilUttaksplanPerioder = useCallback(
        (perioder: UttakPeriode_fpoversikt[]) => {
            const nyeSaksperioder = new SaksperiodeBuilder(saksperioder)
                .leggTilSaksperioder(perioder)
                .getSaksperioder();

            notEmpty(uttaksplanRedigering).oppdaterUttaksplan(nyeSaksperioder);
        },
        [uttaksplanRedigering, saksperioder],
    );

    const slettUttaksplanPerioder = useCallback(
        (perioder: UttakPeriode_fpoversikt[]) => {
            const saksperiodeBuilder = new SaksperiodeBuilder(saksperioder);
            saksperiodeBuilder.fjernSaksperioder(perioder);
            notEmpty(uttaksplanRedigering).oppdaterUttaksplan(saksperiodeBuilder.getSaksperioder());
        },
        [uttaksplanRedigering, saksperioder],
    );

    const value = useMemo(() => {
        return {
            sammenslåtteValgtePerioder,
            leggTilUttaksplanPerioder,
            slettUttaksplanPerioder,
            setValgtePerioder,
        };
    }, [sammenslåtteValgtePerioder, leggTilUttaksplanPerioder, slettUttaksplanPerioder, setValgtePerioder]);

    return <KalenderRedigeringContext value={value}>{children}</KalenderRedigeringContext>;
};

export const useKalenderRedigeringContext = () => {
    const context = useContext(KalenderRedigeringContext);
    if (!context) {
        throw new Error('KalenderRedigeringContext.Provider er ikke satt opp');
    }
    return context;
};
