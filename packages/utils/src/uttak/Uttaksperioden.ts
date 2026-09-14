import { PeriodeDto_fpoversikt, UttakDto_fpoversikt } from '@navikt/fp-types';

import { Uttaksdagen } from './Uttaksdagen';

// Kun for funksjoner som kun sjekker på UttakDto_fpoversikt (éi part av eit periodeintervall)
// eller PeriodeDto_fpoversikt (heile intervallet). Validatorer med andre input kan legges i
// UttaksperiodeValidatorer.

export const Uttaksperioden = {
    erAvslåttPeriode(part: UttakDto_fpoversikt) {
        return part.resultat !== undefined && part.resultat.innvilget !== true;
    },

    erUttaksperiode(part: UttakDto_fpoversikt) {
        return !part.overføringÅrsak && !part.utsettelseÅrsak;
    },

    erOverføringsperiode(part: UttakDto_fpoversikt) {
        return !!part.overføringÅrsak;
    },

    // Opphold har ikkje lenger noko eige oppholdÅrsak-felt frå backend – det er strukturelt
    // ein periode der søkjar ikkje har uttak medan annan part har det. Årsaka til oppholdet er
    // då direkte annan part sin kontoType.
    erOppholdsperiode(periode: PeriodeDto_fpoversikt) {
        return !periode.søker && !!periode.annenPart;
    },

    erUtsettelsesperiode(part: UttakDto_fpoversikt) {
        return part.utsettelseÅrsak !== undefined && part.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER';
    },

    erSamtidigUttak(part: UttakDto_fpoversikt) {
        return part.samtidigUttak !== undefined;
    },

    erPrematuruker(part: UttakDto_fpoversikt) {
        return part.kontoType !== undefined && part.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER';
    },

    erFlerbarnsdager(part: UttakDto_fpoversikt) {
        return !!part.flerbarnsdager;
    },

    getAntallUttaksdager(periode: { fom: string; tom: string }) {
        return Uttaksdagen.denneEllerNeste(periode.fom).getUttaksdagerFremTilOgMedDato(periode.tom);
    },
};
