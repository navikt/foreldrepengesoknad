import { onLanguageSelect, setAvailableLanguages } from '@navikt/nav-dekoratoren-moduler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Provider, Theme } from '@navikt/ds-react';
import { nb, nn } from '@navikt/ds-react/locales';

import { formHookMessages } from '@navikt/fp-form-hooks';
import { LocaleAll, LocaleNo } from '@navikt/fp-types';
import { ByttBrowserModal, IntlProvider, uiMessages } from '@navikt/fp-ui';
import { getDecoratorLanguageCookie, utilsMessages } from '@navikt/fp-utils';
import { uttaksplanKalenderMessages } from '@navikt/fp-uttaksplan-kalender-ny';
import { nyUttaksplanMessages } from '@navikt/fp-uttaksplan-ny';

import { Foreldrepengeoversikt } from './Foreldrepengeoversikt';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary';
import nbMessages from './intl/messages/nb_NO.json';
import nnMessages from './intl/messages/nn_NO.json';
import { BruktOpplysningerOmArbeidsforhold } from './pages/BruktOpplysningerOmArbeidsforhold/BruktOpplysningerOmArbeidsforhold.tsx';
import { OversiktRoutes } from './routes/routes.ts';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: process.env.NODE_ENV === 'test' ? false : 3,
        },
    },
});

const allNbMessages = {
    ...nbMessages,
    ...uiMessages.nb,
    ...utilsMessages.nb,
    ...nyUttaksplanMessages.nb,
    ...uttaksplanKalenderMessages.nb,
    ...formHookMessages.nb,
};

const allNnMessages = {
    ...nnMessages,
    ...uiMessages.nn,
    ...utilsMessages.nn,
    ...nyUttaksplanMessages.nn,
    ...uttaksplanKalenderMessages.nn,
    ...formHookMessages.nn,
};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace FormatjsIntl {
        interface Message {
            ids: keyof typeof allNbMessages;
        }
    }
}

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: allNbMessages,
    nn: allNnMessages,
};

// Sett initial dayjs locale
dayjs.locale(getDecoratorLanguageCookie('decorator-language'));

export const AppContainer = () => {
    const initialLocale = getDecoratorLanguageCookie('decorator-language') as LocaleAll;
    const [locale, setLocale] = useState<LocaleNo>(initialLocale === 'en' ? 'nb' : initialLocale);
    const { pathname } = useLocation();

    setAvailableLanguages([
        { locale: 'nb', handleInApp: true },
        { locale: 'nn', handleInApp: true },
    ]);

    onLanguageSelect((lang) => {
        setLocale(lang.locale as LocaleNo);
        document.documentElement.setAttribute('lang', lang.locale);
    });

    // Scroll til toppen når man endrer side
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Theme theme="light">
            <ErrorBoundary>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools />
                    <Provider locale={locale === 'nb' ? nb : nn}>
                        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                            <ByttBrowserModal />
                            <Routes>
                                {/* // Informasjonssiden er plassert her for å unngå fetching av persondata vi ikke har grunnlag for */}
                                <Route
                                    path={OversiktRoutes.BRUKT_OPPLYSNINGER_OM_ARBEIDSFORHOLD}
                                    element={<BruktOpplysningerOmArbeidsforhold />}
                                />
                                <Route path="*" element={<Foreldrepengeoversikt />} />
                            </Routes>
                        </IntlProvider>
                    </Provider>
                </QueryClientProvider>
            </ErrorBoundary>
        </Theme>
    );
};
