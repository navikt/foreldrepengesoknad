import { SvangerskapspengeSakDTO } from '@navikt/fp-types';

import { Ytelse } from './Ytelse';

export interface SvangerskapspengeSak extends SvangerskapspengeSakDTO {
    ytelse: Ytelse.SVANGERSKAPSPENGER;
}
