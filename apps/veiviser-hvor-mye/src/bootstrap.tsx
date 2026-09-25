import { bootstrapApp } from '@navikt/fp-app-shell';

import { AppContainer } from './AppContainer';
import './index.css';
import './styles/global.css';

void bootstrapApp({
    availableLocales: ['nb', 'nn', 'en'],
    app: <AppContainer />,
});
