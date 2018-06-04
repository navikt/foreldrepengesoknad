import AnnenForelder, { AnnenForelderPartial } from './AnnenForelder';

import Utenlandsopphold, { UtenlandsoppholdPartial } from './Utenlandsopphold';
import { Periode } from 'uttaksplan/types';
import { BarnPartial, Barn } from './Barn';

type Foreldrepengesøknad = 'foreldrepengesøknad';

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
    type: Foreldrepengesøknad;
    harGodkjentVilkår: boolean;
    annenForelder: AnnenForelder;
    situasjon: Søkersituasjon;
    barn: Barn;
    utenlandsopphold: Utenlandsopphold;
    uttaksplan: Periode[];
    søkerRolle: SøkerRolle;
    erSelvstendigNæringsdrivende: boolean;
    erFrilanser: boolean;
    erMorForSyk: boolean;
    vedlegg: Søknadsvedlegginfo[];
    erMorUfør: boolean;
    aleneOmOmsorg: boolean;
}

export interface SøknadPartial {
    type?: Foreldrepengesøknad;
    annenForelder: AnnenForelderPartial;
    situasjon?: Søkersituasjon;
    harGodkjentVilkår: boolean;
    barn: BarnPartial;
    utenlandsopphold: UtenlandsoppholdPartial;
    uttaksplan?: Periode[];
    søkerRolle?: SøkerRolle;
    erSelvstendigNæringsdrivende?: boolean;
    erFrilanser?: boolean;
    erMorForSyk?: boolean;
}

export type Skjemadata = Partial<Søknad>;

export type SøknadsvedleggType =
    | 'omsorgsovertakelse'
    | 'adopsjonsvedtak'
    | 'overtakelsedokumentasjon'
    | 'terminbekreftelse'
    | 'fødselsattest';

export interface Søknadsvedlegginfo {
    id: string;
    url: string;
    filnavn: string;
    type: SøknadsvedleggType;
    filstørrelse: number;
    metadata: SøknadsvedleggMetadata;
}

export interface SøknadsvedleggMetadata {
    skjemanummer: string;
    type?: string;
    beskrivelse?: string;
}

export default Søknad;
