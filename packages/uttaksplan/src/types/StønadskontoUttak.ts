import { StønadskontoType } from '@navikt/fp-common';

export interface StønadskontoUttak {
    konto: StønadskontoType;
    dager: number;
}
