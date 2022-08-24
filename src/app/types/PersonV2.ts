import { Kjønn } from '@navikt/fp-common';

export interface PersonV2 {
    etternavn: string;
    fornavn: string;
    fødselsdato: string;
    fødselsnummer: string;
    kjønn: Kjønn;
}

export interface RegistrertBarnV2 extends PersonV2 {
    fødselsdato: string;
}
