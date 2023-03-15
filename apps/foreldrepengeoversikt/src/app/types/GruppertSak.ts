import { EngangsstønadSak } from './EngangsstønadSak';
import { Foreldrepengesak } from './Foreldrepengesak';
import { SvangerskapspengeSak } from './SvangerskapspengeSak';
import { Ytelse } from './Ytelse';

export interface GruppertSak {
    antallBarn: number;
    familiehendelsedato: string;
    type: 'fødsel' | 'termin' | 'adopsjon';
    saker: Array<Foreldrepengesak | SvangerskapspengeSak | EngangsstønadSak>;
    ytelse: Ytelse;
}
