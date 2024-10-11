import { Kjønn } from '@navikt/fp-types';

export interface Person {
    etternavn: string;
    fornavn: string;
    mellomnavn?: string;
    fødselsdato: string;
    dødsdato?: string;
    fnr: string;
    kjønn: Kjønn;
}
