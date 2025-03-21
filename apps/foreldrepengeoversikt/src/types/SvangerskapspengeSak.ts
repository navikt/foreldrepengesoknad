import { SvangerskapspengeSakDTO, Ytelse } from '@navikt/fp-types';

export interface SvangerskapspengeSak extends SvangerskapspengeSakDTO {
    ytelse: Ytelse.SVANGERSKAPSPENGER;
}
