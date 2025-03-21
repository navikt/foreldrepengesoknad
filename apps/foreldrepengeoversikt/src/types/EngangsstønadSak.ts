import { EngangsstønadSakDTO, Ytelse } from '@navikt/fp-types';

export interface EngangsstønadSak extends EngangsstønadSakDTO {
    ytelse: Ytelse.ENGANGSSTØNAD;
}
