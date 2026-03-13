import dayjs from 'dayjs';

import { KontoDto, Tidsperiode, UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { TidsperiodenString, UttaksdagenString, erUttaksdag } from '@navikt/fp-utils';

import { FellesperiodeFordelingValg, Fordeling } from '../../../../types/Fordeling';

const getFellesperioderDagerFordeling = (fordeling: Fordeling, fellesperiodeDagerTilgjengelig: number) => {
    if (fordeling.fordelingValg === FellesperiodeFordelingValg.ALT) {
        const fellesperiodeDagerMor = fellesperiodeDagerTilgjengelig;
        const fellesperiodeDagerFarMedmor = 0;

        return { fellesperiodeDagerMor, fellesperiodeDagerFarMedmor };
    } else if (fordeling.fordelingValg === FellesperiodeFordelingValg.VIL_VELGE) {
        const antallDager = fordeling.antallDagerFellesperiodeTilSøker
            ? Number.parseInt(fordeling.antallDagerFellesperiodeTilSøker, 10)
            : 0;

        const antallUker = fordeling.antallUkerFellesperiodeTilSøker
            ? Number.parseInt(fordeling.antallUkerFellesperiodeTilSøker, 10)
            : 0;

        const fellesperiodeDagerMor = antallUker * 5 + antallDager;
        const fellesperiodeDagerFarMedmor = fellesperiodeDagerTilgjengelig - fellesperiodeDagerMor;

        return { fellesperiodeDagerMor, fellesperiodeDagerFarMedmor };
    } else {
        const fellesperiodeDagerMor = 0;
        const fellesperiodeDagerFarMedmor = 0;

        return { fellesperiodeDagerMor, fellesperiodeDagerFarMedmor };
    }
};

const lagDeltUttakForMor = (famDato: string, stønadskontoer: KontoDto[], startdato: string, fordeling: Fordeling) => {
    const forslag: UttakPeriode_fpoversikt[] = [];
    const dagerMellomFamDatoOgStartdato = UttaksdagenString.denne(startdato).getUttaksdagerFremTilDato(famDato);
    const dagerMedFellesperiodeFørFødsel = dagerMellomFamDatoOgStartdato > 15 ? dagerMellomFamDatoOgStartdato - 15 : 0;

    const foreldrepengerFørFødsel = stønadskontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');
    const mødrekvote = stønadskontoer.find((k) => k.konto === 'MØDREKVOTE');
    const fedrekvote = stønadskontoer.find((k) => k.konto === 'FEDREKVOTE');
    const fellesperiode = stønadskontoer.find((k) => k.konto === 'FELLESPERIODE');
    const fellesperiodeDagerTilgjengelig = fellesperiode ? fellesperiode.dager - dagerMedFellesperiodeFørFødsel : 0;
    const { fellesperiodeDagerMor, fellesperiodeDagerFarMedmor } = getFellesperioderDagerFordeling(
        fordeling,
        fellesperiodeDagerTilgjengelig,
    );

    let currentFomDate = startdato;
    let tidsperiode = undefined;

    if (dagerMellomFamDatoOgStartdato > 0 && dagerMellomFamDatoOgStartdato <= 15) {
        const dagerMedForeldrepengerFørFødsel = foreldrepengerFørFødsel
            ? Math.min(foreldrepengerFørFødsel.dager, dagerMellomFamDatoOgStartdato)
            : 0;

        tidsperiode = getTidsperiodeString(
            UttaksdagenString.denne(currentFomDate).getDato(),
            dagerMedForeldrepengerFørFødsel,
        );

        forslag.push({
            forelder: 'MOR',
            kontoType: 'FORELDREPENGER_FØR_FØDSEL',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        });

        currentFomDate = UttaksdagenString.neste(tidsperiode.tom).getDato();
    }

    if (dagerMellomFamDatoOgStartdato > 15) {
        tidsperiode = getTidsperiodeString(
            UttaksdagenString.denne(currentFomDate).getDato(),
            dagerMedFellesperiodeFørFødsel,
        );

        forslag.push({
            forelder: 'MOR',
            kontoType: 'FELLESPERIODE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        });

        currentFomDate = UttaksdagenString.neste(tidsperiode.tom).getDato();

        tidsperiode = getTidsperiodeString(currentFomDate, 15);

        forslag.push({
            forelder: 'MOR',
            kontoType: 'FORELDREPENGER_FØR_FØDSEL',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        });

        currentFomDate = UttaksdagenString.denne(famDato).getDato();
    }

    tidsperiode = getTidsperiodeString(currentFomDate, mødrekvote ? mødrekvote.dager : 0);

    forslag.push({
        forelder: 'MOR',
        kontoType: 'MØDREKVOTE',
        fom: tidsperiode.fom,
        tom: tidsperiode.tom,
        flerbarnsdager: false,
    });

    currentFomDate = UttaksdagenString.neste(tidsperiode.tom).getDato();

    if (fellesperiodeDagerMor !== 0) {
        tidsperiode = getTidsperiodeString(currentFomDate, fellesperiodeDagerMor);

        forslag.push({
            forelder: 'MOR',
            kontoType: 'FELLESPERIODE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        });

        currentFomDate = UttaksdagenString.neste(tidsperiode.tom).getDato();
    }

    tidsperiode = getTidsperiodeString(currentFomDate, fedrekvote ? fedrekvote.dager : 0);

    forslag.push({
        forelder: 'FAR_MEDMOR',
        kontoType: 'FEDREKVOTE',
        fom: tidsperiode.fom,
        tom: tidsperiode.tom,
        flerbarnsdager: false,
    });

    currentFomDate = UttaksdagenString.neste(tidsperiode.tom).getDato();

    if (fellesperiodeDagerFarMedmor !== 0) {
        tidsperiode = getTidsperiodeString(currentFomDate, fellesperiodeDagerFarMedmor);

        forslag.push({
            forelder: 'FAR_MEDMOR',
            kontoType: 'FELLESPERIODE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        });
    }

    return forslag;
};

const lagDeltUttakForFarMedmor = (
    famDato: string,
    stønadskontoer: KontoDto[],
    startdato: string,
): UttakPeriode_fpoversikt[] => {
    const harFødselspermisjon =
        UttaksdagenString.denneEllerNeste(famDato).getDato() === UttaksdagenString.denneEllerNeste(startdato).getDato();
    const forslag: UttakPeriode_fpoversikt[] = [];

    const foreldrepengerFørFødsel = stønadskontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');
    const mødrekvote = stønadskontoer.find((k) => k.konto === 'MØDREKVOTE');
    const fedrekvote = stønadskontoer.find((k) => k.konto === 'FEDREKVOTE');
    const fellesperiode = stønadskontoer.find((k) => k.konto === 'FELLESPERIODE');
    const gjenståendreFedrekvote = fedrekvote && harFødselspermisjon ? fedrekvote.dager - 10 : undefined;

    let currentFomDate = UttaksdagenString.denneEllerNeste(startdato).getDato();

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
        tidsperiode = getTidsperiodeString(currentFomDate, 10);

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
    fordeling: Fordeling,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> => {
    if (erSøkerFarEllerMedmor) {
        return lagDeltUttakForFarMedmor(famDato, stønadskontoer, startdato);
    }

    return lagDeltUttakForMor(famDato, stønadskontoer, startdato, fordeling);
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
