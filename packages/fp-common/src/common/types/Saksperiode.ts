import { UttakOppholdÅrsak_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { Tidsperiode } from './Tidsperiode';

export interface Saksperiode extends Omit<UttakPeriode_fpoversikt, 'fom' | 'tom' | 'oppholdÅrsak'> {
    guid: string;
    periode: Tidsperiode;
    gjelderAnnenPart: boolean;
    angittAvAnnenPart?: boolean;
    oppholdÅrsak?: UttakOppholdÅrsak_fpoversikt;
}
