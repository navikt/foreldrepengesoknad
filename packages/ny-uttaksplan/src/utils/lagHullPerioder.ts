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
    const { fom, tom } = periodeSomSkalSjekkesForHull;

    const perioderForIntervalletSomSkalSjekkes = sortertePerioder.filter(
        (p) => dayjs(p.fom).isSameOrBefore(tom) && dayjs(p.tom).isSameOrAfter(fom),
    );

    perioderForIntervalletSomSkalSjekkes.push(
        ...lagPerioderVedStartOgSluttOmDetMangler(perioderForIntervalletSomSkalSjekkes, periodeSomSkalSjekkesForHull),
    );

    perioderForIntervalletSomSkalSjekkes.sort(sorterPerioder);

    const perioderMedTapteDager: UttaksplanHull[] = [];

    let forrigePeriode = perioderForIntervalletSomSkalSjekkes[0]!;

    const perioderEkslFørstePeriode = perioderForIntervalletSomSkalSjekkes.slice(1);

    for (const periode of perioderEkslFørstePeriode) {
        const hullFom = nesteUkedag(forrigePeriode.tom);
        const hullTom = forrigeUkedag(periode.fom);

        if (dayjs(hullTom).isSameOrAfter(hullFom, 'day')) {
            perioderMedTapteDager.push({
                fom: hullFom,
                tom: hullTom,
                hullType: 'TAPTE_DAGER',
                forelder,
            });
        }

        forrigePeriode = periode;
    }

    return perioderMedTapteDager;
};

const lagPerioderVedStartOgSluttOmDetMangler = (
    perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    periodeSomSkalSjekkesForHull: { fom: string; tom: string },
) => {
    const nyePerioder = [];
    const { fom, tom } = periodeSomSkalSjekkesForHull;

    if (!perioder.some((p) => dayjs(p.fom).isSameOrBefore(fom))) {
        nyePerioder.push({
            fom: forrigeUkedag(fom),
            tom: forrigeUkedag(fom),
        });
    }
    if (!perioder.some((p) => dayjs(p.tom).isSameOrAfter(tom))) {
        nyePerioder.push({
            fom: tom,
            tom: tom,
        });
    }

    return nyePerioder;
};

export const lagPerioderUtenUttak = (
    sortertePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    familiehendelsedato: string,
): UttaksplanHull[] => {
    const sortertePerioderMedFamiliehendelse = [...sortertePerioder]
        .concat({
            fom: familiehendelsedato,
            tom: familiehendelsedato,
        })
        .sort(sorterPerioder);

    const perioderUtenUttak: UttaksplanHull[] = [];

    let forrigePeriode = sortertePerioderMedFamiliehendelse[0]!;

    const perioderEkslFørstePeriode = sortertePerioderMedFamiliehendelse.slice(1);

    for (const periode of perioderEkslFørstePeriode) {
        const hullFom = nesteUkedag(forrigePeriode.tom);
        const hullTom = forrigeUkedag(periode.fom);

        if (dayjs(hullTom).isSameOrAfter(hullFom, 'day')) {
            perioderUtenUttak.push({
                fom: hullFom,
                tom: hullTom,
                hullType: 'PERIODE_UTEN_UTTAK',
                // (TOR) Lag eigen type for perioder uten uttak sånn at ein får vekk forelder
                forelder: 'MOR',
            });
        }

        forrigePeriode = periode;
    }

    return perioderUtenUttak;
};

const nesteUkedag = (dato: string): string => {
    let nDato = dayjs(dato).add(1, 'day');
    while (!erUkedag(nDato)) {
        nDato = nDato.add(1, 'day');
    }
    return nDato.format(ISO_DATE_FORMAT);
};

const forrigeUkedag = (dato: string): string => {
    let fDato = dayjs(dato).subtract(1, 'day');
    while (!erUkedag(fDato)) {
        fDato = fDato.subtract(1, 'day');
    }
    return fDato.format(ISO_DATE_FORMAT);
};

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

    const aTom = dayjs(a.tom);
    const bTom = dayjs(b.tom);

    if (aTom.isBefore(bTom)) {
        return -1;
    }
    if (aTom.isAfter(bTom)) {
        return 1;
    }

    return 0;
};
