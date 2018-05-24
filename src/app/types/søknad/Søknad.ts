import Vedlegg from './Vedlegg';
import { AnnenForelderPartial } from './AnnenForelder';

import {
    FødtBarnPartial,
    UfødtBarnPartial,
    AdopsjonsbarnPartial,
    ForeldreansvarBarnPartial
} from './Barn';

import { UtenlandsoppholdPartial } from './Utenlandsopphold';

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
    annenForelder: AnnenForelderPartial;
    situasjon: Søkersituasjon;
    barn:
        | FødtBarnPartial
        | UfødtBarnPartial
        | AdopsjonsbarnPartial
        | ForeldreansvarBarnPartial;
    utenlandsopphold: UtenlandsoppholdPartial;
    vedlegg: Vedlegg;
    søkerRolle: SøkerRolle;
    erSelvstendigNæringsdrivende: boolean;
    erFrilanser: boolean;
}

export type SøknadPartial = Partial<Søknad>;

export default Søknad;
