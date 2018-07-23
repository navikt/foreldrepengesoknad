import AnnenForelder, { AnnenForelderPartial } from './AnnenForelder';

import InformasjonOmUtenlandsopphold, {
    InformasjonOmUtenlandsoppholdPartial
} from './InformasjonOmUtenlandsopphold';
import { Periode } from 'uttaksplan/types';
import { BarnPartial, Barn } from './Barn';
import Søker, { SøkerPartial } from './Søker';
import { Attachment } from 'common/storage/attachment/types/Attachment';

type Foreldrepenger = 'foreldrepenger';

export enum SøkerRolle {
    MOR = 'MOR',
    FAR = 'FAR',
    FAR2 = 'FAR2',
    MEDMOR = 'MEDMOR',
    FORESATT = 'FORESATT',
    FORESATT2 = 'FORESATT2'
}

export enum Søkersituasjon {
    FØDSEL = 'fødsel',
    ADOPSJON = 'adopsjon',
    STEBARN = 'stebarn',
    FORELDREANSVAR = 'omsorgsovertakelse'
}

interface Søknad {
    type: Foreldrepenger;
    harGodkjentVilkår: boolean;
    harGodkjentOppsummering: boolean;
    annenForelder: AnnenForelder;
    situasjon: Søkersituasjon;
    barn: Barn;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    uttaksplan: Periode[];
    søker: Søker;
    vedlegg?: Attachment[];
}

export interface SøknadPartial {
    type?: Foreldrepenger;
    harGodkjentVilkår: boolean;
    harGodkjentOppsummering: boolean;
    annenForelder: AnnenForelderPartial;
    situasjon?: Søkersituasjon;
    barn: BarnPartial;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsoppholdPartial;
    uttaksplan?: Periode[];
    søker: SøkerPartial;
    vedlegg?: Attachment[];
}

export type Skjemadata = Partial<Søknad>;

export type AttachmentType =
    | 'omsorgsovertakelse'
    | 'adopsjonsvedtak'
    | 'terminbekreftelse'
    | 'fødselsattest'
    | 'anneninntektdokumentasjon';

export default Søknad;
