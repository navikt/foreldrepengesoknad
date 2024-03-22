import '@formatjs/intl-pluralrules/locale-data/nb';
import '@formatjs/intl-pluralrules/polyfill';
import * as Sentry from '@sentry/browser';
import dayjs from 'dayjs';
import 'dayjs/locale/nb.js';
import 'dayjs/locale/nn.js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@navikt/ds-css';

import AppContainer from './AppContainer';
import { initAmplitude } from './amplitude/amplitude';

dayjs.locale('nb');

Sentry.init({
    dsn: 'https://b4fd4db97e7d4663852a5203961e3cee@sentry.gc.nav.no/6',
    release: (window as any).APP_VERSION,
    environment: window.location.hostname,
    integrations: [new Sentry.Integrations.Breadcrumbs({ console: false })],
});

initAmplitude();

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(
        <StrictMode>
            <AppContainer />
        </StrictMode>,
    );
}
