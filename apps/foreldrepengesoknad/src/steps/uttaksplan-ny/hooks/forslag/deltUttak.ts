import dayjs from 'dayjs';

import { KontoDto, UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import {
    TidsperiodenString,
    UttaksdagenString,
    getTidsperiodeString,
    isValidTidsperiodeString,
} from '@navikt/fp-utils';

export const deltUttak = (
    famDato: string,
    tilgjengeligeStønadskontoer: KontoDto[],
    fellesperiodeDagerMor: number | undefined,
    startdato?: string,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> => {
    if (fellesperiodeDagerMor === undefined) {
        return [];
    }

    const førsteUttaksdag = UttaksdagenString.denneEllerNeste(startdato ?? famDato).getDato();
    const morsPerioder: UttakPeriode_fpoversikt[] = [];
    const farsPerioder: UttakPeriode_fpoversikt[] = [];
    const fellesperiodeDagerFarMedmor =
        tilgjengeligeStønadskontoer.find((k) => k.konto === 'FELLESPERIODE')!.dager - fellesperiodeDagerMor;
    const foreldrepengerFørFødsel = tilgjengeligeStønadskontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');
    const mødrekvote = tilgjengeligeStønadskontoer.find((k) => k.konto === 'MØDREKVOTE');
    const fedrekvote = tilgjengeligeStønadskontoer.find((k) => k.konto === 'FEDREKVOTE');
    let currentTomDate: string = førsteUttaksdag;

    if (foreldrepengerFørFødsel !== undefined) {
        const tidsperiode = getTidsperiodeString(
            UttaksdagenString.denne(currentTomDate).getDatoAntallUttaksdagerTidligere(15),
            foreldrepengerFørFødsel.dager,
        );
        const periodeFPFF: UttakPeriode_fpoversikt = {
            forelder: 'MOR',
            kontoType: 'FORELDREPENGER_FØR_FØDSEL',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
        };

        morsPerioder.push(periodeFPFF);

        currentTomDate = UttaksdagenString.neste(periodeFPFF.tom).getDato();
    }

    if (mødrekvote !== undefined) {
        const tidsperiode = getTidsperiodeString(currentTomDate, mødrekvote.dager);
        const periodeMødrekvote: UttakPeriode_fpoversikt = {
            forelder: 'MOR',
            kontoType: 'MØDREKVOTE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
        };

        morsPerioder.push(periodeMødrekvote);

        currentTomDate = UttaksdagenString.neste(periodeMødrekvote.tom).getDato();
    }

    if (fellesperiodeDagerMor > 0) {
        const tidsperiode = getTidsperiodeString(currentTomDate, fellesperiodeDagerMor);
        const periodeFellesperiode: UttakPeriode_fpoversikt = {
            forelder: 'MOR',
            kontoType: 'FELLESPERIODE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
        };

        morsPerioder.push(periodeFellesperiode);

        currentTomDate = UttaksdagenString.neste(periodeFellesperiode.tom).getDato();
    }

    if (fellesperiodeDagerFarMedmor > 0) {
        const tidsperiode = getTidsperiodeString(currentTomDate, fellesperiodeDagerFarMedmor);
        const periodeFellesperiode: UttakPeriode_fpoversikt = {
            forelder: 'FAR_MEDMOR',
            kontoType: 'FELLESPERIODE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
        };

        farsPerioder.push(periodeFellesperiode);

        currentTomDate = UttaksdagenString.neste(periodeFellesperiode.tom).getDato();
    }

    if (fedrekvote !== undefined) {
        const tidsperiode = getTidsperiodeString(currentTomDate, fedrekvote.dager);
        const periodeFedrekvote: UttakPeriode_fpoversikt = {
            forelder: 'FAR_MEDMOR',
            kontoType: 'FEDREKVOTE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
        };

        farsPerioder.push(periodeFedrekvote);
    }

    return [...morsPerioder, ...farsPerioder].sort(sorterPerioder);
};

export const sorterPerioder = (p1: UttakPeriode_fpoversikt, p2: UttakPeriode_fpoversikt) => {
    const tidsperiode1 = { fom: p1.fom, tom: p1.tom };
    const tidsperiode2 = { fom: p2.fom, tom: p2.tom };

    if (isValidTidsperiodeString(tidsperiode1) === false || isValidTidsperiodeString(tidsperiode2) === false) {
        return isValidTidsperiodeString(tidsperiode1) ? 1 : -1;
    }
    if (dayjs(tidsperiode1.fom).isSame(tidsperiode2.fom, 'day')) {
        return 1;
    }

    if (TidsperiodenString(tidsperiode2).erOmsluttetAv(tidsperiode1)) {
        return 1;
    }

    return dayjs(tidsperiode1.fom).isBefore(tidsperiode2.fom, 'day') ? -1 : 1;
};
