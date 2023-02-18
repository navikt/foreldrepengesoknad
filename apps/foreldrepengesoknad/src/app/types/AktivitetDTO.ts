import { ArbeidsgiverInfo } from './ArbeidsgiverInfo';
import { UttakArbeidType } from './UttakArbeidType';

export interface AktivitetDTO {
    type: UttakArbeidType;
    arbeidsgiver?: ArbeidsgiverInfo;
}
