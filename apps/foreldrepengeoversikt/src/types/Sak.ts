import { EsSak_fpoversikt, FpSak_fpoversikt, SvpSak_fpoversikt } from '@navikt/fp-types';

export interface SvangerskapspengeSak extends SvpSak_fpoversikt {
    ytelse: 'SVANGERSKAPSPENGER';
}

export interface Foreldrepengesak extends FpSak_fpoversikt {
    ytelse: 'FORELDREPENGER';
}

export interface EngangsstønadSak extends EsSak_fpoversikt {
    ytelse: 'ENGANGSSTØNAD';
}

export type Sak = Foreldrepengesak | EngangsstønadSak | SvangerskapspengeSak;
