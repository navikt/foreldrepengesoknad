import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';

import { IntlProvider } from '@navikt/fp-ui';

import Foreldrepengeoversikt from './Foreldrepengeoversikt';
import ByttBrowserModal from './components/bytt-browser-modal/ByttBrowserModal';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import nbMessages from './intl/nb_NO.json';

const queryClient = new QueryClient();

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: nbMessages,
};

dayjs.locale('nb');

const AppContainer: FunctionComponent = () => {
    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                    <ByttBrowserModal />
                    <Foreldrepengeoversikt />
                </IntlProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
};

export default AppContainer;
