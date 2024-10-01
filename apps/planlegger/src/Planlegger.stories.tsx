import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { HttpResponse, http } from 'msw';
import { ComponentProps, StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { StønadskontoType } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';
import { TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { ErrorBoundary, IntlProvider, uiMessages } from '@navikt/fp-ui';

import { PlanleggerDataFetcher } from './Planlegger';
import enMessages from './intl/messages/en_US.json';
import nbMessages from './intl/messages/nb_NO.json';
import nnMessages from './intl/messages/nn_NO.json';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const STØNADSKONTOER = {
    '100': {
        kontoer: [
            {
                konto: StønadskontoType.Mødrekvote,
                dager: 75,
            },
            {
                konto: StønadskontoType.Fedrekvote,
                dager: 75,
            },
            {
                konto: StønadskontoType.Fellesperiode,
                dager: 80,
            },
            {
                konto: StønadskontoType.ForeldrepengerFørFødsel,
                dager: 15,
            },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    },
    '80': {
        kontoer: [
            {
                konto: StønadskontoType.Mødrekvote,
                dager: 95,
            },
            {
                konto: StønadskontoType.Fedrekvote,
                dager: 95,
            },
            {
                konto: StønadskontoType.Fellesperiode,
                dager: 90,
            },
            {
                konto: StønadskontoType.ForeldrepengerFørFødsel,
                dager: 15,
            },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    },
} as TilgjengeligeStønadskontoer;

const SATSER = {
    engangstønad: [
        {
            fom: '01.01.2023',
            verdi: 92648,
        },
        {
            fom: '01.01.2021',
            verdi: 90300,
        },
    ],
    grunnbeløp: [
        {
            fom: '01.05.2024',
            verdi: 124028,
        },
        {
            fom: '01.05.2023',
            verdi: 118620,
        },
    ],
};

const allNbMessages = { ...nbMessages, ...uiMessages.nb };

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: allNbMessages,
    nn: { ...nnMessages, ...uiMessages.nn },
    en: { ...enMessages, ...uiMessages.en },
};

const meta = {
    title: 'PlanleggerDataFetcher',
    component: PlanleggerDataFetcher,
    parameters: {
        msw: {
            handlers: [
                http.post('https://pl/rest/konto', async ({ request }) => {
                    const body = await request.json();
                    const response = await fetch('https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto', {
                        body: JSON.stringify(body),
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const json = await response.json();
                    return HttpResponse.json(json);
                }),
                http.get('https://pl/rest/satser', async () => {
                    const response = await fetch('https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser');
                    const json = await response.json();
                    return HttpResponse.json(json);
                }),
            ],
        },
    },
    render: () => {
        initAmplitude();
        return (
            <StrictMode>
                <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                    <ErrorBoundary appName="Foreldrepengeplanlegger" retryCallback={() => undefined}>
                        <QueryClientProvider client={queryClient}>
                            <MemoryRouter>
                                <PlanleggerDataContext initialState={{}}>
                                    <PlanleggerDataFetcher locale="nb" changeLocale={() => undefined} />
                                </PlanleggerDataContext>
                            </MemoryRouter>
                        </QueryClientProvider>
                    </ErrorBoundary>
                </IntlProvider>
            </StrictMode>
        );
    },
} satisfies Meta<ComponentProps<typeof PlanleggerDataFetcher>>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        changeLocale: () => undefined,
        locale: 'nb',
    },
};

export const DefaultMockaStønadskontoerOgSatser: Story = {
    ...Default,
    parameters: {
        msw: {
            handlers: [
                http.post('https://pl/rest/konto', () => HttpResponse.json(STØNADSKONTOER)),
                http.get('https://pl/rest/satser', () => HttpResponse.json(SATSER)),
            ],
        },
    },
};
