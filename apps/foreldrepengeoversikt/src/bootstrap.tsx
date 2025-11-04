import '@formatjs/intl-pluralrules/locale-data/nb';
import '@formatjs/intl-pluralrules/polyfill';
import * as Sentry from '@sentry/browser';
import dayjs from 'dayjs';
import 'dayjs/locale/nb.js';
import 'dayjs/locale/nn.js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Environment } from '@navikt/fp-constants';

import { AppContainer } from './AppContainer';
import { urlPrefiks } from './api/api';
// Viktig at ds-css importeres før AppContainer. Det gjør at Aksel+tailwind sin css laster før vår i de tilfellene vi vil overskrive.
import './index.css';

dayjs.locale('nb');

Sentry.init({
    dsn: 'https://b4fd4db97e7d4663852a5203961e3cee@sentry.gc.nav.no/6',
    release: Environment.APP_VERSION,
    environment: globalThis.location.hostname,
    integrations: [Sentry.breadcrumbsIntegration({ console: false })],
});

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(
        <StrictMode>
            <BrowserRouter basename={urlPrefiks}>
                <AppContainer />
            </BrowserRouter>
        </StrictMode>,
    );
}
