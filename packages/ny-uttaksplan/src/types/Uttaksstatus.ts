import { StønadskontoUttak } from '@navikt/fp-common';

export interface Uttaksstatus {
    gjelderDagerBrukt: boolean;
    uttak: StønadskontoUttak[];
}
