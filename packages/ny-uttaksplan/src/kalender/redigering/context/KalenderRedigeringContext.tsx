import dayjs from 'dayjs';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';
import { Uttaksdagen, dateToISOString, omitMany } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { useUttaksplanBuilder } from '../../../context/useUttaksplanBuilder';
import { PeriodeHullType, Planperiode } from '../../../types/Planperiode';
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

const delOppPerioderMedForelderFraUttaksplan = (
    uttaksplan: Planperiode[],
    oppdatertPeriode: Planperiode[],
): Planperiode[] => {
    // Sjekk om alle perioder er PERIODE_UTEN_UTTAK
    const erAllePeriodeUtenUttak = oppdatertPeriode.every(
        (p) => p.periodeHullÅrsak === PeriodeHullType.PERIODE_UTEN_UTTAK,
    );

    if (!erAllePeriodeUtenUttak) {
        // Hvis ikke alle er PERIODE_UTEN_UTTAK, bruk periodene som de er
        return oppdatertPeriode;
    }

    // Del opp periodene basert på overlapp med eksisterende perioder
    return oppdatertPeriode.flatMap((nyPeriode) => {
        const overlappendePerioder = uttaksplan.filter((eksisterendePeriode) => {
            const nyFom = dayjs(nyPeriode.fom);
            const nyTom = dayjs(nyPeriode.tom);
            const eksFom = dayjs(eksisterendePeriode.fom);
            const eksTom = dayjs(eksisterendePeriode.tom);

            // Sjekk om periodene overlapper
            return nyFom.isSameOrBefore(eksTom) && nyTom.isSameOrAfter(eksFom);
        });

        if (overlappendePerioder.length === 0) {
            // Ingen overlapp, behold perioden som den er
            return [nyPeriode];
        }

        // Del opp perioden basert på overlappende perioder
        const deleOppPerioder: Planperiode[] = [];
        let gjeldendeFom = dayjs(nyPeriode.fom);
        const periodeTom = dayjs(nyPeriode.tom);

        // Sorter overlappende perioder etter fra-dato
        const sorterteOverlappendePerioder = [...overlappendePerioder].sort((a, b) => dayjs(a.fom).diff(dayjs(b.fom)));

        // Grupper overlappende perioder etter identiske tidsperioder (for samtidig uttak)
        const periodeGrupper: Array<{ fom: dayjs.Dayjs; tom: dayjs.Dayjs; perioder: Planperiode[] }> = [];

        sorterteOverlappendePerioder.forEach((eksisterendePeriode) => {
            const eksFom = dayjs(eksisterendePeriode.fom);
            const eksTom = dayjs(eksisterendePeriode.tom);

            // Finn eksisterende gruppe med samme fom og tom
            const eksisterendeGruppe = periodeGrupper.find(
                (gruppe) => gruppe.fom.isSame(eksFom) && gruppe.tom.isSame(eksTom),
            );

            if (eksisterendeGruppe) {
                eksisterendeGruppe.perioder.push(eksisterendePeriode);
            } else {
                periodeGrupper.push({
                    fom: eksFom,
                    tom: eksTom,
                    perioder: [eksisterendePeriode],
                });
            }
        });

        periodeGrupper.forEach((gruppe) => {
            const eksFom = gruppe.fom;
            const eksTom = gruppe.tom;

            // Hvis det er et gap før den overlappende perioden
            if (gjeldendeFom.isBefore(eksFom)) {
                const gapTom = Uttaksdagen(eksFom.toDate()).forrige();

                deleOppPerioder.push({
                    ...nyPeriode,
                    fom: dateToISOString(gjeldendeFom.toDate()),
                    tom: dateToISOString(gapTom),
                });
            }

            // Overlappende del med forelder fra eksisterende periode
            const overlappFom = gjeldendeFom.isAfter(eksFom) ? gjeldendeFom : eksFom;
            const overlappTom = periodeTom.isBefore(eksTom) ? periodeTom : eksTom;

            if (overlappFom.isSameOrBefore(overlappTom)) {
                // Lag en periode for hver forelder i gruppen (samtidig uttak)
                gruppe.perioder.forEach((eksisterendePeriode) => {
                    deleOppPerioder.push({
                        ...nyPeriode,
                        fom: dateToISOString(overlappFom.toDate()),
                        tom: dateToISOString(overlappTom.toDate()),
                        forelder: eksisterendePeriode.forelder,
                    });
                });
            }

            // Oppdater gjeldende fra-dato til etter denne overlappende perioden
            // Bare oppdater hvis dette er slutten av gruppen
            if (gjeldendeFom.isSameOrBefore(eksTom)) {
                gjeldendeFom = dayjs(Uttaksdagen(eksTom.toDate()).neste());
            }
        });

        // Hvis det er en rest etter siste overlappende periode
        if (gjeldendeFom.isSameOrBefore(periodeTom)) {
            deleOppPerioder.push({
                ...nyPeriode,
                fom: dateToISOString(gjeldendeFom.toDate()),
                tom: dateToISOString(periodeTom.toDate()),
            });
        }

        return deleOppPerioder;
    });
};

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
            const oppdeltePerioderMedForelderFraUttaksplan = delOppPerioderMedForelderFraUttaksplan(
                uttaksplan,
                oppdatertPeriode,
            );

            const planperioder = uttaksplanBuilder.leggTilPerioder(oppdeltePerioderMedForelderFraUttaksplan);

            const resultUtenHull = planperioder.filter((p) => !isHull(p) && !isPeriodeUtenUttak(p));

            oppdaterUttaksplan(
                resultUtenHull.map((p) =>
                    omitMany(p, ['id', 'periodeHullÅrsak', 'readOnly', 'skalIkkeHaUttakFørTermin']),
                ),
            );
        },
        [erKunEnHelEksisterendePeriodeValgt, uttaksplanBuilder, oppdaterUttaksplan, uttaksplan],
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
