import { Forelder } from '@navikt/fp-constants';

import { MorsAktivitet } from './MorsAktivitet';
import { OverføringÅrsakType } from './OverføringÅrsakType';
import { PeriodeResultat } from './PeriodeResultat';
import {
    Gradering_fpoversikt,
    KontoTypeUttak_fpoversikt,
    UttakOppholdÅrsak_fpoversikt,
    UttakUtsettelseÅrsak_fpoversikt,
} from './fpoversiktDtoGenerert';

export interface SaksperiodeNy {
    fom: string;
    tom: string;
    forelder?: Forelder;
    resultat?: PeriodeResultat;
    flerbarnsdager?: boolean;
    kontoType?: KontoTypeUttak_fpoversikt;
    gradering?: Gradering_fpoversikt;
    oppholdÅrsak?: UttakOppholdÅrsak_fpoversikt;
    utsettelseÅrsak?: UttakUtsettelseÅrsak_fpoversikt;
    overføringÅrsak?: OverføringÅrsakType;
    samtidigUttak?: number;
    morsAktivitet?: MorsAktivitet;
    trekkdager?: number;
}
