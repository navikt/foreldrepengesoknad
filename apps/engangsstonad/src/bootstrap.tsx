import * as Sentry from '@sentry/browser';
import Environment from 'appData/Environment';
import * as countries from 'i18n-iso-countries';
import * as langEN from 'i18n-iso-countries/langs/en.json';
import * as langNB from 'i18n-iso-countries/langs/nb.json';
import * as langNN from 'i18n-iso-countries/langs/nn.json';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'styles/globals.css';

import { AppContainer } from './AppContainer';
import './index.css';

countries.registerLocale(langNB);
countries.registerLocale(langNN);
countries.registerLocale(langEN);

if (process.env.NODE_ENV !== 'development') {
    Sentry.init({
        dsn: 'https://e2de35941445465aae1e83fcbcc2934d@sentry.gc.nav.no/8',
        release: Environment.APP_VERSION,
        environment: window.location.hostname,
        integrations: [Sentry.breadcrumbsIntegration({ console: false })],
    });
}

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(
        <StrictMode>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <AppContainer />
            </BrowserRouter>
        </StrictMode>,
    );
}
