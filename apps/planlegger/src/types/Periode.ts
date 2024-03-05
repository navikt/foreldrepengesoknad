import { Dekningsgrad } from '@navikt/fp-common';

export type Fellesperiodefordeling = {
    antallUkerSøker1: number | undefined;
    antallUkerSøker2?: number | undefined;
    id: number;
};

export type Periode = {
    dekningsgrad: Dekningsgrad;
    fellesperiodefordeling: number | undefined;
};
