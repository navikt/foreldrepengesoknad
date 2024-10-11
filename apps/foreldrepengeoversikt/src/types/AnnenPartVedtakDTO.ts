import { SaksperiodeNy } from '@navikt/fp-types';

import { DekningsgradDTO } from './DekningsgradDTO';

export interface AnnenPartVedtakDTO {
    antallBarn?: number;
    dekningsgrad: DekningsgradDTO;
    perioder: SaksperiodeNy[];
    termindato?: string;
}
