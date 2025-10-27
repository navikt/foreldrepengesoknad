import { Meta, StoryObj } from '@storybook/react-vite';
import { API_URLS } from 'appData/queries';
import { HttpResponse, http } from 'msw';
import { StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { DEFAULT_SATSER } from '@navikt/fp-constants';
import { KontoBeregningDto } from '@navikt/fp-types';

import { AppContainer } from './AppContainer';

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
    } satisfies KontoBeregningDto,
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
    } satisfies KontoBeregningDto,
};

const meta = {
    title: 'AppContainer',
    component: AppContainer,
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
                    <AppContainer />
                </MemoryRouter>
            </StrictMode>
        );
    },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const HvorMyeVeiviser: Story = {};

export const HvorMyeVeiviserMockaStønadskontoerOgSatser: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.konto, () => HttpResponse.json(STØNADSKONTOER)),
                http.get(API_URLS.satser, () => HttpResponse.json(DEFAULT_SATSER)),
            ],
        },
    },
};
