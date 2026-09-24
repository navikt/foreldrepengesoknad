import { BrukerRolleSak_fpoversikt, PeriodeDto_fpoversikt } from '@navikt/fp-types';

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

// Denne blir brukt av listevisning som viser alle typar periodar. Éin PeriodeDto_fpoversikt
// dekker no eitt tidsintervall og kan innehalde søkjar sitt uttak, annan part sitt uttak og/eller
// annan part sitt EØS-uttak samtidig (jf. samtidig uttak / opphald / EØS – sjå Uttaksperioden).
export type Uttaksplanperiode = PeriodeDto_fpoversikt | TapteDagerHull | PerioderUtenUttakHull | FamiliehendelseDato;

// Denne blir brukt av kalendervisninga som kun viser tapte dagar
// (Kalender viser i tillegg familiehendelsesdato, men denne blir utleda i kalender-typen, mogleg ein bør endra på det)
export type UttaksplanperiodeMedKunTapteDager = PeriodeDto_fpoversikt | TapteDagerHull;

export const erPeriodeDto = (periode: Uttaksplanperiode): periode is PeriodeDto_fpoversikt => !('type' in periode);

export const erUttaksplanHull = (periode: Uttaksplanperiode): periode is TapteDagerHull | PerioderUtenUttakHull =>
    'type' in periode && (periode.type === 'TAPTE_DAGER' || periode.type === 'PERIODE_UTEN_UTTAK');

export const erTapteDagerHull = (periode: Uttaksplanperiode): periode is TapteDagerHull =>
    'type' in periode && periode.type === 'TAPTE_DAGER';

export const erPeriodeUtenUttakHull = (periode: Uttaksplanperiode): periode is PerioderUtenUttakHull =>
    'type' in periode && periode.type === 'PERIODE_UTEN_UTTAK';

export const erFamiliehendelseDato = (periode: Uttaksplanperiode): periode is FamiliehendelseDato =>
    'type' in periode && periode.type === 'FAMILIEHENDELSE';
