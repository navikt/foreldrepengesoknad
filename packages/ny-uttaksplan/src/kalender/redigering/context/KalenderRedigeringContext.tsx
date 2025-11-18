import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';
import { omitMany } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
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
    oppdaterUttaksplan: (
        oppdatertePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    ) => void;
    setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
};

type ContextValues = Omit<Props, 'children' | 'valgtePerioder' | 'oppdaterUttaksplan'> & {
    erIRedigeringsmodus: boolean;
    erMinimert: boolean;
    eksisterendePerioderSomErValgt: PlanperiodeMedAntallDager[];
    erKunEnHelEksisterendePeriodeValgt: boolean;
    sammenslåtteValgtePerioder: CalendarPeriod[];
    oppdaterUttaksplan: (oppdatertPeriode: Planperiode[]) => void;
    setErIRedigeringsmodus: React.Dispatch<React.SetStateAction<boolean>>;
    setErMinimert: React.Dispatch<React.SetStateAction<boolean>>;
};

const KalenderRedigeringContext = createContext<ContextValues | null>(null);

export const KalenderRedigeringProvider = ({
    valgtePerioder,
    children,
    oppdaterUttaksplan,
    setValgtePerioder,
}: Props) => {
    const [erIRedigeringsmodus, setErIRedigeringsmodus] = useState(false);
    const [erMinimert, setErMinimert] = useState(false);

    const { uttaksplan } = useUttaksplanData();

    const uttaksplanBuilder = useUttaksplanBuilder();

    const sammenslåtteValgtePerioder = useMemo(() => slåSammenTilstøtendePerioder(valgtePerioder), [valgtePerioder]);

    const erKunEnHelEksisterendePeriodeValgt =
        sammenslåtteValgtePerioder.length === 1 &&
        erValgtPeriodeEnHelEksisterendePeriode(uttaksplan, sammenslåtteValgtePerioder[0]);

    const eksisterendePerioderSomErValgt = useMemo(
        () => finnValgtePerioder(sammenslåtteValgtePerioder, uttaksplan),
        [sammenslåtteValgtePerioder, uttaksplan],
    );

    const oppdater = useCallback(
        (oppdatertPeriode: Planperiode[]) => {
            const planperioder = erKunEnHelEksisterendePeriodeValgt
                ? uttaksplanBuilder.oppdaterPerioder(oppdatertPeriode)
                : uttaksplanBuilder.leggTilPerioder(oppdatertPeriode);
            const resultUtenHull = planperioder.filter((p) => !isHull(p) && !isPeriodeUtenUttak(p));

            oppdaterUttaksplan(
                resultUtenHull.map((p) =>
                    omitMany(p, ['id', 'periodeHullÅrsak', 'readOnly', 'skalIkkeHaUttakFørTermin']),
                ),
            );
        },
        [erKunEnHelEksisterendePeriodeValgt, uttaksplanBuilder, oppdaterUttaksplan],
    );

    const value = useMemo(() => {
        return {
            erIRedigeringsmodus,
            erMinimert,
            sammenslåtteValgtePerioder,
            erKunEnHelEksisterendePeriodeValgt,
            eksisterendePerioderSomErValgt,
            setErIRedigeringsmodus,
            setErMinimert,
            oppdaterUttaksplan: oppdater,
            setValgtePerioder,
        };
    }, [
        erIRedigeringsmodus,
        erMinimert,
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
