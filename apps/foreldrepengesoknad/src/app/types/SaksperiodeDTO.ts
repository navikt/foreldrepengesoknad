import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { OverføringÅrsakType } from 'uttaksplan/types/OverføringÅrsakType';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { GraderingDTO } from './GraderingDTO';
import { PeriodeResultatDTO } from './PeriodeResultatDTO';
import { UtsettelseÅrsakTypeDTO } from './UtsettelseÅrsakTypeDTO';
import { OppholdÅrsakTypeDTO } from './OppholdÅrsakTypeDTO';

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
