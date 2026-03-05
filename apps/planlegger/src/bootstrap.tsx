import 'dayjs/locale/nb.js';
import 'dayjs/locale/nn.js';
import * as countries from 'i18n-iso-countries';
import * as langNB from 'i18n-iso-countries/langs/nb.json';
import * as langNN from 'i18n-iso-countries/langs/nn.json';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { initSentry } from '@navikt/fp-sentry';

import { AppContainer } from './AppContainer';
import './index.css';
import './styles/global.css';

countries.registerLocale(langNB);
countries.registerLocale(langNN);

initSentry({ dsn: 'https://b6072f817d64f96c64eb45747c2dfeea@sentry.gc.nav.no/181' });

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
