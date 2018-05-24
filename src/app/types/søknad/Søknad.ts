import Vedlegg from './Vedlegg';
import AnnenForelder, { AnnenForelderPartial } from './AnnenForelder';

import Utenlandsopphold, { UtenlandsoppholdPartial } from './Utenlandsopphold';
import { Periode } from 'uttaksplan/types';
import { BarnPartial, Barn } from './Barn';

type Foreldrepengesøknad = 'FORELDREPENGESØKNAD';

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

export interface Søker {
    rolle: SøkerRolle;
    selvstendigNæringsdrivendeEllerFrilanser: boolean;
}

export type SøkerPartial = Partial<Søker>;

interface Søknad {
    type: Foreldrepengesøknad;
    annenForelder: AnnenForelder;
    situasjon: Søkersituasjon;
    barn: Barn;
    søker: Søker;
    utenlandsopphold: Utenlandsopphold;
    uttaksplan: Periode[];
    vedlegg: Vedlegg;
}

export interface SøknadPartial {
    type?: Foreldrepengesøknad;
    annenForelder: AnnenForelderPartial;
    situasjon?: Søkersituasjon;
    barn: BarnPartial;
    søker: SøkerPartial;
    utenlandsopphold: UtenlandsoppholdPartial;
    uttaksplan?: Periode[];
    vedlegg: Vedlegg;
}

export type Skjemadata = Partial<SøknadPartial>;

export default Søknad;
