import { SaksperiodeDTO } from './SaksperiodeDTO';
import { UttakArbeidType } from './UttakArbeidType';

export interface Saksperiode extends Omit<SaksperiodeDTO, 'uttakArbeidType'> {
    uttakArbeidType: UttakArbeidType[];
    guid: string;
}
