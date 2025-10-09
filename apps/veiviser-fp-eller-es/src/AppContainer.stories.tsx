import { Meta, StoryObj } from '@storybook/react-vite';
import { API_URLS } from 'appData/queries';
import { HttpResponse, http } from 'msw';
import { StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { DEFAULT_SATSER } from '@navikt/fp-constants';

import { AppContainer } from './AppContainer';

const meta = {
    title: 'AppContainer',
    component: AppContainer,
    parameters: {
        msw: {
            handlers: [
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

export const FpEllerEsVeiviser: Story = {};

export const FpEllerEsVeiviserMockaStønadskontoerOgSatser: Story = {
    parameters: {
        msw: {
            handlers: [http.get(API_URLS.satser, () => HttpResponse.json(DEFAULT_SATSER))],
        },
    },
};
