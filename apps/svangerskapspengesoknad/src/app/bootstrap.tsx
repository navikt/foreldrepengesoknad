import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import countries from 'i18n-iso-countries';
import * as Sentry from '@sentry/browser';
import { BrowserRouter } from 'react-router-dom';
import { Modal } from '@navikt/ds-react';
import * as langNB from 'i18n-iso-countries/langs/nb.json';
import * as langNN from 'i18n-iso-countries/langs/nn.json';

import store from './redux/store';
import IntlProvider from './intl/IntlProvider';
import Svangerskapspengesøknad from './connectedComponents/svangerskapspengesoknad/Svangerskapspengesøknad';

import '@navikt/ds-css';
import './styles/global.less';
import './styles/app.less';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

countries.registerLocale(langNB);
countries.registerLocale(langNN);

Modal.setAppElement('#app');

Sentry.init({
    dsn: 'https://b28b752e32e846dd9818f2eb7a9fc013@sentry.gc.nav.no/7',
    environment: window.location.hostname,
    integrations: [new Sentry.Integrations.Breadcrumbs({ console: false })],
});

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
    <ErrorBoundary>
        <Provider store={store}>
            <IntlProvider>
                <BrowserRouter basename="/">
                    <Svangerskapspengesøknad />
                </BrowserRouter>
            </IntlProvider>
        </Provider>
    </ErrorBoundary>
);
