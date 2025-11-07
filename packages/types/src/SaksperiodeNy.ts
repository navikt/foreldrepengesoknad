import { KontoTypeUttak } from './fpgrunndataDtoGenerert';
import {
    BrukerRolleSak_fpoversikt,
    Gradering_fpoversikt,
    MorsAktivitet_fpoversikt,
    UttakOppholdÅrsak_fpoversikt,
    UttakOverføringÅrsak_fpoversikt,
    UttakPeriodeResultat_fpoversikt,
    UttakUtsettelseÅrsak_fpoversikt,
} from './fpoversiktDtoGenerert';

export interface SaksperiodeNy {
    fom: string;
    tom: string;
    forelder?: BrukerRolleSak_fpoversikt;
    resultat?: UttakPeriodeResultat_fpoversikt;
    flerbarnsdager?: boolean;
    /**
     * Denne er litt upresis når det kommer til AKTIVIETETSFRI_KVOTE.
     * I planlegger så brukes kontotype fra fpgrunndata. Da kan den inneholde "AKTIVIETETSFRI_KVOTE"
     * Men når perioden kommer fra søknad eller vedtak vil ikke AKTIVIETETSFRI_KVOTE finnes.
     * I de tilfellene er det kontoType="FORELDREPENGER" + morsAktivitet="IKKE_OPPGITT" som tilsier at det går den aktivitetsfri kvoten.
     */
    kontoType?: KontoTypeUttak;
    gradering?: Gradering_fpoversikt;
    oppholdÅrsak?: UttakOppholdÅrsak_fpoversikt;
    utsettelseÅrsak?: UttakUtsettelseÅrsak_fpoversikt;
    overføringÅrsak?: UttakOverføringÅrsak_fpoversikt;
    samtidigUttak?: number;
    morsAktivitet?: MorsAktivitet_fpoversikt;
    trekkdager?: number;
}
