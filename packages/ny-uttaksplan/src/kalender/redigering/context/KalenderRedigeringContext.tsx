import { createContext, useCallback, useContext, useMemo } from 'react';

import { CalendarPeriod } from '@navikt/fp-ui';
import { omitMany } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../../../context/UttaksplanRedigeringContext';
import { useUttaksplanBuilder } from '../../../context/useUttaksplanBuilder';
import { Planperiode } from '../../../types/Planperiode';
import { isHull, isPeriodeUtenUttak } from '../../../utils/periodeUtils';
import { PlanperiodeMedAntallDager } from '../EksisterendeValgtePerioder';
import {
    erValgtPeriodeEnHelEksisterendePeriode,
    finnValgtePerioder,
    slåSammenTilstøtendePerioder,
} from '../utils/kalenderPeriodeUtils';

type Props = {
    valgtePerioder: CalendarPeriod[];
    children: React.ReactNode;
    setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
};

type ContextValues = Omit<Props, 'children' | 'valgtePerioder' | 'oppdaterUttaksplan'> & {
    eksisterendePerioderSomErValgt: PlanperiodeMedAntallDager[];
    erKunEnHelEksisterendePeriodeValgt: boolean;
    sammenslåtteValgtePerioder: CalendarPeriod[];
    oppdaterUttaksplan: (perioder: Planperiode[]) => void;
};

const KalenderRedigeringContext = createContext<ContextValues | null>(null);

export const KalenderRedigeringProvider = ({ valgtePerioder, children, setValgtePerioder }: Props) => {
    const { uttaksplan } = useUttaksplanData();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const uttaksplanBuilder = useUttaksplanBuilder();

    const sammenslåtteValgtePerioder = useMemo(() => slåSammenTilstøtendePerioder(valgtePerioder), [valgtePerioder]);

    const erKunEnHelEksisterendePeriodeValgt =
        sammenslåtteValgtePerioder.length === 1 &&
        erValgtPeriodeEnHelEksisterendePeriode(uttaksplan, sammenslåtteValgtePerioder[0]!);

    const eksisterendePerioderSomErValgt = useMemo(
        () => finnValgtePerioder(sammenslåtteValgtePerioder, uttaksplan),
        [sammenslåtteValgtePerioder, uttaksplan],
    );

    const oppdater = useCallback(
        (perioder: Planperiode[]) => {
            const planperioder = uttaksplanBuilder.leggTilPerioder(perioder);

            const resultUtenHull = planperioder.filter((p) => !isHull(p) && !isPeriodeUtenUttak(p));

            uttaksplanRedigering?.oppdaterUttaksplan(
                resultUtenHull.map((p) =>
                    omitMany(p, ['id', 'periodeHullÅrsak', 'readOnly', 'skalIkkeHaUttakFørTermin']),
                ),
            );
        },
        [erKunEnHelEksisterendePeriodeValgt, uttaksplanBuilder, uttaksplanRedigering, uttaksplan],
    );

    const value = useMemo(() => {
        return {
            sammenslåtteValgtePerioder,
            erKunEnHelEksisterendePeriodeValgt,
            eksisterendePerioderSomErValgt,
            oppdaterUttaksplan: oppdater,
            setValgtePerioder,
        };
    }, [
        sammenslåtteValgtePerioder,
        erKunEnHelEksisterendePeriodeValgt,
        eksisterendePerioderSomErValgt,
        oppdater,
        setValgtePerioder,
    ]);

    return <KalenderRedigeringContext value={value}>{children}</KalenderRedigeringContext>;
};

export const useKalenderRedigeringContext = () => {
    const context = useContext(KalenderRedigeringContext);
    if (!context) {
        throw new Error('KalenderRedigeringContext.Provider er ikke satt opp');
    }
    return context;
};
