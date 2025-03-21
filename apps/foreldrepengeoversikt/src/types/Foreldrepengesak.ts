import { ForeldrepengesakDTO } from '@navikt/fp-types';

import { Ytelse } from './Ytelse';

export interface Foreldrepengesak extends ForeldrepengesakDTO {
    ytelse: Ytelse.FORELDREPENGER;
}
