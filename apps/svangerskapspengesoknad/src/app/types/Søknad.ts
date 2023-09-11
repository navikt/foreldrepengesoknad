import { Attachment } from '@navikt/fp-common/src/common/types/Attachment';
import { Barn } from './Barn';
import InformasjonOmUtenlandsopphold from './InformasjonOmUtenlandsopphold';
import { Søker } from './Søker';
import { Tilrettelegging } from './Tilrettelegging';

export interface Søknad {
    barn: Barn;
    harGodkjentVilkår: boolean;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    søker: Søker;
    tilrettelegging: Tilrettelegging[];
    vedlegg: Attachment[];
    harGodkjentOppsummering: boolean;
}
