import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';
import { OverføringÅrsakType } from 'uttaksplan/types/OverføringÅrsakType';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { GraderingDTO } from './GraderingDTO';
import { PeriodeResultatDTO } from './PeriodeResultatDTO';
import { UtsettelseÅrsakTypeDTO } from './UtsettelseÅrsakTypeDTO';

export interface SaksperiodeDTO {
    fom: string;
    tom: string;
    resultat: PeriodeResultatDTO;
    kontoType: StønadskontoType;
    flerbarnsdager: boolean;
    gradering?: GraderingDTO;
    oppholdÅrsak?: OppholdÅrsakType;
    utsettelseÅrsak?: UtsettelseÅrsakTypeDTO;
    overføringÅrsak?: OverføringÅrsakType;
    samtidigUttak?: number;
    morsAktivitet?: MorsAktivitet;
}
