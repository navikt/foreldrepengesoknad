import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/browser';
import * as countries from 'i18n-iso-countries';
import { Modal } from '@navikt/ds-react';
import { ErrorBoundary } from '@navikt/fp-ui';
import AppContainer from './AppContainer';
import { initAmplitude } from '@navikt/fp-metrics';
import Environment from 'appData/Environment';
import * as langNB from 'i18n-iso-countries/langs/nb.json';
import * as langNN from 'i18n-iso-countries/langs/nn.json';
import * as langEN from 'i18n-iso-countries/langs/en.json';

import '@navikt/ds-css';
import 'styles/globals.less';

countries.registerLocale(langNB);
countries.registerLocale(langNN);
countries.registerLocale(langEN);

Modal.setAppElement('#app');

if (process.env.NODE_ENV !== 'development') {
    Sentry.init({
        dsn: 'https://e2de35941445465aae1e83fcbcc2934d@sentry.gc.nav.no/8',
        release: Environment.APP_VERSION,
        environment: window.location.hostname,
        integrations: [new Sentry.Integrations.Breadcrumbs({ console: false })],
    });
}

initAmplitude();

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
    <ErrorBoundary>
        <AppContainer />
    </ErrorBoundary>,
);
