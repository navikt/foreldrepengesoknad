import { PeriodeDto_fpoversikt, UttakDto_fpoversikt } from '@navikt/fp-types';

import { Uttaksdagen } from './Uttaksdagen';

// Kun for funksjoner som kun sjekker på UttakDto_fpoversikt (éi side av eit periodeintervall)
// eller PeriodeDto_fpoversikt (heile intervallet). Validatorer med andre input kan legges i
// UttaksperiodeValidatorer.

export const Uttaksperioden = {
    erAvslåttPeriode(side: UttakDto_fpoversikt) {
        return side.resultat !== undefined && side.resultat.innvilget !== true;
    },

    erUttaksperiode(side: UttakDto_fpoversikt) {
        return !side.overføringÅrsak && !side.utsettelseÅrsak;
    },

    erOverføringsperiode(side: UttakDto_fpoversikt) {
        return !!side.overføringÅrsak;
    },

    // Opphold har ikkje lenger noko eige oppholdÅrsak-felt frå backend – det er strukturelt
    // ein periode der søkjar ikkje har uttak medan annan part har det. Årsaka til oppholdet er
    // då direkte annan part sin kontoType.
    erOppholdsperiode(periode: PeriodeDto_fpoversikt) {
        return !periode.søker && !!periode.annenPart;
    },

    erUtsettelsesperiode(side: UttakDto_fpoversikt) {
        return side.utsettelseÅrsak !== undefined && side.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER';
    },

    erSamtidigUttak(side: UttakDto_fpoversikt) {
        return side.samtidigUttak !== undefined;
    },

    erPrematuruker(side: UttakDto_fpoversikt) {
        return side.kontoType !== undefined && side.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER';
    },

    erFlerbarnsdager(side: UttakDto_fpoversikt) {
        return !!side.flerbarnsdager;
    },

    getAntallUttaksdager(periode: { fom: string; tom: string }) {
        return Uttaksdagen.denneEllerNeste(periode.fom).getUttaksdagerFremTilOgMedDato(periode.tom);
    },
};
