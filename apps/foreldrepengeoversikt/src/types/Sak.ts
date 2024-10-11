import { EngangsstønadSak } from './EngangsstønadSak';
import { Foreldrepengesak } from './Foreldrepengesak';
import { SvangerskapspengeSak } from './SvangerskapspengeSak';

export type Sak = Foreldrepengesak | EngangsstønadSak | SvangerskapspengeSak;
