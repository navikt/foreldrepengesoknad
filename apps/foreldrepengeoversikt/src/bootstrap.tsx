import { bootstrapApp } from '@navikt/fp-app-shell';

import { AppContainer } from './AppContainer';
import { urlPrefiks } from './api/queries.ts';
// Viktig at ds-css importeres før AppContainer. Det gjør at Aksel+tailwind sin css laster før vår i de tilfellene vi vil overskrive.
import './index.css';

if (import.meta.env.MODE === 'mock') {
    const { startMock } = await import('./mock/startMock.ts');
    await startMock();
}

void bootstrapApp({
    basename: urlPrefiks,
    availableLocales: ['nb', 'nn', 'en'],
    registerCountryLocales: false,
    app: <AppContainer />,
});
