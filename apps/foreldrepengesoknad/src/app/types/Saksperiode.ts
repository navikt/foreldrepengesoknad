import { Tidsperiode } from '@navikt/fp-common';
import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';
import { SaksperiodeDTO } from './SaksperiodeDTO';

export interface Saksperiode extends Omit<SaksperiodeDTO, 'fom' | 'tom' | 'oppholdÅrsak'> {
    guid: string;
    periode: Tidsperiode;
    gjelderAnnenPart: boolean;
    angittAvAnnenPart?: boolean;
    oppholdÅrsak?: OppholdÅrsakType;
}
