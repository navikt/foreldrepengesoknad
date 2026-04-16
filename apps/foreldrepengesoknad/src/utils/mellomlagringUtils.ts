import { SøknadRoutes } from 'appData/routes';
import { FpMellomlagretData } from 'appData/useMellomlagreSøknad';

export const VERSJON_MELLOMLAGRING = 21;

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
    if (storedState?.erEndringssøknad) {
        if (storedState.APP_ROUTE && !isEndringssøknadRoute(storedState.APP_ROUTE)) {
            return false;
        }
    }

    return storedState.version === VERSJON_MELLOMLAGRING;
};
