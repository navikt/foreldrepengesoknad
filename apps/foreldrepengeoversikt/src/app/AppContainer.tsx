import React, { FunctionComponent } from 'react';
import ByttBrowserModal from './components/bytt-browser-modal/ByttBrowserModal';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import Foreldrepengeoversikt from './Foreldrepengeoversikt';
import IntlProvider from './intl/IntlProvider';

const AppContainer: FunctionComponent = () => {
    return (
        <ErrorBoundary>
            <IntlProvider locale="nb">
                <ByttBrowserModal />
                <Foreldrepengeoversikt />
            </IntlProvider>
        </ErrorBoundary>
    );
};

export default AppContainer;
