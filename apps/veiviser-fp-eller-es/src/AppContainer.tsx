import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

import { LocaleAll } from '@navikt/fp-types';
import { ErrorBoundary, IntlProvider, SimpleErrorPage, uiMessages } from '@navikt/fp-ui';
import { utilsMessages } from '@navikt/fp-utils';

import { FpEllerEsVeiviser } from './FpEllerEsVeiviser';
import enMessages from './intl/messages/en_US.json';
import nbMessages from './intl/messages/nb_NO.json';
import nnMessages from './intl/messages/nn_NO.json';

const allNbMessages = { ...nbMessages, ...uiMessages.nb, ...utilsMessages.nb };

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace FormatjsIntl {
        interface Message {
            ids: keyof typeof allNbMessages;
        }
    }
}

const queryClient = new QueryClient();

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: allNbMessages,
    nn: { ...nnMessages, ...uiMessages.nn, ...utilsMessages.nn },
    en: { ...enMessages, ...uiMessages.en, ...utilsMessages.en },
};

const initLocale = (): LocaleAll => {
    const defaultLocale = 'nb';
    dayjs.locale(defaultLocale);
    return defaultLocale;
};

const AppContainer = () => {
    const [locale, setLocale] = useState<LocaleAll>(initLocale());

    const changeLocale = useCallback((activeLocale: LocaleAll) => {
        setLocale(activeLocale);
        dayjs.locale(activeLocale);
        document.documentElement.setAttribute('lang', activeLocale);
    }, []);

    return (
        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <ErrorBoundary
                appName="Foreldrepengeveivisere"
                customErrorPage={<SimpleErrorPage retryCallback={() => location.reload()} />}
            >
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools />
                    <FpEllerEsVeiviser locale={locale} changeLocale={changeLocale} />
                </QueryClientProvider>
            </ErrorBoundary>
        </IntlProvider>
    );
};

export default AppContainer;
