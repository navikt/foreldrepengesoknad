import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import {
    BrukerRolleSak_fpoversikt,
    Familiesituasjon,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { UttaksdagenString } from '@navikt/fp-utils';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { ForeldreInfo } from '../types/ForeldreInfo';
import {
    PerioderUtenUttakHull,
    TapteDagerHull,
    Uttaksplanperiode,
    UttaksplanperiodeMedKunTapteDager,
} from '../types/UttaksplanPeriode';
import { sorterPerioder } from './periodeUtils';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const useAlleUttakPerioderInklTapteDager = (): UttaksplanperiodeMedKunTapteDager[] => {
    const { uttakPerioder, familiehendelsedato, familiesituasjon, foreldreInfo } = useUttaksplanData();

    return [
        ...uttakPerioder,
        ...lagTapteDagerPerioder(uttakPerioder, familiehendelsedato, familiesituasjon, foreldreInfo),
    ].sort(sorterPerioder);
};

export const useAlleUttakPerioderInklTapteDagerOgPerioderUtenUttak = (
    uttakPerioderJustertForFamiliehendelsesdato: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
): Uttaksplanperiode[] => {
    const { familiehendelsedato, familiesituasjon, foreldreInfo } = useUttaksplanData();

    const perioder = [
        ...uttakPerioderJustertForFamiliehendelsesdato,
        ...lagTapteDagerPerioder(
            uttakPerioderJustertForFamiliehendelsesdato,
            familiehendelsedato,
            familiesituasjon,
            foreldreInfo,
        ),
    ].sort(sorterPerioder);

    return [...perioder, ...lagPerioderUtenUttak(perioder, familiehendelsedato)].sort(sorterPerioder);
};

export const lagTapteDagerPerioder = (
    sortertePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
    foreldreInfo: ForeldreInfo,
): TapteDagerHull[] => {
    if (
        foreldreInfo.søker === 'FAR_MEDMOR' &&
        (foreldreInfo.rettighetType === 'ALENEOMSORG' || foreldreInfo.rettighetType === 'BARE_SØKER_RETT')
    ) {
        const førstePeriodeSomStarterEtterFamiliehendelsedato = sortertePerioder.find((p) =>
            dayjs(p.fom).isSameOrAfter(familiehendelsedato),
        );

        if (førstePeriodeSomStarterEtterFamiliehendelsedato?.fom) {
            const periodeSomSkalSjekkesForHull = {
                fom:
                    familiesituasjon === 'adopsjon'
                        ? UttaksdagenString.denneEllerNeste(familiehendelsedato).getDato()
                        : UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(30),
                tom: førstePeriodeSomStarterEtterFamiliehendelsedato.fom,
            };

            return lagTapteDagerHull(sortertePerioder, 'FAR_MEDMOR', periodeSomSkalSjekkesForHull);
        }
    } else if (familiesituasjon !== 'adopsjon') {
        const periodeSomSkalSjekkesForHull = {
            fom: UttaksdagenString.denneEllerNeste(familiehendelsedato).getDato(),
            tom: UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(30),
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
): TapteDagerHull[] => {
    const { fom, tom } = periodeSomSkalSjekkesForHull;

    const perioderForIntervalletSomSkalSjekkes = sortertePerioder.filter(
        (p) => dayjs(p.fom).isSameOrBefore(tom) && dayjs(p.tom).isSameOrAfter(fom),
    );

    perioderForIntervalletSomSkalSjekkes.push(
        ...lagPerioderVedStartOgSluttOmDetMangler(perioderForIntervalletSomSkalSjekkes, periodeSomSkalSjekkesForHull),
    );

    perioderForIntervalletSomSkalSjekkes.sort(sorterPerioder);

    const perioderMedTapteDager: TapteDagerHull[] = [];

    let forrigePeriode = perioderForIntervalletSomSkalSjekkes[0]!;

    const perioderEkslFørstePeriode = perioderForIntervalletSomSkalSjekkes.slice(1);

    for (const periode of perioderEkslFørstePeriode) {
        const hullFom = UttaksdagenString.neste(forrigePeriode.tom).getDato();
        const hullTom = UttaksdagenString.forrige(periode.fom).getDato();

        if (dayjs(hullTom).isSameOrAfter(hullFom, 'day')) {
            perioderMedTapteDager.push({
                fom: hullFom,
                tom: hullTom,
                forelder,
                type: 'TAPTE_DAGER',
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
            fom: UttaksdagenString.forrige(fom).getDato(),
            tom: UttaksdagenString.forrige(fom).getDato(),
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
): PerioderUtenUttakHull[] => {
    const sortertePerioderMedFamiliehendelse = [...sortertePerioder]
        .concat({
            fom: familiehendelsedato,
            tom: familiehendelsedato,
        })
        .sort(sorterPerioder);

    const perioderUtenUttak: PerioderUtenUttakHull[] = [];

    let forrigePeriode = sortertePerioderMedFamiliehendelse[0]!;

    const perioderEkslFørstePeriode = sortertePerioderMedFamiliehendelse.slice(1);

    for (const periode of perioderEkslFørstePeriode) {
        const hullFom = UttaksdagenString.neste(forrigePeriode.tom).getDato();
        const hullTom = UttaksdagenString.forrige(periode.fom).getDato();

        if (dayjs(hullTom).isSameOrAfter(hullFom, 'day')) {
            perioderUtenUttak.push({
                type: 'PERIODE_UTEN_UTTAK',
                fom: hullFom,
                tom: hullTom,
            });
        }

        forrigePeriode = periode;
    }

    return perioderUtenUttak;
};
