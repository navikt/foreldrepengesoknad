import { Tidsperiode } from '@navikt/fp-common';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';
import { OverføringÅrsakType } from 'uttaksplan/types/OverføringÅrsakType';
// import { PeriodeResultatType } from 'uttaksplan/types/PeriodeResultatType';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { ArbeidsgiverInfo } from './ArbeidsgiverInfo';
import { UtsettelseÅrsakTypeDTOV2, UtsettelseÅrsakTypeDTO } from './UtsettelseÅrsakTypeDTO';
import { UttakArbeidType } from './UttakArbeidType';
import { PeriodeResultatÅrsakV2 } from 'uttaksplan/types/PeriodeResultatÅrsak';

export interface SaksperiodeDTO {
    angittAvAnnenPart?: boolean;
    arbeidsgiverInfo: ArbeidsgiverInfo;
    arbeidstidprosent: number;
    flerbarnsdager: boolean;
    gjelderAnnenPart: boolean;
    graderingInnvilget: boolean;
    morsAktivitet?: MorsAktivitet;
    oppholdAarsak: OppholdÅrsakType;
    overfoeringAarsak?: OverføringÅrsakType;
    periode: Tidsperiode;
    // periodeResultatType: PeriodeResultatType;
    samtidigUttak: boolean;
    samtidigUttaksprosent?: number;
    stønadskontotype: StønadskontoType;
    trekkDager: number;
    utbetalingsprosent: number;
    uttakArbeidType: string;
    utsettelsePeriodeType?: UtsettelseÅrsakTypeDTO;
    periodeResultatÅrsak: string;
}

export interface PeriodeResultatDTOV2 {
    innvilget: boolean;
    trekkerMinsterett: boolean;
    trekkerDager: boolean;
    årsak: PeriodeResultatÅrsakV2;
}

export interface AktivitetDTOV2 {
    type: UttakArbeidType;
    arbeidsgiver?: ArbeidsgiverInfo;
}

export interface GraderingDTOV2 {
    arbeidstidprosent: number;
    aktivitet: AktivitetDTOV2;
}
export interface SaksperiodeDTOV2 {
    fom: string;
    tom: string;
    resultat: PeriodeResultatDTOV2;
    kontoType: StønadskontoType;
    flerbarnsdager: boolean;
    gradering?: GraderingDTOV2;
    oppholdÅrsak?: OppholdÅrsakType;
    utsettelseÅrsak?: UtsettelseÅrsakTypeDTOV2;
    overføringÅrsak?: OverføringÅrsakType;
    samtidigUttak?: number;
    morsAktivitet?: MorsAktivitet;
}
