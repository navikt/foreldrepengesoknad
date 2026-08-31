import type { ContextDataType } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import type { FpMellomlagretData } from 'appData/useMellomlagreSøknad';

export const VERSJON_MELLOMLAGRING = 22;

type MellomlagretDataForValidering = Pick<FpMellomlagretData, 'version'> &
    Partial<
        Pick<
            FpMellomlagretData,
            'erEndringssøknad' | ContextDataType.APP_ROUTE | ContextDataType.OPPRINNELIG_UTTAKSPLAN
        >
    >;

const isEndringssøknadRoute = (route: SøknadRoutes): boolean => {
    switch (route) {
        case SøknadRoutes.UTTAKSPLAN:
        case SøknadRoutes.OPPSUMMERING: {
            return true;
        }
        default: {
            return false;
        }
    }
};

export const shouldApplyStorage = (storedState: MellomlagretDataForValidering): boolean => {
    if (storedState?.erEndringssøknad && storedState.APP_ROUTE && !isEndringssøknadRoute(storedState.APP_ROUTE)) {
        return false;
    }

    if (storedState.erEndringssøknad && storedState.OPPRINNELIG_UTTAKSPLAN === undefined) {
        return false;
    }

    return storedState.version === VERSJON_MELLOMLAGRING;
};
