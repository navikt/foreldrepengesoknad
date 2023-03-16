import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Normaltekst } from 'nav-frontend-typografi';
import * as Sentry from '@sentry/browser';
import * as countries from 'i18n-iso-countries';
import ErrorBoundary from './ErrorBoundary';
import ModalWrapper from 'nav-frontend-modal';
import AppContainer from './AppContainer';
import { initAmplitude } from './amplitude/amplitude';

import '@navikt/ds-css';
import './styles/globals.less';

countries.registerLocale(require('i18n-iso-countries/langs/nb.json'));
countries.registerLocale(require('i18n-iso-countries/langs/nn.json'));
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

ModalWrapper.setAppElement('#app');

if (process.env.NODE_ENV !== 'development') {
    Sentry.init({
        dsn: 'https://e2de35941445465aae1e83fcbcc2934d@sentry.gc.nav.no/8',
        release: (window as any).APP_VERSION,
        environment: window.location.hostname,
        integrations: [new Sentry.Integrations.Breadcrumbs({ console: false })],
    });
}

initAmplitude();

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
    <ErrorBoundary>
        <Normaltekst tag="div">
            <AppContainer />
        </Normaltekst>
    </ErrorBoundary>
);
