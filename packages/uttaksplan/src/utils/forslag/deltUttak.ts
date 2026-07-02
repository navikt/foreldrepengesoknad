import { KontoDto, Tidsperiode, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils';

import { sorterUttakPerioder } from '../periodeUtils';

const getTidsperiodeString = (fom: string, uttaksdager: number): Tidsperiode => {
    return {
        fom,
        tom: Uttaksdagen.denne(fom).getDatoAntallUttaksdagerSenere(uttaksdager - 1),
    };
};

interface DeltUttakParams {
    famDato: string;
    tilgjengeligeStønadskvoter: KontoDto[];
    fellesperiodeDagerFørsteForelder: number | undefined;
    starterForelder?: 'MOR' | 'FAR_MEDMOR';
    startdato?: string;
}

/**
 * Generates a suggested parental leave plan for delt uttak (shared parental leave).
 *
 * When `startdato` is not provided, it defaults to 15 uttaksdager before `famDato` so that the
 * standard foreldrepenger-før-fødsel period (3 weeks before birth) is included automatically.
 * When `startdato` is provided explicitly (e.g., the same day as `famDato`) the plan starts there
 * with no foreldrepenger-før-fødsel period.
 *
 * Returns a single `UttakPeriode_fpoversikt[]` with the suggested periods for delt uttak.
 */
export const deltUttak = ({
    famDato,
    tilgjengeligeStønadskvoter,
    fellesperiodeDagerFørsteForelder,
    starterForelder = 'MOR',
    startdato,
}: DeltUttakParams): UttakPeriode_fpoversikt[] => {
    if (fellesperiodeDagerFørsteForelder === undefined) {
        return [];
    }

    const helgejustertFamDato = Uttaksdagen.denneEllerNeste(famDato).getDato();

    const foreldrepengerFørFødsel = tilgjengeligeStønadskvoter.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');
    const mødrekvote = tilgjengeligeStønadskvoter.find((k) => k.konto === 'MØDREKVOTE');
    const fedrekvote = tilgjengeligeStønadskvoter.find((k) => k.konto === 'FEDREKVOTE');
    const fellesperiode = tilgjengeligeStønadskvoter.find((k) => k.konto === 'FELLESPERIODE');

    // When no startdato is given and FPFF is available, default to 15 uttaksdager before famDato
    // so that the standard foreldrepenger-før-fødsel period is included automatically.
    // For adoption (no FPFF in kontoer) or other cases, start directly at famDato.
    const effectiveStartdato =
        startdato ??
        (foreldrepengerFørFødsel
            ? Uttaksdagen.denne(helgejustertFamDato).getDatoAntallUttaksdagerTidligere(15)
            : helgejustertFamDato);

    const dagerMellomFamDatoOgStartdato =
        Uttaksdagen.denne(effectiveStartdato).getUttaksdagerFremTilDato(helgejustertFamDato);
    const dagerMedFellesperiodeFørFødsel = dagerMellomFamDatoOgStartdato > 15 ? dagerMellomFamDatoOgStartdato - 15 : 0;

    const fellesperiodeDagerAndreForelder = Math.max(
        0,
        (fellesperiode?.dager ?? 0) - dagerMedFellesperiodeFørFødsel - fellesperiodeDagerFørsteForelder,
    );

    const morsPerioder: UttakPeriode_fpoversikt[] = [];
    const farsPerioder: UttakPeriode_fpoversikt[] = [];
    let currentFomDate = effectiveStartdato;
    let tidsperiode: Tidsperiode;

    if (dagerMellomFamDatoOgStartdato > 0 && dagerMellomFamDatoOgStartdato <= 15) {
        const dagerMedForeldrepengerFørFødsel = foreldrepengerFørFødsel
            ? Math.min(foreldrepengerFørFødsel.dager, dagerMellomFamDatoOgStartdato)
            : 0;

        tidsperiode = getTidsperiodeString(
            Uttaksdagen.denne(currentFomDate).getDato(),
            dagerMedForeldrepengerFørFødsel,
        );

        morsPerioder.push({
            forelder: 'MOR',
            kontoType: 'FORELDREPENGER_FØR_FØDSEL',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        });

        currentFomDate = Uttaksdagen.neste(tidsperiode.tom).getDato();
    }

    if (dagerMellomFamDatoOgStartdato > 15) {
        tidsperiode = getTidsperiodeString(Uttaksdagen.denne(currentFomDate).getDato(), dagerMedFellesperiodeFørFødsel);

        morsPerioder.push({
            forelder: 'MOR',
            kontoType: 'FELLESPERIODE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        });

        currentFomDate = Uttaksdagen.neste(tidsperiode.tom).getDato();

        tidsperiode = getTidsperiodeString(currentFomDate, 15);

        morsPerioder.push({
            forelder: 'MOR',
            kontoType: 'FORELDREPENGER_FØR_FØDSEL',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        });

        currentFomDate = Uttaksdagen.denne(helgejustertFamDato).getDato();
    }

    const førsteForelder = starterForelder;
    const andreForelder = starterForelder === 'MOR' ? 'FAR_MEDMOR' : 'MOR';
    const førsteForelderKvote = starterForelder === 'MOR' ? mødrekvote : fedrekvote;
    const andreForelderKvote = starterForelder === 'MOR' ? fedrekvote : mødrekvote;
    const førsteForelderKontoType = starterForelder === 'MOR' ? 'MØDREKVOTE' : 'FEDREKVOTE';
    const andreForelderKontoType = starterForelder === 'MOR' ? 'FEDREKVOTE' : 'MØDREKVOTE';
    const førsteForelderPerioder = starterForelder === 'MOR' ? morsPerioder : farsPerioder;
    const andreForelderPerioder = starterForelder === 'MOR' ? farsPerioder : morsPerioder;

    tidsperiode = getTidsperiodeString(currentFomDate, førsteForelderKvote ? førsteForelderKvote.dager : 0);

    førsteForelderPerioder.push({
        forelder: førsteForelder,
        kontoType: førsteForelderKontoType,
        fom: tidsperiode.fom,
        tom: tidsperiode.tom,
        flerbarnsdager: false,
    });

    currentFomDate = Uttaksdagen.neste(tidsperiode.tom).getDato();

    if (fellesperiodeDagerFørsteForelder !== 0) {
        tidsperiode = getTidsperiodeString(currentFomDate, fellesperiodeDagerFørsteForelder);

        førsteForelderPerioder.push({
            forelder: førsteForelder,
            kontoType: 'FELLESPERIODE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        });

        currentFomDate = Uttaksdagen.neste(tidsperiode.tom).getDato();
    }

    tidsperiode = getTidsperiodeString(currentFomDate, andreForelderKvote ? andreForelderKvote.dager : 0);

    andreForelderPerioder.push({
        forelder: andreForelder,
        kontoType: andreForelderKontoType,
        fom: tidsperiode.fom,
        tom: tidsperiode.tom,
        flerbarnsdager: false,
    });

    currentFomDate = Uttaksdagen.neste(tidsperiode.tom).getDato();

    if (fellesperiodeDagerAndreForelder !== 0) {
        tidsperiode = getTidsperiodeString(currentFomDate, fellesperiodeDagerAndreForelder);

        andreForelderPerioder.push({
            forelder: andreForelder,
            kontoType: 'FELLESPERIODE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        });
    }

    return [...morsPerioder, ...farsPerioder].sort(sorterUttakPerioder);
};
