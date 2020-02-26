import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Modal from 'nav-frontend-modal';
import * as Sentry from '@sentry/browser';

import Foreldrepengesøknad from './Foreldrepengesøknad';
import store from './redux';
import IntlProvider from './intl/IntlProvider';

import * as countries from 'i18n-iso-countries';
import { Normaltekst } from 'nav-frontend-typografi';
import ApplicationInfo from './components/applikasjon/applicationInfo/ApplicationInfo';
import { registerDevUtils } from 'common/dev/devUtils';
import ErrorBoundary from './components/applikasjon/errorBoundary/ErrorBoundary';
import ByttBrowserModal from 'common/components/byttBrowserModal/ByttBrowserModal';

import './styles/app.less';

countries.registerLocale(require('i18n-iso-countries/langs/nb.json'));
countries.registerLocale(require('i18n-iso-countries/langs/nn.json'));

Modal.setAppElement('#appContainer');
const root = document.getElementById('app');

registerDevUtils();

Sentry.init({
    dsn: 'https://8e90481464a4442db8c86bc31b9e41ad@sentry.gc.nav.no/11',
    release: (window as any).APP_VERSION,
    environment: window.location.hostname,
    integrations: [new Sentry.Integrations.Breadcrumbs({ console: false })]
});

render(
    <ErrorBoundary>
        <Provider store={store}>
            <IntlProvider>
                <Router>
                    <Normaltekst tag="div">
                        <ByttBrowserModal />
                        <Foreldrepengesøknad />
                        <ApplicationInfo />
                    </Normaltekst>
                </Router>
            </IntlProvider>
        </Provider>
    </ErrorBoundary>,
    root
);
