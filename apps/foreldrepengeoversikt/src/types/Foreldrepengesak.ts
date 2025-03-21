import { ForeldrepengesakDTO, Ytelse } from '@navikt/fp-types';

export interface Foreldrepengesak extends ForeldrepengesakDTO {
    ytelse: Ytelse.FORELDREPENGER;
}
