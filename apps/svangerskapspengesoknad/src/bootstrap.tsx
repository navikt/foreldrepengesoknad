import { bootstrapApp } from '@navikt/fp-app-shell';

import { AppContainer } from './AppContainer';
import './index.css';

void bootstrapApp({
    sentryDsn: 'https://b28b752e32e846dd9818f2eb7a9fc013@sentry.gc.nav.no/7',
    availableLocales: ['nb', 'nn'],
    app: <AppContainer />,
});
