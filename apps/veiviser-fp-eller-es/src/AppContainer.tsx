import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

import { Provider } from '@navikt/ds-react';
import { en, nb, nn } from '@navikt/ds-react/locales';

import { formHookMessages } from '@navikt/fp-form-hooks';
import { LocaleAll } from '@navikt/fp-types';
import { ErrorBoundary, IntlProvider, SimpleErrorPage, uiMessages } from '@navikt/fp-ui';
import { utilsMessages } from '@navikt/fp-utils';

import { FpEllerEsVeiviser } from './FpEllerEsVeiviser';
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
            retry: process.env.NODE_ENV === 'test' ? false : 3,
        },
    },
});

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: allNbMessages,
    nn: { ...nnMessages, ...uiMessages.nn, ...utilsMessages.nn, ...formHookMessages.nn },
    en: { ...enMessages, ...uiMessages.en, ...utilsMessages.en, ...formHookMessages.en },
};

const initLocale = (): LocaleAll => {
    const defaultLocale = 'nb';
    dayjs.locale(defaultLocale);
    return defaultLocale;
};

export const AppContainer = () => {
    const [locale, setLocale] = useState<LocaleAll>(initLocale());

    const changeLocale = useCallback((activeLocale: LocaleAll) => {
        setLocale(activeLocale);
        dayjs.locale(activeLocale);
        document.documentElement.setAttribute('lang', activeLocale);
    }, []);

    return (
        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <ErrorBoundary
                appName="veiviser-fp-eller-es"
                customErrorPage={<SimpleErrorPage retryCallback={() => location.reload()} />}
            >
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools />
                    <Provider locale={getDsProviderLocale(locale)}>
                        <FpEllerEsVeiviser locale={locale} changeLocale={changeLocale} />
                    </Provider>
                </QueryClientProvider>
            </ErrorBoundary>
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
