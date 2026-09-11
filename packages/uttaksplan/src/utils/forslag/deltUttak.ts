import { KontoDto, PeriodeDto_fpoversikt, Tidsperiode } from '@navikt/fp-types';
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
    starterForelder?: Forelder;
    startdato?: string;
}

type Forelder = 'MOR' | 'FAR_MEDMOR';

interface ForelderKonfig {
    førsteForelder: Forelder;
    andreForelder: Forelder;
    førsteForelderKvote: KontoDto | undefined;
    andreForelderKvote: KontoDto | undefined;
    førsteForelderKontoType: 'MØDREKVOTE' | 'FEDREKVOTE';
    andreForelderKontoType: 'MØDREKVOTE' | 'FEDREKVOTE';
    førsteForelderPerioder: PeriodeDto_fpoversikt[];
    andreForelderPerioder: PeriodeDto_fpoversikt[];
}

const getForelderKonfig = (
    starterForelder: Forelder,
    mødrekvote: KontoDto | undefined,
    fedrekvote: KontoDto | undefined,
    morsPerioder: PeriodeDto_fpoversikt[],
    farsPerioder: PeriodeDto_fpoversikt[],
): ForelderKonfig => {
    const starterMor = starterForelder === 'MOR';
    return {
        førsteForelder: starterForelder,
        andreForelder: starterMor ? 'FAR_MEDMOR' : 'MOR',
        førsteForelderKvote: starterMor ? mødrekvote : fedrekvote,
        andreForelderKvote: starterMor ? fedrekvote : mødrekvote,
        førsteForelderKontoType: starterMor ? 'MØDREKVOTE' : 'FEDREKVOTE',
        andreForelderKontoType: starterMor ? 'FEDREKVOTE' : 'MØDREKVOTE',
        førsteForelderPerioder: starterMor ? morsPerioder : farsPerioder,
        andreForelderPerioder: starterMor ? farsPerioder : morsPerioder,
    };
};

// Forslagsmotoren kjenner ikke saken sin faktiske søker-/annenPart-fordeling – alle genererte
// periodar blir difor lagt på `.søker`, uavhengig av om dei gjeld MOR eller FAR_MEDMOR. Appane
// som forbrukar forslaget (planlegger/søknad) fordeler periodane til rett person ved å sjå på
// `periode.søker!.forelder`.
const lagPeriode = (
    forelder: Forelder,
    kontoType: 'MØDREKVOTE' | 'FEDREKVOTE' | 'FELLESPERIODE' | 'FORELDREPENGER_FØR_FØDSEL',
    fom: string,
    tom: string,
): PeriodeDto_fpoversikt => ({
    fom,
    tom,
    søker: {
        forelder,
        kontoType,
        flerbarnsdager: false,
    },
});

/**
 * Generates a suggested parental leave plan for delt uttak (shared parental leave).
 *
 * When `startdato` is not provided, it defaults to 15 uttaksdager before `famDato` so that the
 * standard foreldrepenger-før-fødsel period (3 weeks before birth) is included automatically.
 * When `startdato` is provided explicitly (e.g., the same day as `famDato`) the plan starts there
 * with no foreldrepenger-før-fødsel period.
 *
 * Returns et sett `PeriodeDto_fpoversikt` med dei føreslegne periodane for delt uttak, alle lagt
 * på `.søker` (sjå lagPeriode).
 */
export const deltUttak = ({
    famDato,
    tilgjengeligeStønadskvoter,
    fellesperiodeDagerFørsteForelder,
    starterForelder = 'MOR',
    startdato,
}: DeltUttakParams): PeriodeDto_fpoversikt[] => {
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

    const morsPerioder: PeriodeDto_fpoversikt[] = [];
    const farsPerioder: PeriodeDto_fpoversikt[] = [];
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

        morsPerioder.push(lagPeriode('MOR', 'FORELDREPENGER_FØR_FØDSEL', tidsperiode.fom, tidsperiode.tom));

        currentFomDate = Uttaksdagen.neste(tidsperiode.tom).getDato();
    }

    if (dagerMellomFamDatoOgStartdato > 15) {
        tidsperiode = getTidsperiodeString(Uttaksdagen.denne(currentFomDate).getDato(), dagerMedFellesperiodeFørFødsel);

        morsPerioder.push(lagPeriode('MOR', 'FELLESPERIODE', tidsperiode.fom, tidsperiode.tom));

        currentFomDate = Uttaksdagen.neste(tidsperiode.tom).getDato();

        tidsperiode = getTidsperiodeString(currentFomDate, 15);

        morsPerioder.push(lagPeriode('MOR', 'FORELDREPENGER_FØR_FØDSEL', tidsperiode.fom, tidsperiode.tom));

        currentFomDate = Uttaksdagen.denne(helgejustertFamDato).getDato();
    }

    const {
        førsteForelder,
        andreForelder,
        førsteForelderKvote,
        andreForelderKvote,
        førsteForelderKontoType,
        andreForelderKontoType,
        førsteForelderPerioder,
        andreForelderPerioder,
    } = getForelderKonfig(starterForelder, mødrekvote, fedrekvote, morsPerioder, farsPerioder);

    tidsperiode = getTidsperiodeString(currentFomDate, førsteForelderKvote ? førsteForelderKvote.dager : 0);

    førsteForelderPerioder.push(lagPeriode(førsteForelder, førsteForelderKontoType, tidsperiode.fom, tidsperiode.tom));

    currentFomDate = Uttaksdagen.neste(tidsperiode.tom).getDato();

    if (fellesperiodeDagerFørsteForelder !== 0) {
        tidsperiode = getTidsperiodeString(currentFomDate, fellesperiodeDagerFørsteForelder);

        førsteForelderPerioder.push(lagPeriode(førsteForelder, 'FELLESPERIODE', tidsperiode.fom, tidsperiode.tom));

        currentFomDate = Uttaksdagen.neste(tidsperiode.tom).getDato();
    }

    tidsperiode = getTidsperiodeString(currentFomDate, andreForelderKvote ? andreForelderKvote.dager : 0);

    andreForelderPerioder.push(lagPeriode(andreForelder, andreForelderKontoType, tidsperiode.fom, tidsperiode.tom));

    currentFomDate = Uttaksdagen.neste(tidsperiode.tom).getDato();

    if (fellesperiodeDagerAndreForelder !== 0) {
        tidsperiode = getTidsperiodeString(currentFomDate, fellesperiodeDagerAndreForelder);

        andreForelderPerioder.push(lagPeriode(andreForelder, 'FELLESPERIODE', tidsperiode.fom, tidsperiode.tom));
    }

    return [...morsPerioder, ...farsPerioder].sort(sorterUttakPerioder);
};
