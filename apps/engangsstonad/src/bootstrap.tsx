import { bootstrapApp } from '@navikt/fp-app-shell';

import { AppContainer } from './AppContainer';
import './index.css';
import './styles/globals.css';

void bootstrapApp({
    availableLocales: ['nb', 'nn', 'en'],
    withPluralRulesPolyfill: false,
    app: <AppContainer />,
});
