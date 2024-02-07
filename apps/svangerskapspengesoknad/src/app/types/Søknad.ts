import { Attachment } from '@navikt/fp-types';
import { BarnDTO } from './Barn';
import { InformasjonOmUtenlandsoppholdDTO } from './Utenlandsopphold';
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
