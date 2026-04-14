import dayjs from 'dayjs';

import { KontoDto, Tidsperiode, UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { TidsperiodenString, UttaksdagenString, erUttaksdag } from '@navikt/fp-utils';

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

interface DeltUttakParams {
    famDato: string;
    tilgjengeligeStønadskontoer: KontoDto[];
    fellesperiodeDagerMor: number | undefined;
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
 * Returns a `PlanForslag` with `søker1` containing mor's periods and `søker2` containing
 * far/medmor's periods.
 */
export const deltUttak = ({
    famDato,
    tilgjengeligeStønadskontoer,
    fellesperiodeDagerMor,
    startdato,
}: DeltUttakParams): UttakPeriode_fpoversikt[] => {
    if (fellesperiodeDagerMor === undefined) {
        return [];
    }

    const helgejustertFamDato = UttaksdagenString.denneEllerNeste(famDato).getDato();

    const foreldrepengerFørFødsel = tilgjengeligeStønadskontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');
    const mødrekvote = tilgjengeligeStønadskontoer.find((k) => k.konto === 'MØDREKVOTE');
    const fedrekvote = tilgjengeligeStønadskontoer.find((k) => k.konto === 'FEDREKVOTE');
    const fellesperiode = tilgjengeligeStønadskontoer.find((k) => k.konto === 'FELLESPERIODE');

    // When no startdato is given and FPFF is available, default to 15 uttaksdager before famDato
    // so that the standard foreldrepenger-før-fødsel period is included automatically.
    // For adoption (no FPFF in kontoer) or other cases, start directly at famDato.
    const effectiveStartdato =
        startdato ??
        (foreldrepengerFørFødsel
            ? UttaksdagenString.denne(helgejustertFamDato).getDatoAntallUttaksdagerTidligere(15)
            : helgejustertFamDato);

    const dagerMellomFamDatoOgStartdato =
        UttaksdagenString.denne(effectiveStartdato).getUttaksdagerFremTilDato(helgejustertFamDato);
    const dagerMedFellesperiodeFørFødsel = dagerMellomFamDatoOgStartdato > 15 ? dagerMellomFamDatoOgStartdato - 15 : 0;

    const fellesperiodeDagerFarMedmor = Math.max(
        0,
        (fellesperiode?.dager ?? 0) - dagerMedFellesperiodeFørFødsel - fellesperiodeDagerMor,
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
            UttaksdagenString.denne(currentFomDate).getDato(),
            dagerMedForeldrepengerFørFødsel,
        );

        morsPerioder.push({
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

        morsPerioder.push({
            forelder: 'MOR',
            kontoType: 'FELLESPERIODE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        });

        currentFomDate = UttaksdagenString.neste(tidsperiode.tom).getDato();

        tidsperiode = getTidsperiodeString(currentFomDate, 15);

        morsPerioder.push({
            forelder: 'MOR',
            kontoType: 'FORELDREPENGER_FØR_FØDSEL',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        });

        currentFomDate = UttaksdagenString.denne(helgejustertFamDato).getDato();
    }

    tidsperiode = getTidsperiodeString(currentFomDate, mødrekvote ? mødrekvote.dager : 0);

    morsPerioder.push({
        forelder: 'MOR',
        kontoType: 'MØDREKVOTE',
        fom: tidsperiode.fom,
        tom: tidsperiode.tom,
        flerbarnsdager: false,
    });

    currentFomDate = UttaksdagenString.neste(tidsperiode.tom).getDato();

    if (fellesperiodeDagerMor !== 0) {
        tidsperiode = getTidsperiodeString(currentFomDate, fellesperiodeDagerMor);

        morsPerioder.push({
            forelder: 'MOR',
            kontoType: 'FELLESPERIODE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        });

        currentFomDate = UttaksdagenString.neste(tidsperiode.tom).getDato();
    }

    tidsperiode = getTidsperiodeString(currentFomDate, fedrekvote ? fedrekvote.dager : 0);

    farsPerioder.push({
        forelder: 'FAR_MEDMOR',
        kontoType: 'FEDREKVOTE',
        fom: tidsperiode.fom,
        tom: tidsperiode.tom,
        flerbarnsdager: false,
    });

    currentFomDate = UttaksdagenString.neste(tidsperiode.tom).getDato();

    if (fellesperiodeDagerFarMedmor !== 0) {
        tidsperiode = getTidsperiodeString(currentFomDate, fellesperiodeDagerFarMedmor);

        farsPerioder.push({
            forelder: 'FAR_MEDMOR',
            kontoType: 'FELLESPERIODE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        });
    }

    return [...morsPerioder, ...farsPerioder].sort(sorterPerioder);
};
