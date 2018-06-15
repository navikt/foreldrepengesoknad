import AnnenForelder, { AnnenForelderPartial } from './AnnenForelder';

import Utenlandsopphold, { UtenlandsoppholdPartial } from './Utenlandsopphold';
import { Periode } from 'uttaksplan/types';
import { BarnPartial, Barn } from './Barn';
import Søker, { SøkerPartial } from './Søker';

type Foreldrepenger = 'foreldrepenger';

export enum SøkerRolle {
    MOR = 'MOR',
    MOR2 = 'MOR2',
    FAR = 'FAR',
    FAR2 = 'FAR2',
    MEDMOR = 'MEDMOR',
    MEDFAR = 'MEDFAR',
    FORESATT = 'FORESATT',
    FORESATT2 = 'FORESATT2'
}

export enum Søkersituasjon {
    FØDSEL = 'fødsel',
    ADOPSJON = 'adopsjon',
    STEBARN = 'stebarn',
    FORELDREANSVAR = 'foreldreansvar'
}

interface Søknad {
    type: Foreldrepenger;
    harGodkjentVilkår: boolean;
    annenForelder: AnnenForelder;
    situasjon: Søkersituasjon;
    barn: Barn;
    utenlandsopphold: Utenlandsopphold;
    uttaksplan: Periode[];
    søker: Søker;
}

export interface SøknadPartial {
    type?: Foreldrepenger;
    annenForelder: AnnenForelderPartial;
    situasjon?: Søkersituasjon;
    harGodkjentVilkår: boolean;
    barn: BarnPartial;
    utenlandsopphold: UtenlandsoppholdPartial;
    uttaksplan?: Periode[];
    søker: SøkerPartial;
}

export type Skjemadata = Partial<Søknad>;

export type AttachmentType =
    | 'omsorgsovertakelse'
    | 'adopsjonsvedtak'
    | 'overtakelsedokumentasjon'
    | 'terminbekreftelse'
    | 'fødselsattest'
    | 'anneninntektdokumentasjon';

export interface Søknadsvedlegginfo {
    id: string;
    url: string;
    filnavn: string;
    type: AttachmentType;
    filstørrelse: number;
    metadata: SøknadsvedleggMetadata;
}

export interface SøknadsvedleggMetadata {
    skjemanummer: string;
    type?: string;
    beskrivelse?: string;
}

export default Søknad;
