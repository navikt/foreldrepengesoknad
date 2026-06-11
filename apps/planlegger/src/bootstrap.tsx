import { bootstrapApp } from '@navikt/fp-app-shell';

import { AppContainer } from './AppContainer';
import './index.css';
import './styles/global.css';

void bootstrapApp({
    sentryDsn: 'https://b6072f817d64f96c64eb45747c2dfeea@sentry.gc.nav.no/181',
    appName: 'planlegger',
    availableLocales: ['nb', 'nn', 'en'],
    withPluralRulesPolyfill: false,
    app: <AppContainer />,
});
