import { onLanguageSelect, setAvailableLanguages } from '@navikt/nav-dekoratoren-moduler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import { useState } from 'react';

import { Provider, Theme } from '@navikt/ds-react';
import { en, nb, nn } from '@navikt/ds-react/locales';

import { DEFAULT_SATSER } from '@navikt/fp-constants';
import { formHookMessages } from '@navikt/fp-form-hooks';
import { LocaleAll } from '@navikt/fp-types';
import { ErrorBoundary, IntlProvider, SimpleErrorPage, uiMessages } from '@navikt/fp-ui';
import { getDecoratorLanguageCookie, utilsMessages } from '@navikt/fp-utils';

import { FpEllerEsRouter } from './FpEllerEsRouter';
import enMessages from './intl/messages/en_US.json';
import nbMessages from './intl/messages/nb_NO.json';
import nnMessages from './intl/messages/nn_NO.json';

const allNbMessages = { ...nbMessages, ...uiMessages.nb, ...utilsMessages.nb, ...formHookMessages.nb };

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
            retry: false,
        },
    },
});

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: allNbMessages,
    nn: { ...nnMessages, ...uiMessages.nn, ...utilsMessages.nn, ...formHookMessages.nn },
    en: { ...enMessages, ...uiMessages.en, ...utilsMessages.en, ...formHookMessages.en },
};

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

    return (
        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <Theme theme="light">
                <ErrorBoundary
                    appName="veiviser-fp-eller-es"
                    customErrorPage={<SimpleErrorPage retryCallback={() => location.reload()} />}
                >
                    <QueryClientProvider client={queryClient}>
                        <ReactQueryDevtools />
                        <Provider locale={getDsProviderLocale(locale)}>
                            <FpEllerEsRouter satser={DEFAULT_SATSER} />
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
