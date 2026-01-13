import {
    BrukerRolleSak_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';

export type TapteDagerHull = {
    type: 'TAPTE_DAGER';
    fom: string;
    tom: string;
    forelder: BrukerRolleSak_fpoversikt;
};

export type PerioderUtenUttakHull = {
    type: 'PERIODE_UTEN_UTTAK';
    fom: string;
    tom: string;
};

export type FamiliehendelseDato = {
    type: 'FAMILIEHENDELSE';
    fom: string;
    tom: string;
};

// Denne blir brukt av listevisning som viser alle typar periodar
export type Uttaksplanperiode =
    | UttakPeriode_fpoversikt
    | UttakPeriodeAnnenpartEøs_fpoversikt
    | TapteDagerHull
    | PerioderUtenUttakHull
    | FamiliehendelseDato;

// Denne blir brukt av kalendervisninga som kun viser tapte dagar
// (Kalender viser i tillegg familiehendelsesdato, men denne blir utleda i kalender-typen, mogleg ein bør endra på det)
export type UttaksplanperiodeMedKunTapteDager =
    | UttakPeriode_fpoversikt
    | UttakPeriodeAnnenpartEøs_fpoversikt
    | TapteDagerHull;

export const erVanligUttakPeriode = (periode: Uttaksplanperiode): periode is UttakPeriode_fpoversikt =>
    !erEøsUttakPeriode(periode) && !erUttaksplanHull(periode) && !erFamiliehendelseDato(periode);

export const erEøsUttakPeriode = (periode: Uttaksplanperiode): periode is UttakPeriodeAnnenpartEøs_fpoversikt =>
    'trekkdager' in periode;

export const erUttaksplanHull = (periode: Uttaksplanperiode): periode is TapteDagerHull | PerioderUtenUttakHull =>
    'type' in periode && (periode.type === 'TAPTE_DAGER' || periode.type === 'PERIODE_UTEN_UTTAK');

export const erTapteDagerHull = (periode: Uttaksplanperiode): periode is TapteDagerHull =>
    'type' in periode && periode.type === 'TAPTE_DAGER';

export const erPeriodeUtenUttakHull = (periode: Uttaksplanperiode): periode is PerioderUtenUttakHull =>
    'type' in periode && periode.type === 'PERIODE_UTEN_UTTAK';

export const erFamiliehendelseDato = (periode: Uttaksplanperiode): periode is FamiliehendelseDato =>
    'type' in periode && periode.type === 'FAMILIEHENDELSE';
