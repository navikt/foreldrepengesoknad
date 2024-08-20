import { Stønadskonto } from '@navikt/fp-types';

export interface Uttaksstatus {
    gjelderDagerBrukt: boolean;
    uttak: Stønadskonto[];
}
