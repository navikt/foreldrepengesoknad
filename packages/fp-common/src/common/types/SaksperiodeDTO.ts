import { MorsAktivitet } from './MorsAktivitet';
import { StønadskontoType } from './StønadskontoType';
import { OppholdÅrsakTypeDTO } from './OppholdÅrsakTypeDTO';
import { OverføringÅrsakType } from './OverføringÅrsakType';
import { UtsettelseÅrsakTypeDTO } from './UtsettelseÅrsakTypeDTO';
import { PeriodeResultatDTO } from './PeriodeResultatDTO';
import { Gradering } from '@navikt/fp-types';

export interface SaksperiodeDTO {
    fom: string;
    tom: string;
    resultat: PeriodeResultatDTO;
    flerbarnsdager?: boolean;
    kontoType?: StønadskontoType;
    gradering?: Gradering;
    oppholdÅrsak?: OppholdÅrsakTypeDTO;
    utsettelseÅrsak?: UtsettelseÅrsakTypeDTO;
    overføringÅrsak?: OverføringÅrsakType;
    samtidigUttak?: number;
    morsAktivitet?: MorsAktivitet;
}
