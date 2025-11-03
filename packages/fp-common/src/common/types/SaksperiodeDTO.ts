import {
    Gradering_fpoversikt,
    KontoTypeUttak_fpoversikt,
    UttakOppholdÅrsak_fpoversikt,
    UttakUtsettelseÅrsak_fpoversikt,
} from '@navikt/fp-types';

import { MorsAktivitet } from './MorsAktivitet';
import { OverføringÅrsakType } from './OverføringÅrsakType';
import { PeriodeResultatDTO } from './PeriodeResultatDTO';

export interface SaksperiodeDTO {
    fom: string;
    tom: string;
    resultat?: PeriodeResultatDTO;
    flerbarnsdager?: boolean;
    kontoType?: KontoTypeUttak_fpoversikt;
    gradering?: Gradering_fpoversikt;
    oppholdÅrsak?: UttakOppholdÅrsak_fpoversikt;
    utsettelseÅrsak?: UttakUtsettelseÅrsak_fpoversikt;
    overføringÅrsak?: OverføringÅrsakType;
    samtidigUttak?: number;
    morsAktivitet?: MorsAktivitet;
}
