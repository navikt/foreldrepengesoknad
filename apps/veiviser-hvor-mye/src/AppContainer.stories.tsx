import { Meta, StoryObj } from '@storybook/react-vite';
import { API_URLS } from 'appData/queries';
import { HttpResponse, http } from 'msw';
import { StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { AppContainer } from './AppContainer';

const meta = {
    title: 'AppContainer',
    component: AppContainer,
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.konto, async ({ request }) => {
                    const body = await request.json();
                    const response = await fetch('https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto', {
                        body: JSON.stringify(body),
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    const json = await response.json();
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
                [
                    http.post(API_URLS.konto, async ({ request }) => {
                        const body = await request.json();
                        const response = await fetch('https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto', {
                            body: JSON.stringify(body),
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        const json = await response.json();
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        return HttpResponse.json(json);
                    }),
                ],
            ],
        },
    },
};
