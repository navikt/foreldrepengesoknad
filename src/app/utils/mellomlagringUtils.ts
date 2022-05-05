import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import SøknadRoutes from 'app/routes/routes';

const isEndringssøknadRoute = (route: SøknadRoutes): boolean => {
    switch (route) {
        case SøknadRoutes.UTTAKSPLAN:
        case SøknadRoutes.OPPSUMMERING:
        case SøknadRoutes.SØKNAD_SENDT:
            return true;
        default:
            return false;
    }
};

export const shouldApplyStorage = (storedState: ForeldrepengesøknadContextState): boolean => {
    if (storedState.søknad && storedState.søknad.erEndringssøknad) {
        if (!isEndringssøknadRoute(storedState.currentRoute)) {
            return false;
        }
    }

    return storedState.version === 4;
};
