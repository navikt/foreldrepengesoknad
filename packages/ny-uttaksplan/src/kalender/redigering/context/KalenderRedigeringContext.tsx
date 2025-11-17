import { createContext, useContext, useMemo, useState } from 'react';
import { Planperiode } from 'types/Planperiode';

import { SaksperiodeNy } from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';
import { omitMany } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { useUttaksplanBuilder } from '../../../context/useUttaksplanBuilder';
import { isHull, isPeriodeUtenUttak } from '../../../utils/periodeUtils';
import { PlanperiodeMedAntallDager } from '../EksisterendeValgtePerioder';
import {
    erValgtPeriodeEnHelEksisterendePeriode,
    finnValgtePerioder,
    slåSammenTilstøtendePerioder,
} from '../utils/kalenderPeriodeUtils';

type Props = {
    valgtePerioder: CalendarPeriod[];
    oppdaterUttaksplan: (oppdatertePerioder: SaksperiodeNy[]) => void;
    setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
    children: React.ReactNode;
};

type ContextValues = Omit<Props, 'children' | 'valgtePerioder' | 'oppdaterUttaksplan'> & {
    erIRedigeringsmodus: boolean;
    setErIRedigeringsmodus: React.Dispatch<React.SetStateAction<boolean>>;
    erMinimert: boolean;
    setErMinimert: React.Dispatch<React.SetStateAction<boolean>>;
    erKunEnHelEksisterendePeriodeValgt: boolean;
    sammenslåtteValgtePerioder: CalendarPeriod[];
    eksisterendePerioderSomErValgt: PlanperiodeMedAntallDager[];
    oppdaterUttaksplan: (oppdatertPeriode: Planperiode[]) => void;
};

const KalenderRedigeringContext = createContext<ContextValues | null>(null);

export const KalenderRedigeringProvider = ({
    valgtePerioder,
    oppdaterUttaksplan,
    setValgtePerioder,
    children,
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

    const oppdater = (oppdatertPeriode: Planperiode[]) => {
        const planperioder = erKunEnHelEksisterendePeriodeValgt
            ? uttaksplanBuilder.oppdaterPerioder(oppdatertPeriode)
            : uttaksplanBuilder.leggTilPerioder(oppdatertPeriode);
        const resultUtenHull = planperioder.filter((p) => !isHull(p) && !isPeriodeUtenUttak(p));

        oppdaterUttaksplan(
            resultUtenHull.map((p) => omitMany(p, ['id', 'periodeHullÅrsak', 'readOnly', 'skalIkkeHaUttakFørTermin'])),
        );
    };

    const value = useMemo(() => {
        return {
            erIRedigeringsmodus,
            setErIRedigeringsmodus,
            erMinimert,
            setErMinimert,
            sammenslåtteValgtePerioder,
            erKunEnHelEksisterendePeriodeValgt,
            oppdaterUttaksplan: oppdater,
            eksisterendePerioderSomErValgt,
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
