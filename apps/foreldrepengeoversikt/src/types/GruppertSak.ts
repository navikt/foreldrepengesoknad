import { Ytelse } from '@navikt/fp-types';

import { BarnGruppering } from './BarnGruppering';
import { EngangsstønadSak } from './EngangsstønadSak';
import { Foreldrepengesak } from './Foreldrepengesak';
import { Situasjon } from './Situasjon';
import { SvangerskapspengeSak } from './SvangerskapspengeSak';

export interface GruppertSak {
    antallBarn: number;
    familiehendelsedato: string;
    type: Situasjon;
    saker: Array<Foreldrepengesak | SvangerskapspengeSak | EngangsstønadSak>;
    ytelse: Ytelse;
    barn: BarnGruppering | undefined;
}
