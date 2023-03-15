import { Gradering } from './Gradering';
import { PeriodeResultat } from './PeriodeResultat';
import { StønadskontoType } from './StønadskontoType';
import { OppholdÅrsakType } from './OppholdÅrsakType';
import { OverføringÅrsakType } from './OverføringÅrsakType';
import { UtsettelseÅrsakType } from './UtsettelseÅrsakType';
import { MorsAktivitet } from './MorsAktivitet';

export interface Periode {
    fom: string;
    tom: string;
    resultat: PeriodeResultat;
    kontoType?: StønadskontoType;
    flerbarnsdager?: boolean;
    gradering?: Gradering;
    oppholdÅrsak?: OppholdÅrsakType;
    utsettelseÅrsak?: UtsettelseÅrsakType;
    overføringÅrsak?: OverføringÅrsakType;
    samtidigUttak?: number;
    morsAktivitet?: MorsAktivitet;
    angittAvAnnenPart?: boolean;
}

export enum PeriodeHullType {
    PERIODE_UTEN_UTTAK = 'Periode uten uttak',
    TAPTE_DAGER = 'Tapte dager',
}
