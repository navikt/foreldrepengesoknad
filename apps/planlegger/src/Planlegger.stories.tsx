import { Meta, StoryObj } from '@storybook/react';
import { PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { HttpResponse, http } from 'msw';
import { ComponentProps, StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { StønadskontoType } from '@navikt/fp-constants';
import { TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { ErrorBoundary, IntlProvider, uiMessages } from '@navikt/fp-ui';
import { withQueryClient } from '@navikt/fp-utils-test';
import { uttaksplanKalenderMessages } from '@navikt/fp-uttaksplan-kalender-ny';

import { PlanleggerDataFetcher } from './Planlegger';
import enMessages from './intl/messages/en_US.json';
import nbMessages from './intl/messages/nb_NO.json';
import nnMessages from './intl/messages/nn_NO.json';

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

const allNbMessages = { ...nbMessages, ...uiMessages.nb, ...uttaksplanKalenderMessages.nb };

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: allNbMessages,
    nn: { ...nnMessages, ...uiMessages.nn, ...uttaksplanKalenderMessages.nn },
    en: { ...enMessages, ...uiMessages.en },
};

const meta = {
    title: 'PlanleggerDataFetcher',
    component: PlanleggerDataFetcher,
    decorators: [withQueryClient],
    parameters: {
        msw: {
            handlers: [
                http.post(`${import.meta.env.BASE_URL}/rest/konto`, async ({ request }) => {
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
                http.get(`${import.meta.env.BASE_URL}/rest/satser`, async () => {
                    const response = await fetch('https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser');
                    const json = await response.json();
                    return HttpResponse.json(json);
                }),
            ],
        },
    },
    render: () => {
        return (
            <StrictMode>
                <MemoryRouter>
                    <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                        <ErrorBoundary appName="planlegger" retryCallback={() => undefined}>
                            <PlanleggerDataContext initialState={{}}>
                                <PlanleggerDataFetcher locale="nb" changeLocale={() => undefined} />
                            </PlanleggerDataContext>
                        </ErrorBoundary>
                    </IntlProvider>
                </MemoryRouter>
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
                http.post(`${import.meta.env.BASE_URL}/rest/konto`, () => HttpResponse.json(STØNADSKONTOER)),
                http.get(`${import.meta.env.BASE_URL}/rest/satser`, () => HttpResponse.json(SATSER)),
            ],
        },
    },
};
