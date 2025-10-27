import { Forelder } from '@navikt/fp-constants';

import { Gradering } from './Gradering';
import { MorsAktivitet } from './MorsAktivitet';
import { OppholdÅrsakType } from './OppholdÅrsakType';
import { OverføringÅrsakType } from './OverføringÅrsakType';
import { PeriodeResultat } from './PeriodeResultat';
import { UtsettelseÅrsakType } from './UtsettelseÅrsakType';
import { KontoTypeUttak } from './apiDtoGenerert';

export interface SaksperiodeNy {
    fom: string;
    tom: string;
    forelder?: Forelder;
    resultat?: PeriodeResultat;
    flerbarnsdager?: boolean;
    kontoType?: KontoTypeUttak;
    gradering?: Gradering;
    oppholdÅrsak?: OppholdÅrsakType;
    utsettelseÅrsak?: UtsettelseÅrsakType;
    overføringÅrsak?: OverføringÅrsakType;
    samtidigUttak?: number;
    morsAktivitet?: MorsAktivitet;
    trekkdager?: number;
}
