import { ArbeidsgiverInfo } from './ArbeidsgiverInfo';
import { UttakArbeidType } from './UttakArbeidType';

export interface Aktivitet {
    type: UttakArbeidType;
    arbeidsgiver?: ArbeidsgiverInfo;
}
