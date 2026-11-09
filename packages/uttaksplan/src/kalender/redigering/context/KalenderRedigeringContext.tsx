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

type ContextValues = Omit<Props, 'children' | 'valgtePerioder'> & {
    sammenslåtteValgtePerioder: CalendarPeriod[];
    leggTilUttaksplanPerioder: (
        perioder: UttakPeriodeDto[],
        skalForskyvePeriode: boolean,
        etterUtført: () => void,
    ) => void;
    slettUttaksplanPerioder: (
        perioder: Array<{ fom: string; tom: string }>,
        skalForskyveBakover: boolean,
        etterUtført: () => void,
    ) => void;
};

const KalenderRedigeringContext = createContext<ContextValues | null>(null);

export const KalenderRedigeringProvider = ({
    valgtePerioder,
    children,
    setValgtePerioder,
    setEndredePerioder,
}: Props) => {
    const { perioder, erPeriodeneTilAnnenPartLåst } = useUttaksplanData();

    const { endreUttaksplanMedVarsel, slettFraUttaksplanMedVarsel } = notEmpty(useUttaksplanRedigering());

    const sammenslåtteValgtePerioder = useMemo(() => slåSammenTilstøtendePerioder(valgtePerioder), [valgtePerioder]);

    const leggTilUttaksplanPerioder = useCallback(
        (nyePerioder: UttakPeriodeDto[], skalForskyvePeriode: boolean, etterUtført: () => void) => {
            const nyeUttakPerioder = new UttakPeriodeBuilder(perioder, 'kalender')
                .leggTilUttakPerioder(nyePerioder, skalForskyvePeriode)
                .getUttakPerioder();
            endreUttaksplanMedVarsel(nyeUttakPerioder, etterUtført);
        },
        [perioder, endreUttaksplanMedVarsel],
    );

    const slettUttaksplanPerioder = useCallback(
        (
            perioderSomSkalSlettes: Array<{ fom: string; tom: string }>,
            skalForskyveBakover: boolean,
            etterUtført: () => void,
        ) => {
            const nyeUttakPerioder = new UttakPeriodeBuilder(perioder, 'kalender')
                .fjernUttakPerioder(perioderSomSkalSlettes, skalForskyveBakover, erPeriodeneTilAnnenPartLåst)
                .getUttakPerioder();
            slettFraUttaksplanMedVarsel(perioderSomSkalSlettes, nyeUttakPerioder, etterUtført);
        },
        [perioder, erPeriodeneTilAnnenPartLåst, slettFraUttaksplanMedVarsel],
    );

    const value = useMemo(
        () => ({
            sammenslåtteValgtePerioder,
            leggTilUttaksplanPerioder,
            slettUttaksplanPerioder,
            setValgtePerioder,
            setEndredePerioder,
        }),
        [
            sammenslåtteValgtePerioder,
            leggTilUttaksplanPerioder,
            slettUttaksplanPerioder,
            setValgtePerioder,
            setEndredePerioder,
        ],
    );

    return <KalenderRedigeringContext value={value}>{children}</KalenderRedigeringContext>;
};

export const useKalenderRedigeringContext = () => {
    const context = use(KalenderRedigeringContext);
    if (!context) {
        throw new Error('KalenderRedigeringContext.Provider er ikke satt opp');
    }
    return context;
};
