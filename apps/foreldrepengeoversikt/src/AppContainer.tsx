import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import { Route, Routes } from 'react-router-dom';

import { Provider } from '@navikt/ds-react';
import { nb } from '@navikt/ds-react/locales';

import { formHookMessages } from '@navikt/fp-form-hooks';
import { ByttBrowserModal, IntlProvider, uiMessages } from '@navikt/fp-ui';
import { utilsMessages } from '@navikt/fp-utils';
import { uttaksplanKalenderMessages } from '@navikt/fp-uttaksplan-kalender-ny';
import { nyUttaksplanMessages } from '@navikt/fp-uttaksplan-ny';

import { Foreldrepengeoversikt } from './Foreldrepengeoversikt';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary';
import nbMessages from './intl/messages/nb_NO.json';
import { BruktOpplysniungerOmArbeidsforhold } from './pages/BruktOpplysningerOmArbeidsforhold/BruktOpplysningerOmArbeidsforhold.tsx';
import { OversiktRoutes } from './routes/routes.ts';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: process.env.NODE_ENV === 'test' ? false : 3,
        },
    },
});

const allNbMessages = {
    ...nbMessages,
    ...uiMessages.nb,
    ...utilsMessages.nb,
    ...nyUttaksplanMessages.nb,
    ...uttaksplanKalenderMessages.nb,
    ...formHookMessages.nb,
};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace FormatjsIntl {
        interface Message {
            ids: keyof typeof allNbMessages;
        }
    }
}

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: allNbMessages,
};

dayjs.locale('nb');

export const AppContainer = () => {
    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools />
                <Provider locale={nb}>
                    <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                        <ByttBrowserModal />
                        <Routes>
                            <Route
                                path={OversiktRoutes.BRUKT_OPPLYSNINGER_OM_ARBEIDSFORHOLD}
                                element={<BruktOpplysniungerOmArbeidsforhold />}
                            />
                            <Route path="*" element={<Foreldrepengeoversikt />} />
                        </Routes>
                    </IntlProvider>
                </Provider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
};
