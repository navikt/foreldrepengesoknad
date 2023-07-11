import { Tidsperiode } from '@navikt/fp-common';

export interface DatoAvgrensninger {
    minDato?: string;
    maksDato?: string;
    ugyldigeTidsperioder?: Tidsperiode[];
    helgedagerIkkeTillatt?: boolean;
}
