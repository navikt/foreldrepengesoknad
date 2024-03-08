import * as Sentry from '@sentry/browser';
import Environment from 'appData/Environment';
import * as countries from 'i18n-iso-countries';
import * as langEN from 'i18n-iso-countries/langs/en.json';
import * as langNB from 'i18n-iso-countries/langs/nb.json';
import * as langNN from 'i18n-iso-countries/langs/nn.json';
import { createRoot } from 'react-dom/client';
import 'styles/globals.css';

import '@navikt/ds-css';

import { initAmplitude } from '@navikt/fp-metrics';

import AppContainer from './AppContainer';

countries.registerLocale(langNB);
countries.registerLocale(langNN);
countries.registerLocale(langEN);

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

root.render(<AppContainer />);
