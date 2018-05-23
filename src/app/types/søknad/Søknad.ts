import { VedleggPartial } from './Vedlegg';
import { AnnenForelderPartial } from './AnnenForelder';

import {
    FødtBarnPartial,
    UfødtBarnPartial,
    AdopsjonsbarnPartial,
    ForeldreansvarBarnPartial
} from './Barn';

import { UtenlandsoppholdPartial } from './Utenlandsopphold';
import { Periode } from 'uttaksplan/types';

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
}

export type SøkerPartial = Partial<Søker>;

interface Søknad {
    type: Foreldrepengesøknad;
    annenForelder: AnnenForelderPartial;
    situasjon: Søkersituasjon;
    barn:
        | FødtBarnPartial
        | UfødtBarnPartial
        | AdopsjonsbarnPartial
        | ForeldreansvarBarnPartial;
    søker: SøkerPartial;
    utenlandsopphold: UtenlandsoppholdPartial;
    vedlegg: VedleggPartial;
    uttaksplan: Periode[];
}

export type SøknadPartial = Partial<Søknad>;

export default Søknad;
