import { EngangsstønadSak, Foreldrepengesak, SvangerskapspengeSak } from './Sak';

export interface SakOppslag {
    engangsstønad: EngangsstønadSak[];
    foreldrepenger: Foreldrepengesak[];
    svangerskapspenger: SvangerskapspengeSak[];
}
