import { bootstrapApp } from '@navikt/fp-app-shell';

import { AppContainer } from './AppContainer';
import './index.css';
import './styles/app.css';

void bootstrapApp({
    availableLocales: ['nb', 'nn'],
    app: <AppContainer />,
});
