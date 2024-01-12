import dayjs from 'dayjs';
import { initAmplitude } from '@navikt/fp-metrics';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/browser';
import '@navikt/ds-css';

import * as langNB from 'i18n-iso-countries/langs/nb.json';
import * as langNN from 'i18n-iso-countries/langs/nn.json';
import * as countries from 'i18n-iso-countries';
import AppContainer from './AppContainer';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/nb';
import 'dayjs/locale/nb.js';
import 'dayjs/locale/nn.js';

countries.registerLocale(langNB);
countries.registerLocale(langNN);

dayjs.locale('nb');

Sentry.init({
    dsn: 'https://b28b752e32e846dd9818f2eb7a9fc013@sentry.gc.nav.no/7',
    release: (window as any).APP_VERSION,
    environment: window.location.hostname,
    integrations: [new Sentry.Integrations.Breadcrumbs({ console: false })],
});

initAmplitude();

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<AppContainer />);
}
