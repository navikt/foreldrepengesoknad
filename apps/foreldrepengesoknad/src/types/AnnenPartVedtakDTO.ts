import { DekningsgradDTO, SaksperiodeDTO } from '@navikt/fp-common';

export interface AnnenPartVedtakDTO {
    perioder: SaksperiodeDTO[];
    dekningsgrad: DekningsgradDTO;
    termindato?: string;
    antallBarn?: number;
}
