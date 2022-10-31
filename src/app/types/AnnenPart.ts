import { Kjønn } from '@navikt/fp-common';

//TODO: Can this be deleted?
export interface AnnenPart {
    aktørid: string;
    fnr: string;
    navn: {
        fornavn: string;
        etternavn: string;
    };
    kjønn: Kjønn;
}

export interface AnnenPartV2 {
    fnr: string;
    fornavn: string;
    etternavn: string;
}
