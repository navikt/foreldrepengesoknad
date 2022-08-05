import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'nav-frontend-modal';
import * as Sentry from '@sentry/browser';

import * as countries from 'i18n-iso-countries';
import { initAmplitude } from './amplitude/amplitude';
import AppContainer from './AppContainer';

import './styles/app.less';

countries.registerLocale(require('i18n-iso-countries/langs/nb.json'));
countries.registerLocale(require('i18n-iso-countries/langs/nn.json'));

require('../../node_modules/dayjs/locale/nb.js');
require('../../node_modules/dayjs/locale/nn.js');

if (!Intl.PluralRules) {
    require('@formatjs/intl-pluralrules/polyfill');
    require('@formatjs/intl-pluralrules/locale-data/nb');
}

Sentry.init({
    dsn: 'https://8e90481464a4442db8c86bc31b9e41ad@sentry.gc.nav.no/11',
    release: (window as any).APP_VERSION,
    environment: window.location.hostname,
    integrations: [new Sentry.Integrations.Breadcrumbs({ console: false })],
});

initAmplitude();

Modal.setAppElement('#appContainer');
const container = document.getElementById('app');
const root = createRoot(container!);

root.render(<AppContainer />);
