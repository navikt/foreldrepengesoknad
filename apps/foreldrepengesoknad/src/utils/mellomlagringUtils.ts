import { SøknadRoutes } from 'appData/routes';
import { FpMellomlagretData } from 'appData/useMellomlagreSøknad';

export const MELLOMLAGRET_VERSJON = 16;

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
