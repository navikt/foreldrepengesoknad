import { FunctionComponent } from 'react';
import ByttBrowserModal from './components/bytt-browser-modal/ByttBrowserModal';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import Foreldrepengeoversikt from './Foreldrepengeoversikt';
import IntlProvider from './intl/IntlProvider';
import dayjs from 'dayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

dayjs.locale('nb');

const AppContainer: FunctionComponent = () => {
    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <IntlProvider locale="nb">
                    <ByttBrowserModal />
                    <Foreldrepengeoversikt />
                </IntlProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
};

export default AppContainer;
