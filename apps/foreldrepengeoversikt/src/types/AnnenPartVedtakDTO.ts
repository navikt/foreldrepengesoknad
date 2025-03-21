import { DekningsgradDTO, SaksperiodeNy } from '@navikt/fp-types';

export interface AnnenPartVedtakDTO {
    antallBarn?: number;
    dekningsgrad: DekningsgradDTO;
    perioder: SaksperiodeNy[];
    termindato?: string;
}
