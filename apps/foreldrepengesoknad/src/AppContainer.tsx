import { onLanguageSelect, setAvailableLanguages } from '@navikt/nav-dekoratoren-moduler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import { useState } from 'react';

import { Provider } from '@navikt/ds-react';
import { nb, nn } from '@navikt/ds-react/locales';

import { formHookMessages } from '@navikt/fp-form-hooks';
import { arbeidsforholdOgInntektMessages } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { egenNæringMessages } from '@navikt/fp-steg-egen-naering';
import { frilansMessages } from '@navikt/fp-steg-frilans';
import { oppsummeringMessages } from '@navikt/fp-steg-oppsummering';
import { utenlandsoppholdMessages } from '@navikt/fp-steg-utenlandsopphold';
import { LocaleNo } from '@navikt/fp-types';
import { ByttBrowserModal, ErrorBoundary, IntlProvider, uiMessages } from '@navikt/fp-ui';
import { getDecoratorLanguageCookie, utilsMessages } from '@navikt/fp-utils';
import { uttaksplanMessages } from '@navikt/fp-uttaksplan';
import { uttaksplanKalenderMessages } from '@navikt/fp-uttaksplan-kalender';

import { Foreldrepengesøknad, slettMellomlagringOgLastSidePåNytt } from './Foreldrepengesøknad';
import nbMessages from './intl/nb_NO.json';
import nnMessages from './intl/nn_NO.json';

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: {
        ...nbMessages,
        ...uiMessages.nb,
        ...utenlandsoppholdMessages.nb,
        ...oppsummeringMessages.nb,
        ...uttaksplanMessages.nb,
        ...utilsMessages.nb,
        ...uttaksplanKalenderMessages.nb,
        ...arbeidsforholdOgInntektMessages.nb,
        ...egenNæringMessages.nb,
        ...frilansMessages.nb,
        ...formHookMessages.nb,
    },
    nn: {
        ...nnMessages,
        ...uiMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...oppsummeringMessages.nn,
        ...uttaksplanMessages.nn,
        ...utilsMessages.nn,
        ...uttaksplanKalenderMessages.nn,
        ...arbeidsforholdOgInntektMessages.nn,
        ...egenNæringMessages.nn,
        ...frilansMessages.nn,
        ...formHookMessages.nn,
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
    defaultOptions: {
        queries: {
            retry: process.env.NODE_ENV === 'test' ? false : 3,
        },
    },
});

dayjs.locale(getDecoratorLanguageCookie('decorator-language'));

export const AppContainer = () => {
    const [locale, setLocale] = useState<LocaleNo>(getDecoratorLanguageCookie('decorator-language') as LocaleNo);

    setAvailableLanguages([
        { locale: 'nb', handleInApp: true },
        { locale: 'nn', handleInApp: true },
    ]);

    onLanguageSelect((lang) => {
        setLocale(lang.locale as 'nb' | 'nn');
        document.documentElement.setAttribute('lang', lang.locale);
    });

    return (
        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <ErrorBoundary appName="foreldrepengesoknad" retryCallback={slettMellomlagringOgLastSidePåNytt}>
                <ByttBrowserModal />
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools />
                    <Provider locale={locale === 'nb' ? nb : nn}>
                        <Foreldrepengesøknad />
                    </Provider>
                </QueryClientProvider>
            </ErrorBoundary>
        </IntlProvider>
    );
};
