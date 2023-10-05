import { Attachment } from '@navikt/fp-common/src/common/types/Attachment';
import { Barn, BarnDTO as BarnDTO } from './Barn';
import InformasjonOmUtenlandsopphold, { InformasjonOmUtenlandsoppholdDTO } from './InformasjonOmUtenlandsopphold';
import { Søker, SøkerDTO } from './Søker';
import { Tilrettelegging, TilretteleggingDTO } from './Tilrettelegging';

export interface Søknad {
    barn: Barn;
    harGodkjentVilkår: boolean;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    søker: Søker;
    tilrettelegging: Tilrettelegging[];
    harGodkjentOppsummering: boolean;
}

export enum Søknadstype {
    'SVANGERSKAPSPENGER' = 'svangerskapspenger',
}

export interface SøknadDTO
    extends Omit<
        Søknad,
        | 'informasjonOmUtenlandsopphold'
        | 'barn'
        | 'tilrettelegging'
        | 'søker'
        | 'harGodkjentOppsummering'
        | 'harGodkjentVilkår'
    > {
    type: Søknadstype;
    erEndringssøknad: boolean;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsoppholdDTO;
    barn: BarnDTO;
    tilrettelegging: TilretteleggingDTO[];
    søker: SøkerDTO;
    vedlegg: Attachment[];
}
