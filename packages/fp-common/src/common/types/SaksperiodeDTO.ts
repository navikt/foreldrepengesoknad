import { MorsAktivitet } from './MorsAktivitet';
import { StønadskontoType } from './StønadskontoType';
import { OppholdÅrsakTypeDTO } from './OppholdÅrsakTypeDTO';
import { OverføringÅrsakType } from './OverføringÅrsakType';
import { UtsettelseÅrsakTypeDTO } from './UtsettelseÅrsakTypeDTO';
import { PeriodeResultatDTO } from './PeriodeResultatDTO';
import { GraderingDTO } from './GraderingDTO';

export interface SaksperiodeDTO {
    fom: string;
    tom: string;
    resultat: PeriodeResultatDTO;
    flerbarnsdager?: boolean;
    kontoType?: StønadskontoType;
    gradering?: GraderingDTO;
    oppholdÅrsak?: OppholdÅrsakTypeDTO;
    utsettelseÅrsak?: UtsettelseÅrsakTypeDTO;
    overføringÅrsak?: OverføringÅrsakType;
    samtidigUttak?: number;
    morsAktivitet?: MorsAktivitet;
}
