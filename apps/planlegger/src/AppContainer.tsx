import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';

import { LocaleAll } from '@navikt/fp-types';
import { ErrorBoundary, IntlProvider, SimpleErrorPage, uiMessages } from '@navikt/fp-ui';
import { utilsMessages } from '@navikt/fp-utils';
import { uttaksplanKalenderMessages } from '@navikt/fp-uttaksplan-kalender-ny';
import { nyUttaksplanMessages } from '@navikt/fp-uttaksplan-ny';

import { PlanleggerDataInit } from './Planlegger';
import enMessages from './intl/messages/en_US.json';
import nbMessages from './intl/messages/nb_NO.json';
import nnMessages from './intl/messages/nn_NO.json';

const allNbMessages = {
    ...nbMessages,
    ...uiMessages.nb,
    ...utilsMessages.nb,
    ...nyUttaksplanMessages.nb,
    ...uttaksplanKalenderMessages.nb,
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
    nn: {
        ...nnMessages,
        ...uiMessages.nn,
        ...utilsMessages.nn,
        ...nyUttaksplanMessages.nn,
        ...uttaksplanKalenderMessages.nn,
    },
    en: {
        ...enMessages,
        ...uiMessages.en,
        ...utilsMessages.en,
        ...uttaksplanKalenderMessages.en,
    },
};

const initLocale = (): LocaleAll => {
    const queryString = window.location.search;
    const languageParam = new URLSearchParams(queryString).get('language');
    const locale =
        languageParam === 'nb' || languageParam === 'nn' || languageParam === 'en'
            ? (languageParam as LocaleAll)
            : 'nb';

    dayjs.locale(locale);
    document.documentElement.setAttribute('lang', locale);

    return locale;
};

export const AppContainer = () => {
    const origLocale = useMemo(() => initLocale(), []);
    const [locale, setLocale] = useState<LocaleAll>(origLocale);

    const changeLocale = useCallback((activeLocale: LocaleAll) => {
        setLocale(activeLocale);
        dayjs.locale(activeLocale);
        document.documentElement.setAttribute('lang', activeLocale);
    }, []);

    return (
        <IntlProvider locale={locale} messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <ErrorBoundary
                appName="Foreldrepengeplanlegger"
                customErrorPage={<SimpleErrorPage retryCallback={() => location.reload()} />}
            >
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools />
                    <PlanleggerDataInit locale={locale} changeLocale={changeLocale} />
                </QueryClientProvider>
            </ErrorBoundary>
        </IntlProvider>
    );
};
