import { bootstrapApp } from '@navikt/fp-app-shell';

import { AppContainer } from './AppContainer';
import './index.css';
import './styles/global.css';

void bootstrapApp({
    sentryDsn: 'https://4cb9a04935f48499fb83548dedbd4def@sentry.gc.nav.no/183',
    appName: 'veiviser-hvor-mye',
    availableLocales: ['nb', 'nn', 'en'],
    withPluralRulesPolyfill: false,
    app: <AppContainer />,
});
