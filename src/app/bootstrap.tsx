import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Modal from 'nav-frontend-modal';
import Foreldrepengesøknad from './Foreldrepengesøknad';
import store from './redux';
import IntlProvider from './intl/IntlProvider';

import './styles/app.less';

import * as countries from 'i18n-iso-countries';
import { Normaltekst } from 'nav-frontend-typografi';
import ApplicationInfo from './components/applikasjon/applicationInfo/ApplicationInfo';
import { registerDevUtils } from 'common/dev/devUtils';
import ErrorBoundary from './components/applikasjon/errorBoundary/ErrorBoundary';

countries.registerLocale(require('i18n-iso-countries/langs/nb.json'));
countries.registerLocale(require('i18n-iso-countries/langs/nn.json'));

Modal.setAppElement('#appContainer');
const root = document.getElementById('app');

registerDevUtils();

render(
    <ErrorBoundary>
        <Provider store={store}>
            <IntlProvider>
                <Router>
                    <Normaltekst tag="div">
                        <Foreldrepengesøknad />
                        <ApplicationInfo />
                    </Normaltekst>
                </Router>
            </IntlProvider>
        </Provider>
    </ErrorBoundary>,
    root
);
