import { EngangsstønadSakDTO } from '@navikt/fp-types';

import { Ytelse } from './Ytelse';

export interface EngangsstønadSak extends EngangsstønadSakDTO {
    ytelse: Ytelse.ENGANGSSTØNAD;
}
