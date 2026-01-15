import { onLanguageSelect, setAvailableLanguages } from '@navikt/nav-dekoratoren-moduler';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import { HTTPError } from 'ky';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Provider, Theme } from '@navikt/ds-react';
import { en, nb, nn } from '@navikt/ds-react/locales';

import { filopplasterMessages } from '@navikt/fp-filopplaster';
import { formHookMessages } from '@navikt/fp-form-hooks';
import { LocaleAll } from '@navikt/fp-types';
import { ByttBrowserModal, IntlProvider, uiMessages } from '@navikt/fp-ui';
import { getDecoratorLanguageCookie, utilsMessages } from '@navikt/fp-utils';
import { nyUttaksplanMessages } from '@navikt/fp-uttaksplan-ny';

import { Foreldrepengeoversikt } from './Foreldrepengeoversikt';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary';
import enMessages from './intl/messages/en_US.json';
import nbMessages from './intl/messages/nb_NO.json';
import nnMessages from './intl/messages/nn_NO.json';
import { BruktOpplysningerOmArbeidsforhold } from './pages/BruktOpplysningerOmArbeidsforhold/BruktOpplysningerOmArbeidsforhold.tsx';
import { OversiktRoutes } from './routes/routes.ts';

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

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: {
        ...nbMessages,
        ...uiMessages.nb,
        ...utilsMessages.nb,
        ...nyUttaksplanMessages.nb,
        ...formHookMessages.nb,
        ...filopplasterMessages.nb,
    },
    nn: {
        ...nnMessages,
        ...uiMessages.nn,
        ...utilsMessages.nn,
        ...nyUttaksplanMessages.nn,
        ...formHookMessages.nn,
        ...filopplasterMessages.nn,
    },
    en: {
        ...enMessages,
        ...uiMessages.en,
        ...utilsMessages.en,
        ...nyUttaksplanMessages.en,
        ...formHookMessages.en,
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

dayjs.locale(getDecoratorLanguageCookie('decorator-language'));

export const AppContainer = () => {
    const initialLocale = getDecoratorLanguageCookie('decorator-language') as LocaleAll;
    const [locale, setLocale] = useState<LocaleAll>(initialLocale === 'en' ? 'nb' : initialLocale);

    void setAvailableLanguages([
        { locale: 'nb', handleInApp: true },
        { locale: 'nn', handleInApp: true },
        { locale: 'en', handleInApp: true },
    ]);

    onLanguageSelect((lang) => {
        setLocale(lang.locale as 'nb' | 'nn' | 'en');
        document.documentElement.setAttribute('lang', lang.locale);
    });

    const akselLocale = (() => {
        switch (locale) {
            case 'nn':
                return nn;
            case 'en':
                return en;
            default:
                return nb;
        }
    })();

    return (
        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <Theme theme="light">
                <ErrorBoundary>
                    <QueryClientProvider client={queryClient}>
                        <ReactQueryDevtools />
                        <Provider locale={akselLocale}>
                            <ByttBrowserModal />
                            <Routes>
                                {/* // Informasjonssiden er plassert her for å unngå fetching av persondata vi ikke har grunnlag for */}
                                <Route
                                    path={OversiktRoutes.BRUKT_OPPLYSNINGER_OM_ARBEIDSFORHOLD}
                                    element={<BruktOpplysningerOmArbeidsforhold />}
                                />
                                <Route path="*" element={<Foreldrepengeoversikt />} />
                            </Routes>
                        </Provider>
                    </QueryClientProvider>
                </ErrorBoundary>
            </Theme>
        </IntlProvider>
    );
};
