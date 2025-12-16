import { onLanguageSelect, setAvailableLanguages } from '@navikt/nav-dekoratoren-moduler';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import { HTTPError } from 'ky';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Provider, Theme } from '@navikt/ds-react';
import { en, nb, nn } from '@navikt/ds-react/locales';

import { filopplasterMessages } from '@navikt/fp-filopplaster';
import { formHookMessages } from '@navikt/fp-form-hooks';
import { kvitteringMessages } from '@navikt/fp-steg-kvittering';
import { oppsummeringMessages } from '@navikt/fp-steg-oppsummering';
import { utenlandsoppholdMessages } from '@navikt/fp-steg-utenlandsopphold';
import { LocaleAll } from '@navikt/fp-types';
import { ErrorBoundary, IntlProvider, uiMessages } from '@navikt/fp-ui';
import { getDecoratorLanguageCookie, utilsMessages } from '@navikt/fp-utils';

import { Engangsstønad, slettMellomlagringOgLastSidePåNytt } from './Engangsstønad';
import enMessages from './intl/messages/en_US.json';
import nbMessages from './intl/messages/nb_NO.json';
import nnMessages from './intl/messages/nn_NO.json';

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: {
        ...nbMessages,
        ...uiMessages.nb,
        ...utenlandsoppholdMessages.nb,
        ...oppsummeringMessages.nb,
        ...utilsMessages.nb,
        ...formHookMessages.nb,
        ...kvitteringMessages.nb,
        ...filopplasterMessages.nb,
    },
    nn: {
        ...nnMessages,
        ...uiMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...oppsummeringMessages.nn,
        ...utilsMessages.nn,
        ...formHookMessages.nn,
        ...kvitteringMessages.nn,
        ...filopplasterMessages.nn,
    },
    en: {
        ...enMessages,
        ...uiMessages.en,
        ...utenlandsoppholdMessages.en,
        ...oppsummeringMessages.en,
        ...utilsMessages.en,
        ...formHookMessages.en,
        ...kvitteringMessages.en,
        ...filopplasterMessages.en,
    },
};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace FormatjsIntl {
        interface Message {
            ids: keyof typeof MESSAGES_GROUPED_BY_LOCALE.nb;
        }
    }
}

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => {
            if (error instanceof HTTPError) {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    location.reload();
                }
            }
        },
    }),
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

dayjs.locale(getDecoratorLanguageCookie('decorator-language'));

export const AppContainer = () => {
    const [locale, setLocale] = useState<LocaleAll>(getDecoratorLanguageCookie('decorator-language') as LocaleAll);

    void setAvailableLanguages([
        { locale: 'nb', handleInApp: true },
        { locale: 'nn', handleInApp: true },
        { locale: 'en', handleInApp: true },
    ]);

    onLanguageSelect((lang) => {
        setLocale(lang.locale as LocaleAll);
        document.documentElement.setAttribute('lang', lang.locale);
    });
    const { pathname } = useLocation();
    // Scroll til toppen når man endrer side.
    useEffect(() => {
        globalThis.scrollTo(0, 0);
    }, [pathname]);

    return (
        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <Theme theme="light">
                <ErrorBoundary appName="engangsstonad" retryCallback={() => void slettMellomlagringOgLastSidePåNytt()}>
                    <QueryClientProvider client={queryClient}>
                        <ReactQueryDevtools />
                        <Provider locale={getDsProviderLocale(locale)}>
                            <Engangsstønad />
                        </Provider>
                    </QueryClientProvider>
                </ErrorBoundary>
            </Theme>
        </IntlProvider>
    );
};

const getDsProviderLocale = (locale: LocaleAll) => {
    switch (locale) {
        case 'nn':
            return nn;
        case 'en':
            return en;
        default:
            return nb;
    }
};
