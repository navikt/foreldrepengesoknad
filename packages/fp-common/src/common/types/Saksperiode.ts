import { Oppholdsårsak, Tidsperiode, UttakPeriode_fpoversikt } from '@navikt/fp-types';

export interface Saksperiode extends Omit<UttakPeriode_fpoversikt, 'fom' | 'tom' | 'oppholdÅrsak'> {
    guid: string;
    periode: Tidsperiode;
    gjelderAnnenPart: boolean;
    angittAvAnnenPart?: boolean;
    oppholdÅrsak?: Oppholdsårsak;
}
