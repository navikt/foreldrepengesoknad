import { Familiesituasjon, Ytelse } from '@navikt/fp-types';

import { BarnGruppering } from './BarnGruppering';
import { Sak } from './Sak';

export interface GruppertSak {
    antallBarn: number;
    familiehendelsedato: string;
    type: Familiesituasjon;
    saker: Sak[];
    ytelse: Ytelse;
    barn: BarnGruppering | undefined;
}
