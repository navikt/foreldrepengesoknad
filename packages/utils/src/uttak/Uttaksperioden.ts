import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { Uttaksdagen } from './Uttaksdagen';

type UttakPeriode = UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt;

// Kun for funksjoner som kun sjekker på UttakPeriode. Validatorer med andre input kan legges i UttaksperiodeValidatorer

export const Uttaksperioden = {
    erEøsPeriode(periode: UttakPeriode): periode is UttakPeriodeAnnenpartEøs_fpoversikt {
        return 'trekkdager' in periode;
    },

    erIkkeEøsPeriode(periode: UttakPeriode): periode is UttakPeriode_fpoversikt {
        return !Uttaksperioden.erEøsPeriode(periode) && 'flerbarnsdager' in periode && 'forelder' in periode;
    },

    erAvslåttPeriode(periode: UttakPeriode) {
        return 'resultat' in periode && periode.resultat && periode.resultat.innvilget !== true;
    },

    erUttaksperiode(periode: UttakPeriode) {
        if (!Uttaksperioden.erIkkeEøsPeriode(periode)) {
            return false;
        }

        return !periode.oppholdÅrsak && !periode.overføringÅrsak && !periode.utsettelseÅrsak;
    },

    erOverføringsperiode(periode: UttakPeriode) {
        return Uttaksperioden.erIkkeEøsPeriode(periode) && !!periode.overføringÅrsak;
    },

    erOppholdsperiode(periode: UttakPeriode) {
        return Uttaksperioden.erIkkeEøsPeriode(periode) && !!periode.oppholdÅrsak;
    },

    erUtsettelsesperiode(periode: UttakPeriode) {
        return (
            Uttaksperioden.erIkkeEøsPeriode(periode) &&
            periode.utsettelseÅrsak !== undefined &&
            periode.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER'
        );
    },

    erSamtidigUttak(periode: UttakPeriode) {
        return Uttaksperioden.erIkkeEøsPeriode(periode) && !!periode.samtidigUttak;
    },

    erPrematuruker(periode: UttakPeriode) {
        return (
            Uttaksperioden.erIkkeEøsPeriode(periode) &&
            periode.kontoType !== undefined &&
            periode.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER'
        );
    },

    erFlerbarnsdager(periode: UttakPeriode) {
        return Uttaksperioden.erIkkeEøsPeriode(periode) && !!periode.flerbarnsdager;
    },

    getAntallUttaksdager(periode: UttakPeriode) {
        return Uttaksdagen.denneEllerNeste(periode.fom).getUttaksdagerFremTilOgMedDato(periode.tom);
    },
};
