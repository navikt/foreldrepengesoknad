import { Meta, StoryObj } from '@storybook/react-vite';
import { API_URLS } from 'appData/queries';
import { HttpResponse, http } from 'msw';
import { StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import type { KontoBeregningResultatDto } from '@navikt/fp-types';

import { AppContainer } from './AppContainer';

const STØNADSKVOTER_FALLBACK = {
    '100': {
        kontoer: [
            { konto: 'MØDREKVOTE', dager: 75 },
            { konto: 'FEDREKVOTE', dager: 75 },
            { konto: 'FELLESPERIODE', dager: 80 },
            { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    },
    '80': {
        kontoer: [
            { konto: 'MØDREKVOTE', dager: 95 },
            { konto: 'FEDREKVOTE', dager: 95 },
            { konto: 'FELLESPERIODE', dager: 90 },
            { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    },
} satisfies KontoBeregningResultatDto;

const KONTO_REQUEST_TIMEOUT_MS = 500;

const createKontoHandler = () =>
    http.post(API_URLS.konto, async ({ request }) => {
        const body = await request.json();
        const abortController = new AbortController();
        const timeout = setTimeout(() => abortController.abort(), KONTO_REQUEST_TIMEOUT_MS);

        try {
            const response = await fetch('https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto', {
                body: JSON.stringify(body),
                method: 'POST',
                signal: abortController.signal,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Klarte ikke hente kontoer: ${response.status}`);
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const json = await response.json();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            return HttpResponse.json(json);
        } catch {
            return HttpResponse.json(STØNADSKVOTER_FALLBACK);
        } finally {
            clearTimeout(timeout);
        }
    });

const meta = {
    title: 'AppContainer',
    component: AppContainer,
    parameters: {
        msw: {
            handlers: [createKontoHandler()],
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

export const HvorMyeVeiviserMockaStønadskvoterOgSatser: Story = {
    parameters: {
        msw: {
            handlers: [createKontoHandler()],
        },
    },
};
