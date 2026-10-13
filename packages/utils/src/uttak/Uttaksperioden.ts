import { UttakDto, UttakPeriodeDto } from '@navikt/fp-types';

import { Uttaksdagen } from './Uttaksdagen';

// Kun for funksjoner som kun sjekker på UttakDto (éi part av eit periodeintervall)
// eller UttakPeriodeDto (heile intervallet). Validatorer med andre input kan legges i
// UttaksperiodeValidatorer.

export const Uttaksperioden = {
    erAvslåttPeriode(uttak: UttakDto) {
        return uttak.resultat !== undefined && uttak.resultat.innvilget !== true;
    },

    erUttaksperiode(uttak: UttakDto) {
        return !uttak.overføringÅrsak && !uttak.utsettelseÅrsak;
    },

    erOverføringsperiode(uttak: UttakDto) {
        return !!uttak.overføringÅrsak;
    },

    erOppholdsperiode(periode: UttakPeriodeDto) {
        return !periode.søker && !!periode.annenPart;
    },

    erUtsettelsesperiode(uttak: UttakDto) {
        return uttak.utsettelseÅrsak !== undefined && uttak.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER';
    },

    erSamtidigUttak(uttak: UttakDto) {
        return uttak.samtidigUttak !== undefined;
    },

    erPrematuruker(uttak: UttakDto) {
        return uttak.kontoType !== undefined && uttak.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER';
    },

    erFlerbarnsdager(uttak: UttakDto) {
        return !!uttak.flerbarnsdager;
    },

    getAntallUttaksdager(periode: { fom: string; tom: string }) {
        return Uttaksdagen.denneEllerNeste(periode.fom).getUttaksdagerFremTilOgMedDato(periode.tom);
    },
};
