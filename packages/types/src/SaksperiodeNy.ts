import { Forelder } from '@navikt/fp-constants';

import { OverføringÅrsakType } from './OverføringÅrsakType';
import { PeriodeResultat } from './PeriodeResultat';
import { UtsettelseÅrsakType } from './UtsettelseÅrsakType';
import { Gradering_fpoversikt, KontoTypeUttak_fpoversikt, UttakOppholdÅrsak_fpoversikt } from './fpoversiktDtoGenerert';
import { MorsAktivitet } from './fpsoknadDtoGenerert';

export interface SaksperiodeNy {
    fom: string;
    tom: string;
    forelder?: Forelder;
    resultat?: PeriodeResultat;
    flerbarnsdager?: boolean;
    kontoType?: KontoTypeUttak_fpoversikt;
    gradering?: Gradering_fpoversikt;
    oppholdÅrsak?: UttakOppholdÅrsak_fpoversikt;
    utsettelseÅrsak?: UtsettelseÅrsakType;
    overføringÅrsak?: OverføringÅrsakType;
    samtidigUttak?: number;
    morsAktivitet?: MorsAktivitet;
    trekkdager?: number;
}
