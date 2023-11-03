import { FunctionComponent } from 'react';
import dayjs from 'dayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { allCommonMessages } from '@navikt/fp-common';
import { IntlProvider } from '@navikt/fp-ui';
import ByttBrowserModal from './components/bytt-browser-modal/ByttBrowserModal';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import Foreldrepengeoversikt from './Foreldrepengeoversikt';
import nbMessages from './intl/nb_NO.json';

const queryClient = new QueryClient();

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: { ...nbMessages, ...allCommonMessages.nb },
    nn: { ...allCommonMessages.nn },
    en: { ...allCommonMessages.en },
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
