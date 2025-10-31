import { Gradering, KontoTypeUttak_fpoversikt, UttakUtsettelseÅrsak_fpoversikt } from '@navikt/fp-types';

import { MorsAktivitet } from './MorsAktivitet';
import { OppholdÅrsakTypeDTO } from './OppholdÅrsakTypeDTO';
import { OverføringÅrsakType } from './OverføringÅrsakType';
import { PeriodeResultatDTO } from './PeriodeResultatDTO';

export interface SaksperiodeDTO {
    fom: string;
    tom: string;
    resultat?: PeriodeResultatDTO;
    flerbarnsdager?: boolean;
    kontoType?: KontoTypeUttak_fpoversikt;
    gradering?: Gradering;
    oppholdÅrsak?: OppholdÅrsakTypeDTO;
    utsettelseÅrsak?: UttakUtsettelseÅrsak_fpoversikt;
    overføringÅrsak?: OverføringÅrsakType;
    samtidigUttak?: number;
    morsAktivitet?: MorsAktivitet;
}
