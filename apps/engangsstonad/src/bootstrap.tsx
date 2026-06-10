import { bootstrapApp } from '@navikt/fp-app-shell';
import { initFaro } from '@navikt/fp-observability';

import { AppContainer } from './AppContainer';
import './index.css';
import './styles/globals.css';

initFaro({
    app: {
        name: 'engangsstonad',
        namespace: 'teamforeldrepenger',
        version: import.meta.env.VITE_SENTRY_RELEASE,
    },
});

void bootstrapApp({
    sentryDsn: 'https://e2de35941445465aae1e83fcbcc2934d@sentry.gc.nav.no/8',
    availableLocales: ['nb', 'nn', 'en'],
    withPluralRulesPolyfill: false,
    app: <AppContainer />,
});
