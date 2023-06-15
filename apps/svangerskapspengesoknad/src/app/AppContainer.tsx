import { FunctionComponent } from 'react';
import Svangerskapspengesøknad from './Svangerskapspengesøknad';
import IntlProvider from './intl/IntlProvider';
import dayjs from 'dayjs';
import ByttBrowserModal from './pages/byttBrowserModal/ByttBrowserModal';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import { shouldChangeBrowser } from './utils/browserUtils';

dayjs.locale('nb');

const AppContainer: FunctionComponent = () => {
    return (
        <ErrorBoundary>
            <IntlProvider locale="nb">
                <ByttBrowserModal skalEndreNettleser={shouldChangeBrowser()} />
                <Svangerskapspengesøknad />
            </IntlProvider>
        </ErrorBoundary>
    );
};

export default AppContainer;
