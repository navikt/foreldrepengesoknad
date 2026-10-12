import { UttakDto, UttakPeriodeDto } from '@navikt/fp-types';

import { Uttaksdagen } from './Uttaksdagen';

// Kun for funksjoner som kun sjekker på UttakDto (éi part av eit periodeintervall)
// eller UttakPeriodeDto (heile intervallet). Validatorer med andre input kan legges i
// UttaksperiodeValidatorer.

export const Uttaksperioden = {
    erAvslåttPeriode(part: UttakDto) {
        return part.resultat !== undefined && part.resultat.innvilget !== true;
    },

    erUttaksperiode(part: UttakDto) {
        return !part.overføringÅrsak && !part.utsettelseÅrsak;
    },

    erOverføringsperiode(part: UttakDto) {
        return !!part.overføringÅrsak;
    },

    // Opphold har ikkje lenger noko eige oppholdÅrsak-felt frå backend – det er strukturelt
    // ein periode der søkjar ikkje har uttak medan annan part har det. Årsaka til oppholdet er
    // då direkte annan part sin kontoType.
    erOppholdsperiode(periode: UttakPeriodeDto) {
        return !periode.søker && !!periode.annenPart;
    },

    erUtsettelsesperiode(part: UttakDto) {
        return part.utsettelseÅrsak !== undefined && part.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER';
    },

    erSamtidigUttak(part: UttakDto) {
        return part.samtidigUttak !== undefined;
    },

    erPrematuruker(part: UttakDto) {
        return part.kontoType !== undefined && part.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER';
    },

    erFlerbarnsdager(part: UttakDto) {
        return !!part.flerbarnsdager;
    },

    getAntallUttaksdager(periode: { fom: string; tom: string }) {
        return Uttaksdagen.denneEllerNeste(periode.fom).getUttaksdagerFremTilOgMedDato(periode.tom);
    },
};
