import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Modal from 'nav-frontend-modal';
import Foreldrepengesøknad from './connected-components/Foreldrepengesøknad';
import store from './redux';
import IntlProvider from './intl/IntlProvider';

import './styles/app.less';

import * as countries from 'i18n-iso-countries';
import { Normaltekst } from 'nav-frontend-typografi';
import ApplicationInfo from './components/applicationInfo/ApplicationInfo';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import { registerDevUtils } from 'common/dev/devUtils';
import { getAuthenticationCookieHash } from './util/routing/login';
import UtløptSesjonModal from './components/utløpt-sesjon-modal/UtløptSesjonModal';

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
                        {store.getState().api.cookieHash !== getAuthenticationCookieHash() && (
                            <UtløptSesjonModal erÅpen={true} />
                        )}
                        <Foreldrepengesøknad />
                        <ApplicationInfo />
                    </Normaltekst>
                </Router>
            </IntlProvider>
        </Provider>
    </ErrorBoundary>,
    root
);
