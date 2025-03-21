import { EngangsstønadSak } from './EngangsstønadSak';
import { Foreldrepengesak } from './Foreldrepengesak';
import { SvangerskapspengeSak } from './SvangerskapspengeSak';

export interface SakOppslag {
    engangsstønad: EngangsstønadSak[];
    foreldrepenger: Foreldrepengesak[];
    svangerskapspenger: SvangerskapspengeSak[];
}
