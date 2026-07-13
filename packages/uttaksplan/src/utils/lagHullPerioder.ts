import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import {
    BrukerRolleSak_fpoversikt,
    Familiesituasjon,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils';

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
    if (foreldreInfo.søker === 'FAR_MEDMOR' && foreldreInfo.rettighetType === 'BARE_SØKER_RETT') {
        // Første dagen far/medmor kan ta ut dager: 6 uker etter fødsel (mors reserverte
        // periode) ved fødsel, eller omsorgsovertakelsesdatoen ved adopsjon.
        const førsteMuligeUttaksdag =
            familiesituasjon === 'adopsjon'
                ? Uttaksdagen.denneEllerNeste(familiehendelsedato).getDato()
                : Uttaksdagen.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(30);

        // Perioder som starter før denne datoen skal ikke være med når vi finner slutten
        // på intervallet vi sjekker for hull, siden far/medmor uansett ikke kan ta ut dager
        // før den. Ellers kan sluttdatoen (tom) havne før startdatoen (fom), slik at
        // intervallet blir snudd og det vises feilaktig tapte dager.
        const sistePeriodeSomStarterEtterFørsteMuligeUttaksdag = sortertePerioder.findLast((p) =>
            dayjs(p.fom).isSameOrAfter(førsteMuligeUttaksdag),
        );

        if (sistePeriodeSomStarterEtterFørsteMuligeUttaksdag?.fom) {
            const periodeSomSkalSjekkesForHull = {
                fom: førsteMuligeUttaksdag,
                tom: sistePeriodeSomStarterEtterFørsteMuligeUttaksdag.fom,
            };

            return lagTapteDagerHull(sortertePerioder, foreldreInfo.søker, periodeSomSkalSjekkesForHull);
        }
    } else if (familiesituasjon !== 'adopsjon' && foreldreInfo.søker === 'MOR') {
        const periodeSomSkalSjekkesForHull = {
            fom: Uttaksdagen.denneEllerNeste(familiehendelsedato).getDato(),
            tom: Uttaksdagen.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(30),
        };
        return lagTapteDagerHull(sortertePerioder, foreldreInfo.søker, periodeSomSkalSjekkesForHull);
    }

    return [];
};

const lagTapteDagerHull = (
    sortertePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    forelder: BrukerRolleSak_fpoversikt,
    periodeSomSkalSjekkesForHull: { fom: string; tom: string },
): TapteDagerHull[] => {
    const { fom, tom } = periodeSomSkalSjekkesForHull;

    const perioderForIntervalletSomSkalSjekkes = sortertePerioder
        .filter((p) => dayjs(p.fom).isSameOrBefore(tom) && dayjs(p.tom).isSameOrAfter(fom))
        .map((p) => ({ fom: p.fom, tom: p.tom }));

    perioderForIntervalletSomSkalSjekkes.push(
        ...lagPerioderVedStartOgSluttOmDetMangler(perioderForIntervalletSomSkalSjekkes, periodeSomSkalSjekkesForHull),
    );

    perioderForIntervalletSomSkalSjekkes.sort(sorterPerioder);

    const perioderMedTapteDager: TapteDagerHull[] = [];

    let forrigePeriode = perioderForIntervalletSomSkalSjekkes[0]!;

    const perioderEkslFørstePeriode = perioderForIntervalletSomSkalSjekkes.slice(1);

    for (const periode of perioderEkslFørstePeriode) {
        const hullFom = Uttaksdagen.neste(forrigePeriode.tom).getDato();
        const hullTom = Uttaksdagen.forrige(periode.fom).getDato();

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
    perioder: Array<{ fom: string; tom: string }>,
    periodeSomSkalSjekkesForHull: { fom: string; tom: string },
) => {
    const nyePerioder = [];
    const { fom, tom } = periodeSomSkalSjekkesForHull;

    if (!perioder.some((p) => dayjs(p.fom).isSameOrBefore(fom))) {
        nyePerioder.push({
            fom: Uttaksdagen.forrige(fom).getDato(),
            tom: Uttaksdagen.forrige(fom).getDato(),
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
    sortertePerioder: UttaksplanperiodeMedKunTapteDager[],
    familiehendelsedato: string,
): PerioderUtenUttakHull[] => {
    const sortertePerioderMedFamiliehendelse = [...sortertePerioder]
        .map((p) => ({ fom: p.fom, tom: p.tom }))
        .concat({
            fom: familiehendelsedato,
            tom: familiehendelsedato,
        })
        .sort(sorterPerioder);

    const perioderUtenUttak: PerioderUtenUttakHull[] = [];

    let forrigePeriode = sortertePerioderMedFamiliehendelse[0]!;

    const perioderEkslFørstePeriode = sortertePerioderMedFamiliehendelse.slice(1);

    for (const periode of perioderEkslFørstePeriode) {
        const hullFom = Uttaksdagen.neste(forrigePeriode.tom).getDato();
        const hullTom = Uttaksdagen.forrige(periode.fom).getDato();

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
