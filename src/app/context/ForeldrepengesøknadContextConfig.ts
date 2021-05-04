import SøknadRoutes from 'app/routes/routes';
import { Søknad } from './types/Søknad';

export interface ForeldrepengesøknadContextState {
    version: number;
    currentRoute: SøknadRoutes;
    søknad: Søknad;
}

export const foreldrepengesøknadInitialState: ForeldrepengesøknadContextState = {
    version: 2,
    currentRoute: SøknadRoutes.VELKOMMEN,
    søknad: {
        type: 'foreldrepenger',
        harGodkjentVilkår: false,
        søkersituasjon: {
            rolle: undefined as any,
            situasjon: undefined as any,
        },
        barn: undefined as any,
    },
};
