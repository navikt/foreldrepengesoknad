import '@formatjs/intl-pluralrules/locale-data/nb';
import '@formatjs/intl-pluralrules/polyfill.js';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import 'dayjs/locale/nb.js';
import 'dayjs/locale/nn.js';
import * as countries from 'i18n-iso-countries';
import * as langNB from 'i18n-iso-countries/langs/nb.json';
import * as langNN from 'i18n-iso-countries/langs/nn.json';
import { HTTPError } from 'ky';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { initSentry } from '@navikt/fp-observability';

import { AppContainer } from './AppContainer';
import './index.css';
import './styles/app.css';

countries.registerLocale(langNB);
countries.registerLocale(langNN);

dayjs.locale('nb');

initSentry({ dsn: 'https://8e90481464a4442db8c86bc31b9e41ad@sentry.gc.nav.no/11' });

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => {
            if (error instanceof HTTPError) {
                if (error.response?.status === 401) {
                    location.reload();
                }
            }
        },
    }),
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(
        <StrictMode>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools />
                    <AppContainer />
                </QueryClientProvider>
            </BrowserRouter>
        </StrictMode>,
    );
}
