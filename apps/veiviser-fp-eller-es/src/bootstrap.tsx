import { bootstrapApp } from '@navikt/fp-app-shell';

import { AppContainer } from './AppContainer';
import './index.css';
import './styles/global.css';

void bootstrapApp({
    sentryDsn: 'https://db0c0715bf2e0b91044c530296065174@sentry.gc.nav.no/182',
    appName: 'veiviser-fp-eller-es',
    availableLocales: ['nb', 'nn', 'en'],
    withPluralRulesPolyfill: false,
    app: <AppContainer />,
});
