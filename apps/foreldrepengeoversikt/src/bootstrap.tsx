import { bootstrapApp } from '@navikt/fp-app-shell';

import { AppContainer } from './AppContainer';
import { urlPrefiks } from './api/queries.ts';
// Viktig at ds-css importeres før AppContainer. Det gjør at Aksel+tailwind sin css laster før vår i de tilfellene vi vil overskrive.
import './index.css';

void bootstrapApp({
    sentryDsn: 'https://b4fd4db97e7d4663852a5203961e3cee@sentry.gc.nav.no/6',
    basename: urlPrefiks,
    availableLocales: ['nb', 'nn', 'en'],
    registerCountryLocales: false,
    app: <AppContainer />,
});
