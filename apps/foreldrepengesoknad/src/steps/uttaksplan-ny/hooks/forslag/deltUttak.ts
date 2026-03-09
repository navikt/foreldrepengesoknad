import dayjs from 'dayjs';

import { KontoDto, Tidsperiode, UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { TidsperiodenString, UttaksdagenString, erUttaksdag } from '@navikt/fp-utils';

const lagDeltUttakForMor = () => {
    return [];
};

const lagDeltUttakForFarMedmor = (
    famDato: string,
    stønadskontoer: KontoDto[],
    startdato: string,
): UttakPeriode_fpoversikt[] => {
    const harFødselspermisjon = famDato === startdato;
    const forslag: UttakPeriode_fpoversikt[] = [];

    const foreldrepengerFørFødsel = stønadskontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');
    const mødrekvote = stønadskontoer.find((k) => k.konto === 'MØDREKVOTE');
    const fedrekvote = stønadskontoer.find((k) => k.konto === 'FEDREKVOTE');
    const fellesperiode = stønadskontoer.find((k) => k.konto === 'FELLESPERIODE');
    const gjenståendreFedrekvote = fedrekvote && harFødselspermisjon ? fedrekvote.dager - 10 : undefined;

    let currentFomDate = startdato;

    let tidsperiode = getTidsperiodeString(
        UttaksdagenString.denne(currentFomDate).getDatoAntallUttaksdagerTidligere(15),
        foreldrepengerFørFødsel ? foreldrepengerFørFødsel.dager : 15,
    );

    forslag.push({
        forelder: 'MOR',
        kontoType: 'FORELDREPENGER_FØR_FØDSEL',
        fom: tidsperiode.fom,
        tom: tidsperiode.tom,
        flerbarnsdager: false,
    });

    if (harFødselspermisjon) {
        tidsperiode = getTidsperiodeString(
            UttaksdagenString.denne(currentFomDate).getDatoAntallUttaksdagerSenere(10),
            10,
        );

        forslag.push({
            forelder: 'MOR',
            kontoType: 'MØDREKVOTE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
            samtidigUttak: 100,
        });
        forslag.push({
            forelder: 'FAR_MEDMOR',
            kontoType: 'FEDREKVOTE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
            samtidigUttak: 100,
        });

        currentFomDate = UttaksdagenString.neste(tidsperiode.tom).getDato();

        tidsperiode = getTidsperiodeString(currentFomDate, mødrekvote ? mødrekvote.dager : 0);

        forslag.push({
            forelder: 'MOR',
            kontoType: 'MØDREKVOTE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        });
    } else {
        tidsperiode = getTidsperiodeString(currentFomDate, mødrekvote ? mødrekvote.dager : 0);

        forslag.push({
            forelder: 'MOR',
            kontoType: 'MØDREKVOTE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        });

        currentFomDate = UttaksdagenString.neste(tidsperiode.tom).getDato();
    }

    tidsperiode = getTidsperiodeString(currentFomDate, fellesperiode ? fellesperiode.dager : 0);

    forslag.push({
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
        fom: tidsperiode.fom,
        tom: tidsperiode.tom,
        flerbarnsdager: false,
    });

    currentFomDate = UttaksdagenString.neste(tidsperiode.tom).getDato();

    tidsperiode = getTidsperiodeString(
        currentFomDate,
        gjenståendreFedrekvote !== undefined ? gjenståendreFedrekvote : fedrekvote ? fedrekvote.dager : 0,
    );

    forslag.push({
        forelder: 'FAR_MEDMOR',
        kontoType: 'FEDREKVOTE',
        fom: tidsperiode.fom,
        tom: tidsperiode.tom,
        flerbarnsdager: false,
    });

    return forslag;
};

export const deltUttak = (
    famDato: string,
    stønadskontoer: KontoDto[],
    erSøkerFarEllerMedmor: boolean,
    startdato: string,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> => {
    if (erSøkerFarEllerMedmor) {
        return lagDeltUttakForFarMedmor(famDato, stønadskontoer, startdato);
    }

    return lagDeltUttakForMor();

    // const førsteUttaksdag = UttaksdagenString.denneEllerNeste(startdato ?? famDato).getDato();
    // const morsPerioder: UttakPeriode_fpoversikt[] = [];
    // const farsPerioder: UttakPeriode_fpoversikt[] = [];
    // const fellesperiodeDagerFarMedmor =
    //     stønadskontoer.find((k) => k.konto === 'FELLESPERIODE')!.dager - fellesperiodeDagerMor;
    // const foreldrepengerFørFødsel = stønadskontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');
    // const mødrekvote = stønadskontoer.find((k) => k.konto === 'MØDREKVOTE');
    // const fedrekvote = stønadskontoer.find((k) => k.konto === 'FEDREKVOTE');
    // let currentTomDate: string = førsteUttaksdag;

    // if (foreldrepengerFørFødsel !== undefined) {
    //     const tidsperiode = getTidsperiodeString(
    //         UttaksdagenString.denne(currentTomDate).getDatoAntallUttaksdagerTidligere(15),
    //         foreldrepengerFørFødsel.dager,
    //     );
    //     const periodeFPFF: UttakPeriode_fpoversikt = {
    //         forelder: 'MOR',
    //         kontoType: 'FORELDREPENGER_FØR_FØDSEL',
    //         fom: tidsperiode.fom,
    //         tom: tidsperiode.tom,
    //         flerbarnsdager: false,
    //     };

    //     morsPerioder.push(periodeFPFF);

    //     currentTomDate = UttaksdagenString.neste(periodeFPFF.tom).getDato();
    // }

    // if (mødrekvote !== undefined) {
    //     const tidsperiode = getTidsperiodeString(currentTomDate, mødrekvote.dager);
    //     const periodeMødrekvote: UttakPeriode_fpoversikt = {
    //         forelder: 'MOR',
    //         kontoType: 'MØDREKVOTE',
    //         fom: tidsperiode.fom,
    //         tom: tidsperiode.tom,
    //         flerbarnsdager: false,
    //     };

    //     morsPerioder.push(periodeMødrekvote);

    //     currentTomDate = UttaksdagenString.neste(periodeMødrekvote.tom).getDato();
    // }

    // if (fellesperiodeDagerMor > 0) {
    //     const tidsperiode = getTidsperiodeString(currentTomDate, fellesperiodeDagerMor);
    //     const periodeFellesperiode: UttakPeriode_fpoversikt = {
    //         forelder: 'MOR',
    //         kontoType: 'FELLESPERIODE',
    //         fom: tidsperiode.fom,
    //         tom: tidsperiode.tom,
    //         flerbarnsdager: false,
    //     };

    //     morsPerioder.push(periodeFellesperiode);

    //     currentTomDate = UttaksdagenString.neste(periodeFellesperiode.tom).getDato();
    // }

    // if (fedrekvote !== undefined) {
    //     const tidsperiode = getTidsperiodeString(currentTomDate, fedrekvote.dager);
    //     const periodeFedrekvote: UttakPeriode_fpoversikt = {
    //         forelder: 'FAR_MEDMOR',
    //         kontoType: 'FEDREKVOTE',
    //         fom: tidsperiode.fom,
    //         tom: tidsperiode.tom,
    //         flerbarnsdager: false,
    //     };

    //     farsPerioder.push(periodeFedrekvote);

    //     currentTomDate = UttaksdagenString.neste(periodeFedrekvote.tom).getDato();
    // }

    // if (fellesperiodeDagerFarMedmor > 0) {
    //     const tidsperiode = getTidsperiodeString(currentTomDate, fellesperiodeDagerFarMedmor);
    //     const periodeFellesperiode: UttakPeriode_fpoversikt = {
    //         forelder: 'FAR_MEDMOR',
    //         kontoType: 'FELLESPERIODE',
    //         fom: tidsperiode.fom,
    //         tom: tidsperiode.tom,
    //         flerbarnsdager: false,
    //     };

    //     farsPerioder.push(periodeFellesperiode);
    // }

    // return [...morsPerioder, ...farsPerioder].sort(sorterPerioder);
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
