import { bootstrapApp } from '@navikt/fp-app-shell';

import { AppContainer } from './AppContainer';
import './index.css';
import './styles/app.css';

void bootstrapApp({
    sentryDsn: 'https://8e90481464a4442db8c86bc31b9e41ad@sentry.gc.nav.no/11',
    availableLocales: ['nb', 'nn'],
    app: <AppContainer />,
});
