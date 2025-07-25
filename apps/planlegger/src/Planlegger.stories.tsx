import { Meta, StoryObj } from '@storybook/react-vite';
import { PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { HttpResponse, http } from 'msw';
import { ComponentProps, StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { DEFAULT_SATSER, StønadskontoType } from '@navikt/fp-constants';
import { TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { ErrorBoundary } from '@navikt/fp-ui';
import { withQueryClient } from '@navikt/fp-utils-test';

import { PlanleggerDataFetcher } from './Planlegger';

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
} satisfies TilgjengeligeStønadskontoer;

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
                    <ErrorBoundary appName="planlegger" retryCallback={() => undefined}>
                        <PlanleggerDataContext initialState={{}}>
                            <PlanleggerDataFetcher />
                        </PlanleggerDataContext>
                    </ErrorBoundary>
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
                http.get(`${import.meta.env.BASE_URL}/rest/satser`, () => HttpResponse.json(DEFAULT_SATSER)),
            ],
        },
    },
};

export const FarFarMockaStønadskontoerOgSatser: Story = {
    ...Default,
    parameters: {
        msw: {
            handlers: [
                http.post(`${import.meta.env.BASE_URL}/rest/konto`, () =>
                    HttpResponse.json({
                        '100': {
                            kontoer: [
                                {
                                    konto: StønadskontoType.AktivitetsfriKvote,
                                    dager: 75,
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
                                    konto: StønadskontoType.AktivitetsfriKvote,
                                    dager: 95,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        },
                    } as TilgjengeligeStønadskontoer),
                ),
                http.get(`${import.meta.env.BASE_URL}/rest/satser`, () => HttpResponse.json(DEFAULT_SATSER)),
            ],
        },
    },
};
