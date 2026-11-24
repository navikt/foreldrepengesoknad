import { bootstrapApp } from '@navikt/fp-app-shell';

import { AppContainer } from './AppContainer';
import './index.css';
import './styles/app.css';

if (import.meta.env.MODE === 'mock') {
    const [{ startMockModus }, { scenarioer }] = await Promise.all([
        import('@navikt/fp-utils-test/mock'),
        import('../mock/scenarioer.ts'),
    ]);
    await startMockModus(scenarioer);
}

void bootstrapApp({
    availableLocales: ['nb', 'nn'],
    app: <AppContainer />,
});
