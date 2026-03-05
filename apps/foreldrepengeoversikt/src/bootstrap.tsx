import '@formatjs/intl-pluralrules/locale-data/nb';
import '@formatjs/intl-pluralrules/polyfill.js';
import dayjs from 'dayjs';
import 'dayjs/locale/nb.js';
import 'dayjs/locale/nn.js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { initSentry } from '@navikt/fp-sentry';

import { AppContainer } from './AppContainer';
import { urlPrefiks } from './api/queries.ts';
// Viktig at ds-css importeres før AppContainer. Det gjør at Aksel+tailwind sin css laster før vår i de tilfellene vi vil overskrive.
import './index.css';

dayjs.locale('nb');

initSentry({
    dsn: 'https://b4fd4db97e7d4663852a5203961e3cee@sentry.gc.nav.no/6',
    beforeSend(event) {
        const harStacktraceMedOpprinnelseIVårKode = (event.exception?.values ?? []).some((ex) =>
            ex.stacktrace?.frames?.some((frame) => frame.filename && /\/assets\/.*\.js$/.test(frame.filename)),
        );

        if (harStacktraceMedOpprinnelseIVårKode) {
            return event;
        }

        return null;
    },
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
