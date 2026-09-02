import type { ContextDataType } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import type { FpMellomlagretData } from 'appData/useMellomlagreSøknad';

// Bumpet fra 22 til 23: landkoder i skjemaet gikk fra alpha-2 til alpha-3 (ISO 3166-1),
// så eldre mellomlagret data må forkastes for å unngå at gamle 2-bokstavskoder blir sendt inn.
export const VERSJON_MELLOMLAGRING = 23;

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
