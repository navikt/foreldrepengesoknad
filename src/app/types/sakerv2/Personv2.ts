import { Kjønn } from '@navikt/fp-common';

export interface PersonV2 {
    etternavn: string;
    fornavn: string;
    fødselsdato: string;
    fnr: string;
    kjønn: Kjønn;
}
