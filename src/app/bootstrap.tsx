import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Foreldrepengesøknad from './connected-components/Foreldrepengesøknad';
import store from './redux';

import './assets/styles/app.less';

const root = document.getElementById('app');
render(
    <Provider store={store}>
        <Router>
            <Foreldrepengesøknad />
        </Router>
    </Provider>,
    root
);
