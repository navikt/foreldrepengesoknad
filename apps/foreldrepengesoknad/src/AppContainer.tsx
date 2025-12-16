import { onLanguageSelect, setAvailableLanguages } from '@navikt/nav-dekoratoren-moduler';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import { HTTPError } from 'ky';
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
import { uttaksplanMessages } from '@navikt/fp-uttaksplan';
import { uttaksplanKalenderMessages } from '@navikt/fp-uttaksplan-kalender';
import { nyUttaksplanMessages } from '@navikt/fp-uttaksplan-ny';

import { Foreldrepengesøknad, slettMellomlagringOgLastSidePåNytt } from './Foreldrepengesøknad';
import nbMessages from './intl/nb_NO.json';
import nnMessages from './intl/nn_NO.json';

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: {
        ...nbMessages,
        ...uiMessages.nb,
        ...utenlandsoppholdMessages.nb,
        ...oppsummeringMessages.nb,
        ...nyUttaksplanMessages.nb,
        ...uttaksplanKalenderMessages.nb,
        ...uttaksplanMessages.nb,
        ...utilsMessages.nb,
        ...arbeidsforholdOgInntektMessages.nb,
        ...egenNæringMessages.nb,
        ...frilansMessages.nb,
        ...formHookMessages.nb,
        ...kvitteringMessages.nb,
        ...filopplasterMessages.nb,
    },
    nn: {
        ...nnMessages,
        ...uiMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...oppsummeringMessages.nn,
        ...nyUttaksplanMessages.nn,
        ...uttaksplanKalenderMessages.nn,
        ...uttaksplanMessages.nn,
        ...utilsMessages.nn,
        ...arbeidsforholdOgInntektMessages.nn,
        ...egenNæringMessages.nn,
        ...frilansMessages.nn,
        ...formHookMessages.nn,
        ...kvitteringMessages.nn,
        ...filopplasterMessages.nn,
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
    const initialLocale = getDecoratorLanguageCookie('decorator-language') as LocaleAll;
    const [locale, setLocale] = useState<LocaleNo>(initialLocale === 'en' ? 'nb' : initialLocale);

    void setAvailableLanguages([
        { locale: 'nb', handleInApp: true },
        { locale: 'nn', handleInApp: true },
    ]);

    onLanguageSelect((lang) => {
        setLocale(lang.locale as 'nb' | 'nn');
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
                <ErrorBoundary
                    appName="foreldrepengesoknad"
                    retryCallback={() => void slettMellomlagringOgLastSidePåNytt()}
                >
                    <ByttBrowserModal />
                    <QueryClientProvider client={queryClient}>
                        <ReactQueryDevtools />
                        <Provider locale={locale === 'nb' ? nb : nn}>
                            <Foreldrepengesøknad />
                        </Provider>
                    </QueryClientProvider>
                </ErrorBoundary>
            </Theme>
        </IntlProvider>
    );
};
