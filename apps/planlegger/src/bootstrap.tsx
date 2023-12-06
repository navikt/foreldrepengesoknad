import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/browser';
import * as countries from 'i18n-iso-countries';
import { Modal } from '@navikt/ds-react';
import AppContainer from './AppContainer';
import { initAmplitude } from '@navikt/fp-metrics';
import * as langNB from 'i18n-iso-countries/langs/nb.json';
import * as langNN from 'i18n-iso-countries/langs/nn.json';
import './styles/global.less';

import '@navikt/ds-css';

countries.registerLocale(langNB);
countries.registerLocale(langNN);

Modal.setAppElement('#app');

if (process.env.NODE_ENV !== 'development') {
    Sentry.init({
        dsn: 'https://e2de35941445465aae1e83fcbcc2934d@sentry.gc.nav.no/8',
        environment: window.location.hostname,
        integrations: [new Sentry.Integrations.Breadcrumbs({ console: false })],
    });
}

initAmplitude();

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(<AppContainer />);
