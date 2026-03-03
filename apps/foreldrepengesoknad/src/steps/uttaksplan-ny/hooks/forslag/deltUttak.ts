import dayjs from 'dayjs';

import { KontoDto, Tidsperiode, UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { TidsperiodenString, UttaksdagenString, erUttaksdag } from '@navikt/fp-utils';

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
            flerbarnsdager: false,
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
            flerbarnsdager: false,
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
            flerbarnsdager: false,
        };

        morsPerioder.push(periodeFellesperiode);

        currentTomDate = UttaksdagenString.neste(periodeFellesperiode.tom).getDato();
    }

    if (fedrekvote !== undefined) {
        const tidsperiode = getTidsperiodeString(currentTomDate, fedrekvote.dager);
        const periodeFedrekvote: UttakPeriode_fpoversikt = {
            forelder: 'FAR_MEDMOR',
            kontoType: 'FEDREKVOTE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        };

        farsPerioder.push(periodeFedrekvote);

        currentTomDate = UttaksdagenString.neste(periodeFedrekvote.tom).getDato();
    }

    if (fellesperiodeDagerFarMedmor > 0) {
        const tidsperiode = getTidsperiodeString(currentTomDate, fellesperiodeDagerFarMedmor);
        const periodeFellesperiode: UttakPeriode_fpoversikt = {
            forelder: 'FAR_MEDMOR',
            kontoType: 'FELLESPERIODE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        };

        farsPerioder.push(periodeFellesperiode);
    }

    return [...morsPerioder, ...farsPerioder].sort(sorterPerioder);
};

export const sorterPerioder = (
    p1: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    p2: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
) => {
    const tidsperiode1 = { fom: p1.fom, tom: p1.tom };
    const tidsperiode2 = { fom: p2.fom, tom: p2.tom };

    if (
        TidsperiodenString.forPeriode(tidsperiode1).erGyldig() === false ||
        TidsperiodenString.forPeriode(tidsperiode2).erGyldig() === false
    ) {
        return TidsperiodenString.forPeriode(tidsperiode1).erGyldig() ? 1 : -1;
    }
    if (dayjs(tidsperiode1.fom).isSame(tidsperiode2.fom, 'day')) {
        return 1;
    }

    if (TidsperiodenString.forPeriode(tidsperiode2).erOmsluttetAv(tidsperiode1)) {
        return 1;
    }

    return dayjs(tidsperiode1.fom).isBefore(tidsperiode2.fom, 'day') ? -1 : 1;
};

// TODO (TOR) Dette ser ut som noko me ikkje vil gjera. Her er ein vel i ein feilsituasjon?
export const getTidsperiodeString = (fom: string, uttaksdager: number): Tidsperiode => {
    if (!erUttaksdag(fom)) {
        throw new Error('FOM er ikke en uttaksdag');
    }
    return {
        fom,
        tom: UttaksdagenString.denne(fom).getDatoAntallUttaksdagerSenere(uttaksdager - 1),
    };
};
