import '@formatjs/intl-pluralrules/locale-data/nb';
import '@formatjs/intl-pluralrules/polyfill';
import * as Sentry from '@sentry/browser';
import dayjs from 'dayjs';
import 'dayjs/locale/nb.js';
import 'dayjs/locale/nn.js';
import * as countries from 'i18n-iso-countries';
import * as langNB from 'i18n-iso-countries/langs/nb.json';
import * as langNN from 'i18n-iso-countries/langs/nn.json';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { AppContainer } from './AppContainer';
import './index.css';

countries.registerLocale(langNB);
countries.registerLocale(langNN);

dayjs.locale('nb');

Sentry.init({
    dsn: 'https://b28b752e32e846dd9818f2eb7a9fc013@sentry.gc.nav.no/7',
    release: (window as any).APP_VERSION,
    environment: window.location.hostname,
    integrations: [Sentry.breadcrumbsIntegration({ console: false })],
});

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
