import 'dayjs/locale/nb.js';
import 'dayjs/locale/nn.js';
import * as countries from 'i18n-iso-countries';
import * as langNB from 'i18n-iso-countries/langs/nb.json';
import * as langNN from 'i18n-iso-countries/langs/nn.json';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { initSentry } from '@navikt/fp-observability';

import { AppContainer } from './AppContainer';
import './index.css';
import './styles/global.css';

countries.registerLocale(langNB);
countries.registerLocale(langNN);

initSentry({ dsn: 'https://db0c0715bf2e0b91044c530296065174@sentry.gc.nav.no/182' });

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
