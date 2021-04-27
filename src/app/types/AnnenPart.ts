import { Kjønn } from '@navikt/fp-common';

export interface AnnenPart {
    aktørid: string;
    fnr: string;
    navn: {
        fornavn: string;
        etternavn: string;
        kjønn: Kjønn;
    };
}
