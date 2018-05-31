import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Modal from 'nav-frontend-modal';
import Foreldrepengesøknad from './connected-components/Foreldrepengesøknad';
import store from './redux';
import IntlProvider from './intl/IntlProvider';

import './styles/app.less';

Modal.setAppElement('#app');
const root = document.getElementById('app');

render(
    <Provider store={store}>
        <IntlProvider>
            <Router>
                <Foreldrepengesøknad />
            </Router>
        </IntlProvider>
    </Provider>,
    root
);
