import { FpMellomlagretData } from 'app/api/api';
import SøknadRoutes from 'app/routes/routes';

export const MELLOMLAGRET_VERSJON = 8;

const isEndringssøknadRoute = (route: SøknadRoutes): boolean => {
    switch (route) {
        case SøknadRoutes.UTTAKSPLAN:
        case SøknadRoutes.OPPSUMMERING:
            return true;
        default:
            return false;
    }
};

export const shouldApplyStorage = (storedState: FpMellomlagretData): boolean => {
    if (storedState.søknad?.erEndringssøknad) {
        if (!isEndringssøknadRoute(storedState.currentRoute)) {
            return false;
        }
    }

    return storedState.version === MELLOMLAGRET_VERSJON;
};
