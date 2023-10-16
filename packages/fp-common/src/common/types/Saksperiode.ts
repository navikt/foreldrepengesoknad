import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';
import { SaksperiodeDTO } from './SaksperiodeDTO';
import { Tidsperiode } from './Tidsperiode';

export interface Saksperiode extends Omit<SaksperiodeDTO, 'fom' | 'tom' | 'oppholdÅrsak'> {
    guid: string;
    periode: Tidsperiode;
    gjelderAnnenPart: boolean;
    angittAvAnnenPart?: boolean;
    oppholdÅrsak?: OppholdÅrsakType;
}
