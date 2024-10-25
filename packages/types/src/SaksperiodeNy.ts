import { Forelder, StønadskontoType } from '@navikt/fp-constants';

import { Gradering } from './Gradering';
import { MorsAktivitet } from './MorsAktivitet';
import { OppholdÅrsakType } from './OppholdÅrsakType';
import { OverføringÅrsakType } from './OverføringÅrsakType';
import { PeriodeResultat } from './PeriodeResultat';
import { UtsettelseÅrsakType } from './UtsettelseÅrsakType';

export interface SaksperiodeNy {
    fom: string;
    tom: string;
    resultat?: PeriodeResultat;
    flerbarnsdager?: boolean;
    kontoType?: StønadskontoType;
    gradering?: Gradering;
    oppholdÅrsak?: OppholdÅrsakType;
    utsettelseÅrsak?: UtsettelseÅrsakType;
    overføringÅrsak?: OverføringÅrsakType;
    samtidigUttak?: number;
    morsAktivitet?: MorsAktivitet;
    forelder: Forelder;
}
