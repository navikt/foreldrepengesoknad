import {
    FødtBarnPartial,
    UfødtBarnPartial,
    AdopsjonsbarnPartial,
    ForeldreansvarBarnPartial
} from './Barn';

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
