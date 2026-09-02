import { SøknadRoutes } from 'appData/routes';
import { FpMellomlagretData } from 'appData/useMellomlagreSøknad';

// Bumpet fra 22 til 23: landkoder i skjemaet gikk fra alpha-2 til alpha-3 (ISO 3166-1),
// så eldre mellomlagret data må forkastes for å unngå at gamle 2-bokstavskoder blir sendt inn.
export const VERSJON_MELLOMLAGRING = 23;

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

export const shouldApplyStorage = (storedState: FpMellomlagretData): boolean => {
    if (storedState?.erEndringssøknad && storedState.APP_ROUTE && !isEndringssøknadRoute(storedState.APP_ROUTE)) {
        return false;
    }

    return storedState.version === VERSJON_MELLOMLAGRING;
};
