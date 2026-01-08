import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import {
    BrukerRolleSak_fpoversikt,
    Familiesituasjon,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { ForeldreInfo } from '../types/ForeldreInfo';
import { UttaksplanHull, Uttaksplanperiode } from '../types/UttaksplanPeriode';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const useAlleSaksperioderInklTapteDager = (): Uttaksplanperiode[] => {
    const { saksperioder, familiehendelsedato, familiesituasjon, foreldreInfo } = useUttaksplanData();

    return [
        ...saksperioder,
        ...lagTapteDagerPerioder(saksperioder, familiehendelsedato, familiesituasjon, foreldreInfo),
    ].sort(sorterPerioder);
};

export const useAlleSaksperioderInklTapteDagerOgPerioderUtenUttak = (): Uttaksplanperiode[] => {
    const { saksperioder, familiehendelsedato, familiesituasjon, foreldreInfo } = useUttaksplanData();

    const perioder = [
        ...saksperioder,
        ...lagTapteDagerPerioder(saksperioder, familiehendelsedato, familiesituasjon, foreldreInfo),
    ].sort(sorterPerioder);

    return [...perioder, ...lagPerioderUtenUttak(perioder, familiehendelsedato)].sort(sorterPerioder);
};

export const lagTapteDagerPerioder = (
    sortertePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
    foreldreInfo: ForeldreInfo,
): UttaksplanHull[] => {
    if (
        foreldreInfo.søker === 'FAR_ELLER_MEDMOR' &&
        (foreldreInfo.rettighetType === 'ALENEOMSORG' || foreldreInfo.rettighetType === 'BARE_SØKER_RETT')
    ) {
        const førstePeriodeSomStarterEtterFamiliehendelsedato = sortertePerioder.find((p) =>
            dayjs(p.fom).isSameOrAfter(familiehendelsedato),
        );

        if (førstePeriodeSomStarterEtterFamiliehendelsedato?.fom) {
            const fom =
                familiesituasjon === 'adopsjon'
                    ? dayjs(familiehendelsedato)
                    : dayjs(familiehendelsedato).add(6, 'week').add(1, 'day');

            const periodeSomSkalSjekkesForHull = {
                fom: fom.format(ISO_DATE_FORMAT),
                tom: førstePeriodeSomStarterEtterFamiliehendelsedato.fom,
            };

            return lagTapteDagerHull(sortertePerioder, 'FAR_MEDMOR', periodeSomSkalSjekkesForHull);
        }
    } else if (familiesituasjon !== 'adopsjon') {
        const periodeSomSkalSjekkesForHull = {
            fom: familiehendelsedato,
            tom: dayjs(familiehendelsedato).add(6, 'week').format(ISO_DATE_FORMAT),
        };
        const forelder = foreldreInfo.søker === 'MOR' ? 'MOR' : 'FAR_MEDMOR';
        return lagTapteDagerHull(sortertePerioder, forelder, periodeSomSkalSjekkesForHull);
    }

    return [];
};

const lagTapteDagerHull = (
    sortertePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    forelder: BrukerRolleSak_fpoversikt,
    periodeSomSkalSjekkesForHull: { fom: string; tom: string },
): UttaksplanHull[] => {
    const start = dayjs(periodeSomSkalSjekkesForHull.fom);
    const slutt = dayjs(periodeSomSkalSjekkesForHull.tom);

    const hull: UttaksplanHull[] = [];

    let pågåandeHullStart: dayjs.Dayjs | null = null;

    for (let dato = start; dato.isSameOrBefore(slutt, 'day'); dato = dato.add(1, 'day')) {
        if (erUkedag(dato)) {
            const erDatoDekket = sortertePerioder.some(
                (p) => dato.isSameOrAfter(p.fom, 'day') && dato.isSameOrBefore(p.tom, 'day'),
            );

            if (!erDatoDekket) {
                if (!pågåandeHullStart) {
                    pågåandeHullStart = dato;
                }
            } else if (pågåandeHullStart) {
                hull.push({
                    fom: pågåandeHullStart.format(ISO_DATE_FORMAT),
                    tom: dato.subtract(1, 'day').format(ISO_DATE_FORMAT),
                    hullType: 'TAPTE_DAGER',
                    forelder,
                });
                pågåandeHullStart = null;
            }
        }
    }

    // Avslutt hull som ikkje er avslutta av andre periodar
    if (pågåandeHullStart) {
        hull.push({
            fom: pågåandeHullStart.format(ISO_DATE_FORMAT),
            tom: slutt.subtract(1, 'day').format(ISO_DATE_FORMAT),
            hullType: 'TAPTE_DAGER',
            forelder,
        });
    }

    return hull;
};

export const lagPerioderUtenUttak = (
    sortertePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    familiehendelsedato: string,
): UttaksplanHull[] => {
    const perioderUtenUttak: UttaksplanHull[] = [];

    let gjeldendeDato = sortertePerioder.at(0)!.fom;

    for (const periode of sortertePerioder) {
        if (dayjs(gjeldendeDato).isBefore(periode.fom)) {
            const hullFom = gjeldendeDato;
            const hullTom = forrigeDag(periode.fom);

            const fhDato = dayjs(familiehendelsedato);

            if (fhDato.isAfter(hullFom) && fhDato.isBefore(hullTom)) {
                // Del hullet i to
                perioderUtenUttak.push(
                    {
                        fom: hullFom,
                        tom: forrigeDag(familiehendelsedato),
                        hullType: 'PERIODE_UTEN_UTTAK',
                        forelder: 'MOR',
                    },
                    {
                        fom: nesteDag(familiehendelsedato),
                        tom: hullTom,
                        hullType: 'PERIODE_UTEN_UTTAK',
                        forelder: 'MOR',
                    },
                );
            } else {
                perioderUtenUttak.push({ fom: hullFom, tom: hullTom, hullType: 'PERIODE_UTEN_UTTAK', forelder: 'MOR' });
            }
        }

        gjeldendeDato = nesteDag(periode.tom);
    }

    return perioderUtenUttak;
};

const nesteDag = (dato: string): string => dayjs(dato).add(1, 'day').format('YYYY-MM-DD');

const forrigeDag = (dato: string): string => dayjs(dato).subtract(1, 'day').format('YYYY-MM-DD');

const erUkedag = (dato: dayjs.Dayjs) => {
    const dag = dato.day();
    return dag !== 0 && dag !== 6;
};

export const sorterPerioder = (a: Uttaksplanperiode, b: Uttaksplanperiode): number => {
    const aFom = dayjs(a.fom);
    const bFom = dayjs(b.fom);

    if (aFom.isBefore(bFom)) {
        return -1;
    }
    if (aFom.isAfter(bFom)) {
        return 1;
    }
    return 0;
};
