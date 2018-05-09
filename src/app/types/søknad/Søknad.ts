import { AnnenForelderPartial } from './AnnenForelder';

import {
    FødtBarnPartial,
    UfødtBarnPartial,
    AdopsjonsbarnPartial,
    ForeldreansvarBarnPartial
} from './Barn';

type Foreldrepengesøknad = 'FORELDREPENGESØKNAD';

export enum SøkerRolle {
    MOR = 'MOR',
    FAR = 'FAR',
    MEDMOR = 'MEDMOR',
    ANDRE = 'ANDRE'
}

export interface Søker {
    rolle: SøkerRolle;
}

export type SøkerPartial = Partial<Søker>;

interface Søknad {
    type: Foreldrepengesøknad;
    annenForelder: AnnenForelderPartial;
    gjelderAdopsjon: boolean;
    barn:
        | FødtBarnPartial
        | UfødtBarnPartial
        | AdopsjonsbarnPartial
        | ForeldreansvarBarnPartial;
    søker: SøkerPartial;
}

export type SøknadPartial = Partial<Søknad>;

export default Søknad;
