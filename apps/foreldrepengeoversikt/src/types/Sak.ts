import { EngangsstønadSakDTO, ForeldrepengesakDTO, SvangerskapspengeSakDTO, Ytelse } from '@navikt/fp-types';

export interface SvangerskapspengeSak extends SvangerskapspengeSakDTO {
    ytelse: Ytelse.SVANGERSKAPSPENGER;
}

export interface Foreldrepengesak extends ForeldrepengesakDTO {
    ytelse: Ytelse.FORELDREPENGER;
}

export interface EngangsstønadSak extends EngangsstønadSakDTO {
    ytelse: Ytelse.ENGANGSSTØNAD;
}

export type Sak = Foreldrepengesak | EngangsstønadSak | SvangerskapspengeSak;
