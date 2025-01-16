import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';

import { ByttBrowserModal, IntlProvider, uiMessages } from '@navikt/fp-ui';
import { utilsMessages } from '@navikt/fp-utils';
import { uttaksplanKalenderMessages } from '@navikt/fp-uttaksplan-kalender-ny';
import { nyUttaksplanMessages } from '@navikt/fp-uttaksplan-ny';

import { Foreldrepengeoversikt } from './Foreldrepengeoversikt';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary';
import nbMessages from './intl/messages/nb_NO.json';

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
};

dayjs.locale('nb');

const AppContainer: FunctionComponent = () => {
    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools />
                <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                    <ByttBrowserModal />
                    <Foreldrepengeoversikt />
                </IntlProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
};

export default AppContainer;
