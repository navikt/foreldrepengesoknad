import { PeriodeResultat } from './PeriodeResultat';
import {
    BrukerRolleSak_fpoversikt,
    Gradering_fpoversikt,
    KontoTypeUttak_fpoversikt,
    MorsAktivitet_fpoversikt,
    UttakOppholdÅrsak_fpoversikt,
    UttakOverføringÅrsak_fpoversikt,
    UttakUtsettelseÅrsak_fpoversikt,
} from './fpoversiktDtoGenerert';

export interface SaksperiodeNy {
    fom: string;
    tom: string;
    forelder?: BrukerRolleSak_fpoversikt;
    resultat?: PeriodeResultat;
    flerbarnsdager?: boolean;
    kontoType?: KontoTypeUttak_fpoversikt;
    gradering?: Gradering_fpoversikt;
    oppholdÅrsak?: UttakOppholdÅrsak_fpoversikt;
    utsettelseÅrsak?: UttakUtsettelseÅrsak_fpoversikt;
    overføringÅrsak?: UttakOverføringÅrsak_fpoversikt;
    samtidigUttak?: number;
    morsAktivitet?: MorsAktivitet_fpoversikt;
    trekkdager?: number;
}
