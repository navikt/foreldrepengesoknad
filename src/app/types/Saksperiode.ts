import { Tidsperiode } from '@navikt/fp-common';
import { SaksperiodeDTO } from './SaksperiodeDTO';

export interface Saksperiode extends Omit<SaksperiodeDTO, 'fom' | 'tom'> {
    guid: string;
    periode: Tidsperiode;
    gjelderAnnenPart: boolean;
    angittAvAnnenPart?: boolean;
}
