import { bootstrapApp } from '@navikt/fp-app-shell';

import { AppContainer } from './AppContainer';
import './index.css';
import './styles/app.css';

if (import.meta.env.MODE === 'mock') {
    const { startMock } = await import('../mock/startMock.ts');
    await startMock();
}

void bootstrapApp({
    availableLocales: ['nb', 'nn'],
    app: <AppContainer />,
});
