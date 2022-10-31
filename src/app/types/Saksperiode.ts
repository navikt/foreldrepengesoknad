import { Tidsperiode } from '@navikt/fp-common';
import { SaksperiodeDTO, SaksperiodeDTOV2 } from './SaksperiodeDTO';
import { UttakArbeidType } from './UttakArbeidType';

export interface Saksperiode extends Omit<SaksperiodeDTO, 'uttakArbeidType'> {
    uttakArbeidType: UttakArbeidType[];
    guid: string;
}

export interface SaksperiodeV2 extends Omit<SaksperiodeDTOV2, 'fom' | 'tom'> {
    guid: string;
    periode: Tidsperiode;
    gjelderAnnenPart: boolean;
    angittAvAnnenPart?: boolean; //TODO: Dette kommer til å måtte mappes til SaksperiodeDTO eller SaksperiodeV2
}
