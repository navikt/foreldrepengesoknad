import { createContext, useCallback, useContext, useMemo } from 'react';

import { CalendarPeriod } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../../../context/UttaksplanRedigeringContext';
import { SaksperiodeBuilder } from '../../../newBuilder/SaksperiodeBuilder';
import { Planperiode } from '../../../types/Planperiode';
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
    leggTilUttaksplanPerioder: (perioder: Planperiode[]) => void;
    slettUttaksplanPerioder: (perioder: Planperiode[]) => void;
};

const KalenderRedigeringContext = createContext<ContextValues | null>(null);

// export const splittFeriePåFamiliehendelsesdatoOmNødvendig = (
//     periode: Planperiode,
//     famDato: string,
//     erFarEllerMedmor: boolean,
// ): Planperiode[] => {
//     if (!('utsettelseÅrsak' in periode)) {
//         return [periode];
//     }

//     const forelder = getForelderForPeriode(erFarEllerMedmor, false, undefined);

//     if (dayjs(periode.fom).isBefore(famDato) && dayjs(periode.tom).isAfter(famDato)) {
//         const periodeFørFamDato: Planperiode = {
//             ...periode,
//             fom: periode.fom,
//             tom: UttaksdagenString(famDato).forrige(),
//             id: `${periode.fom} - ${UttaksdagenString(famDato).forrige()} - ${periode.utsettelseÅrsak} - ${forelder}`,
//         };

//         const periodeFraOgMedFamDato: Planperiode = {
//             ...periode,
//             id: `${UttaksdagenString(periodeFørFamDato.tom).neste()} - ${periode.tom} - ${periode.utsettelseÅrsak} - ${forelder}`,
//             fom: UttaksdagenString(periodeFørFamDato.tom).neste(),
//             tom: periode.tom,
//         };

//         return [periodeFørFamDato, periodeFraOgMedFamDato];
//     }

//     return [periode];
// };

export const KalenderRedigeringProvider = ({ valgtePerioder, children, setValgtePerioder }: Props) => {
    const { uttaksplan, familiehendelsedato, foreldreInfo, saksperioder } = useUttaksplanData();

    const erFarEllerMedmor = foreldreInfo.søker === 'FAR_ELLER_MEDMOR';

    const uttaksplanRedigering = useUttaksplanRedigering();

    const sammenslåtteValgtePerioder = useMemo(() => slåSammenTilstøtendePerioder(valgtePerioder), [valgtePerioder]);

    const erKunEnHelEksisterendePeriodeValgt =
        sammenslåtteValgtePerioder.length === 1 &&
        erValgtPeriodeEnHelEksisterendePeriode(uttaksplan, sammenslåtteValgtePerioder[0]!);

    const eksisterendePerioderSomErValgt = useMemo(
        () => finnValgtePerioder(sammenslåtteValgtePerioder, uttaksplan),
        [sammenslåtteValgtePerioder, uttaksplan],
    );

    const leggTilUttaksplanPerioder = useCallback(
        (perioder: Planperiode[]) => {
            const saksperiodeBuilder = new SaksperiodeBuilder(saksperioder);
            saksperiodeBuilder.addPeriods(perioder);

            //FIXME (TOR) Kvifor blir denne splitta på familiehendelsedato? Er det kun for visningslogikk?
            // const planperioder = uttaksplanBuilder.leggTilPerioder(
            //     perioder.flatMap((p) =>
            //         splittFeriePåFamiliehendelsesdatoOmNødvendig(p, familiehendelsedato, erFarEllerMedmor),
            //     ),
            // );

            // const resultUtenHull = planperioder.filter((p) => !isHull(p) && !isPeriodeUtenUttak(p));

            // const utenHull = resultUtenHull.map((p) =>
            //     omitMany(p, ['id', 'periodeHullÅrsak', 'skalIkkeHaUttakFørTermin']),
            // );

            notEmpty(uttaksplanRedigering).oppdaterUttaksplan(saksperiodeBuilder.getSaksperioder());
        },
        [uttaksplanRedigering, familiehendelsedato, erFarEllerMedmor, saksperioder],
    );

    const slettUttaksplanPerioder = useCallback(
        (perioder: Planperiode[]) => {
            const saksperiodeBuilder = new SaksperiodeBuilder(saksperioder);
            saksperiodeBuilder.addPeriods(perioder);
            notEmpty(uttaksplanRedigering).oppdaterUttaksplan(saksperiodeBuilder.getSaksperioder());
        },
        [uttaksplanRedigering, familiehendelsedato, erFarEllerMedmor, saksperioder],
    );

    const value = useMemo(() => {
        return {
            sammenslåtteValgtePerioder,
            erKunEnHelEksisterendePeriodeValgt,
            eksisterendePerioderSomErValgt,
            leggTilUttaksplanPerioder,
            slettUttaksplanPerioder,
            setValgtePerioder,
        };
    }, [
        sammenslåtteValgtePerioder,
        erKunEnHelEksisterendePeriodeValgt,
        eksisterendePerioderSomErValgt,
        leggTilUttaksplanPerioder,
        slettUttaksplanPerioder,
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
