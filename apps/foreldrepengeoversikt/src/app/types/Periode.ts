import { StønadskontoType } from '@navikt/fp-constants';

import { Gradering } from './Gradering';
import { MorsAktivitet } from './MorsAktivitet';
import { OppholdÅrsakType } from './OppholdÅrsakType';
import { OverføringÅrsakType } from './OverføringÅrsakType';
import { PeriodeResultat } from './PeriodeResultat';
import { UtsettelseÅrsakType } from './UtsettelseÅrsakType';

export interface Periode {
    id: string;
    fom: string;
    tom: string;
    resultat?: PeriodeResultat;
    kontoType?: StønadskontoType;
    flerbarnsdager?: boolean;
    gradering?: Gradering;
    oppholdÅrsak?: OppholdÅrsakType;
    utsettelseÅrsak?: UtsettelseÅrsakType;
    overføringÅrsak?: OverføringÅrsakType;
    samtidigUttak?: number;
    morsAktivitet?: MorsAktivitet;
    angittAvAnnenPart?: boolean;
    gjelderAnnenPart?: boolean;
    visIPlan?: boolean;
}

export enum PeriodeHullType {
    PERIODE_UTEN_UTTAK = 'Periode uten uttak',
    TAPTE_DAGER = 'Tapte dager',
}
