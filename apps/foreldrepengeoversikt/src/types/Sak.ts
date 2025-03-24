import { EsSak, FpSak, SvpSak } from '@navikt/fp-types';

export interface SvangerskapspengeSak extends SvpSak {
    ytelse: 'SVANGERSKAPSPENGER';
}

export interface Foreldrepengesak extends FpSak {
    ytelse: 'FORELDREPENGER';
}

export interface EngangsstønadSak extends EsSak {
    ytelse: 'ENGANGSSTØNAD';
}

export type Sak = Foreldrepengesak | EngangsstønadSak | SvangerskapspengeSak;
