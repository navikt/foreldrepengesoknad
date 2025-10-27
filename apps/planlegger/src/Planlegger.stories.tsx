import { Meta, StoryObj } from '@storybook/react-vite';
import { PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { API_URLS } from 'appData/queries';
import { HttpResponse, http } from 'msw';
import { ComponentProps, StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { DEFAULT_SATSER } from '@navikt/fp-constants';
import { KontoBeregningDto } from '@navikt/fp-types';
import { ErrorBoundary } from '@navikt/fp-ui';
import { withQueryClient } from '@navikt/fp-utils-test';

import { PlanleggerDataFetcher } from './Planlegger';

const STØNADSKONTOER = {
    '100': {
        kontoer: [
            {
                konto: 'MØDREKVOTE',
                dager: 75,
            },
            {
                konto: 'FEDREKVOTE',
                dager: 75,
            },
            {
                konto: 'FELLESPERIODE',
                dager: 80,
            },
            {
                konto: 'FORELDREPENGER_FØR_FØDSEL',
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
                konto: 'MØDREKVOTE',
                dager: 95,
            },
            {
                konto: 'FEDREKVOTE',
                dager: 95,
            },
            {
                konto: 'FELLESPERIODE',
                dager: 90,
            },
            {
                konto: 'FORELDREPENGER_FØR_FØDSEL',
                dager: 15,
            },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    },
} satisfies { '80': KontoBeregningDto; '100': KontoBeregningDto };

const meta = {
    title: 'PlanleggerDataFetcher',
    component: PlanleggerDataFetcher,
    decorators: [withQueryClient],
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.konto, async ({ request }) => {
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
                http.get(API_URLS.satser, async () => {
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
                http.post(API_URLS.konto, () => HttpResponse.json(STØNADSKONTOER)),
                http.get(API_URLS.satser, () => HttpResponse.json(DEFAULT_SATSER)),
            ],
        },
    },
};

export const FarFarMockaStønadskontoerOgSatser: Story = {
    ...Default,
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '100': {
                            kontoer: [
                                {
                                    konto: 'AKTIVITETSFRI_KVOTE',
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
                                    konto: 'AKTIVITETSFRI_KVOTE',
                                    dager: 95,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        },
                    } satisfies { '80': KontoBeregningDto; '100': KontoBeregningDto }),
                ),
                http.get(API_URLS.satser, () => HttpResponse.json(DEFAULT_SATSER)),
            ],
        },
    },
};
