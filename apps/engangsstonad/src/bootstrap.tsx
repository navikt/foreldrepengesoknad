import { bootstrapApp } from '@navikt/fp-app-shell';

import { AppContainer } from './AppContainer';
import './index.css';
import './styles/globals.css';

void bootstrapApp({
    sentryDsn: 'https://e2de35941445465aae1e83fcbcc2934d@sentry.gc.nav.no/8',
    appName: 'engangsstonad',
    availableLocales: ['nb', 'nn', 'en'],
    withPluralRulesPolyfill: false,
    app: <AppContainer />,
});
