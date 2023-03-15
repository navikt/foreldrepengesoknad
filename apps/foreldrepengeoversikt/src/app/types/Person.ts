import { Kjønn } from '@navikt/fp-common';

export interface Person {
    etternavn: string;
    fornavn: string;
    fødselsdato: string;
    fnr: string;
    kjønn: Kjønn;
}
