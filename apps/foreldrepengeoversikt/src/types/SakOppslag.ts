import { EngangsstønadSak, EngangsstønadSakDTO } from './EngangsstønadSak';
import { Foreldrepengesak, ForeldrepengesakDTO } from './Foreldrepengesak';
import { SvangerskapspengeSak, SvangerskapspengeSakDTO } from './SvangerskapspengeSak';

export interface SakOppslagDTO {
    engangsstønad: EngangsstønadSakDTO[];
    foreldrepenger: ForeldrepengesakDTO[];
    svangerskapspenger: SvangerskapspengeSakDTO[];
}

export interface SakOppslag {
    engangsstønad: EngangsstønadSak[];
    foreldrepenger: Foreldrepengesak[];
    svangerskapspenger: SvangerskapspengeSak[];
}
