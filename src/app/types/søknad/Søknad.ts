import { FødtBarnPartial, UfødtBarnPartial } from './Barn';
import { AnnenForelderPartial } from './AnnenForelder';

export type Foreldrepengesøknad = 'FORELDREPENGESØKNAD';

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
    barn: FødtBarnPartial | UfødtBarnPartial;
    gjelderAdopsjon: boolean;
    søker: SøkerPartial;
}

export type SøknadPartial = Partial<Søknad>;

export default Søknad;
