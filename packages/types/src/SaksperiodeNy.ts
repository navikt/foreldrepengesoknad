import { Forelder } from '@navikt/fp-constants';

import { Gradering } from './Gradering';
import { MorsAktivitet } from './MorsAktivitet';
import { OppholdÅrsakType } from './OppholdÅrsakType';
import { OverføringÅrsakType } from './OverføringÅrsakType';
import { PeriodeResultat } from './PeriodeResultat';
import { KontoTypeUttak_fpoversikt, UttakUtsettelseÅrsak_fpoversikt } from './fpoversiktDtoGenerert';

export interface SaksperiodeNy {
    fom: string;
    tom: string;
    forelder?: Forelder;
    resultat?: PeriodeResultat;
    flerbarnsdager?: boolean;
    kontoType?: KontoTypeUttak_fpoversikt;
    gradering?: Gradering;
    oppholdÅrsak?: OppholdÅrsakType;
    utsettelseÅrsak?: UttakUtsettelseÅrsak_fpoversikt;
    overføringÅrsak?: OverføringÅrsakType;
    samtidigUttak?: number;
    morsAktivitet?: MorsAktivitet;
    trekkdager?: number;
}
