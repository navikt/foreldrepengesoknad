import { Attachment } from '@navikt/fp-types';
import { InformasjonOmUtenlandsoppholdDTO } from '@navikt/fp-types/src/Utenlandsopphold';

import { BarnDTO } from './Barn';
import { SøkerDTO } from './Søker';
import { TilretteleggingDTO } from './Tilrettelegging';

export enum Søknadstype {
    'SVANGERSKAPSPENGER' = 'svangerskapspenger',
}

export interface SøknadDTO {
    type: Søknadstype;
    erEndringssøknad: boolean;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsoppholdDTO;
    barn: BarnDTO;
    tilrettelegging: TilretteleggingDTO[];
    søker: SøkerDTO;
    vedlegg: Attachment[];
}
