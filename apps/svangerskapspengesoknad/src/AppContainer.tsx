import { onLanguageSelect, setAvailableLanguages } from '@navikt/nav-dekoratoren-moduler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Provider, Theme } from '@navikt/ds-react';
import { nb, nn } from '@navikt/ds-react/locales';

import { filopplasterMessages } from '@navikt/fp-filopplaster';
import { formHookMessages } from '@navikt/fp-form-hooks';
import { arbeidsforholdOgInntektMessages } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { egenNæringMessages } from '@navikt/fp-steg-egen-naering';
import { frilansMessages } from '@navikt/fp-steg-frilans';
import { kvitteringMessages } from '@navikt/fp-steg-kvittering';
import { oppsummeringMessages } from '@navikt/fp-steg-oppsummering';
import { utenlandsoppholdMessages } from '@navikt/fp-steg-utenlandsopphold';
import { LocaleAll, LocaleNo } from '@navikt/fp-types';
import { ByttBrowserModal, ErrorBoundary, IntlProvider, uiMessages } from '@navikt/fp-ui';
import { getDecoratorLanguageCookie, utilsMessages } from '@navikt/fp-utils';

import { Svangerskapspengesøknad, slettMellomlagringOgLastSidePåNytt } from './Svangerskapspengesøknad';
import nbMessages from './intl/nb_NO.json';
import nnMessages from './intl/nn_NO.json';

const allNbMessages = {
    ...nbMessages,
    ...uiMessages.nb,
    ...utenlandsoppholdMessages.nb,
    ...oppsummeringMessages.nb,
    ...utilsMessages.nb,
    ...frilansMessages.nb,
    ...egenNæringMessages.nb,
    ...arbeidsforholdOgInntektMessages.nb,
    ...formHookMessages.nb,
    ...kvitteringMessages.nb,
    ...filopplasterMessages.nb,
};
const allNnMessages = {
    ...nnMessages,
    ...uiMessages.nn,
    ...utenlandsoppholdMessages.nn,
    ...oppsummeringMessages.nn,
    ...utilsMessages.nn,
    ...frilansMessages.nn,
    ...egenNæringMessages.nn,
    ...arbeidsforholdOgInntektMessages.nn,
    ...formHookMessages.nn,
    ...kvitteringMessages.nn,
    ...filopplasterMessages.nn,
};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace FormatjsIntl {
        interface Message {
            ids: keyof typeof allNbMessages;
        }
    }
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: process.env.NODE_ENV === 'test' ? false : 3,
        },
    },
});

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: allNbMessages,
    nn: allNnMessages,
};

dayjs.locale(getDecoratorLanguageCookie('decorator-language'));

export const AppContainer = () => {
    const initialLocale = getDecoratorLanguageCookie('decorator-language') as LocaleAll;
    const [locale, setLocale] = useState<LocaleNo>(initialLocale === 'en' ? 'nb' : initialLocale);
    const { pathname } = useLocation();

    void setAvailableLanguages([
        { locale: 'nb', handleInApp: true },
        { locale: 'nn', handleInApp: true },
    ]);

    onLanguageSelect((lang) => {
        setLocale(lang.locale as LocaleNo);
        document.documentElement.setAttribute('lang', lang.locale);
    });

    // Scroll til toppen når man endrer side.
    useEffect(() => {
        globalThis.scrollTo(0, 0);
    }, [pathname]);

    return (
        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <Theme theme="light">
                <ErrorBoundary
                    appName="svangerskapspengesoknad"
                    retryCallback={() => void slettMellomlagringOgLastSidePåNytt()}
                >
                    <ByttBrowserModal />
                    <QueryClientProvider client={queryClient}>
                        <ReactQueryDevtools />
                        <Provider locale={locale === 'nb' ? nb : nn}>
                            <Svangerskapspengesøknad />
                        </Provider>
                    </QueryClientProvider>
                </ErrorBoundary>
            </Theme>
        </IntlProvider>
    );
};
