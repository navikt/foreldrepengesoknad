import { Attachment } from '@navikt/fp-types';

import { TidsperiodeDTO } from 'app/types/TidsperiodeDTO';

import { BarnDTO } from './Barn';
import { SøkerDTO } from './Søker';
import { TilretteleggingDTO } from './Tilrettelegging';
import { InformasjonOmUtenlandsoppholdDTO } from './Utenlandsopphold';

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
    ferie: TidsperiodeDTO[];
}
