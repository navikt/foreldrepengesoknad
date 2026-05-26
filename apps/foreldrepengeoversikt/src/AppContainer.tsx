import { Route, Routes } from 'react-router-dom';

import { AppShell, createDefaultQueryClient } from '@navikt/fp-app-shell';
import { filopplasterMessages } from '@navikt/fp-filopplaster';
import { formHookMessages } from '@navikt/fp-form-hooks';
import { observabilityMessages } from '@navikt/fp-observability';
import { uiMessages } from '@navikt/fp-ui';
import { utilsMessages } from '@navikt/fp-utils';
import { nyUttaksplanMessages } from '@navikt/fp-uttaksplan';

import { Foreldrepengeoversikt } from './Foreldrepengeoversikt';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary';
import enMessages from './intl/messages/en_US.json';
import nbMessages from './intl/messages/nb_NO.json';
import nnMessages from './intl/messages/nn_NO.json';
import { BruktOpplysningerOmArbeidsforhold } from './pages/BruktOpplysningerOmArbeidsforhold/BruktOpplysningerOmArbeidsforhold.tsx';
import { OversiktRoutes } from './routes/routes.ts';

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: {
        ...nbMessages,
        ...uiMessages.nb,
        ...utilsMessages.nb,
        ...nyUttaksplanMessages.nb,
        ...formHookMessages.nb,
        ...filopplasterMessages.nb,
        ...observabilityMessages.nb,
    },
    nn: {
        ...nnMessages,
        ...uiMessages.nn,
        ...utilsMessages.nn,
        ...nyUttaksplanMessages.nn,
        ...formHookMessages.nn,
        ...filopplasterMessages.nn,
        ...observabilityMessages.nn,
    },
    en: {
        ...enMessages,
        ...uiMessages.en,
        ...utilsMessages.en,
        ...nyUttaksplanMessages.en,
        ...formHookMessages.en,
        ...filopplasterMessages.en,
        ...observabilityMessages.en,
    },
};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace FormatjsIntl {
        interface Message {
            ids: keyof typeof MESSAGES_GROUPED_BY_LOCALE.nb;
        }
    }
}

const queryClient = createDefaultQueryClient({
    sentryQueryErrorMessage: 'API query-feil i foreldrepengeoversikt',
});

export const AppContainer = () => (
    <AppShell
        appName="foreldrepengeoversikt"
        availableLocales={['nb', 'nn', 'en']}
        messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}
        queryClient={queryClient}
        withByttBrowserModal
        renderErrorBoundary={(children) => <ErrorBoundary>{children}</ErrorBoundary>}
    >
        <Routes>
            {/* Informasjonssiden er plassert her for å unngå fetching av persondata vi ikke har grunnlag for */}
            <Route
                path={OversiktRoutes.BRUKT_OPPLYSNINGER_OM_ARBEIDSFORHOLD}
                element={<BruktOpplysningerOmArbeidsforhold />}
            />
            <Route path="*" element={<Foreldrepengeoversikt />} />
        </Routes>
    </AppShell>
);
