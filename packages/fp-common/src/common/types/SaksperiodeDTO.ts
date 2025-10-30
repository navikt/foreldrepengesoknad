import {
    Gradering_fpoversikt,
    KontoTypeUttak_fpoversikt,
    MorsAktivitet_fpoversikt,
    UttakOppholdÅrsak_fpoversikt,
    UttakOverføringÅrsak_fpoversikt,
    UttakPeriodeResultat_fpoversikt,
    UttakUtsettelseÅrsak_fpoversikt,
} from '@navikt/fp-types';

export interface SaksperiodeDTO {
    fom: string;
    tom: string;
    resultat?: UttakPeriodeResultat_fpoversikt;
    flerbarnsdager?: boolean;
    kontoType?: KontoTypeUttak_fpoversikt;
    gradering?: Gradering_fpoversikt;
    oppholdÅrsak?: UttakOppholdÅrsak_fpoversikt;
    utsettelseÅrsak?: UttakUtsettelseÅrsak_fpoversikt;
    overføringÅrsak?: UttakOverføringÅrsak_fpoversikt;
    samtidigUttak?: number;
    morsAktivitet?: MorsAktivitet_fpoversikt;
}
