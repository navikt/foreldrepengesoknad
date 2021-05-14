import SøknadRoutes from 'app/routes/routes';
import { BarnType } from './types/Barn';
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
            rolle: '',
            situasjon: '',
        },
        barn: {
            type: BarnType.IKKE_UTFYLT,
            antallBarn: '',
        },
        annenForelder: {
            kanIkkeOppgis: false,
        },
    },
};
