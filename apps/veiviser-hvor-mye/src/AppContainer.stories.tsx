import { API_URLS } from 'appData/queries';
import { HttpResponse, http } from 'msw';
import { StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import preview from '../.storybook/preview';
import { AppContainer } from './AppContainer';

const meta = preview.meta({
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
});
export default meta;

export const HvorMyeVeiviser = meta.story({});

export const HvorMyeVeiviserMockaStønadskvoterOgSatser = meta.story({
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
    test: async () => {
        // TODO: Migrate the old full veiviser flow test here when this story is ready
        // for stable end-to-end interaction assertions in Storybook.
        //
        // Old test intent:
        // - start veiviseren
        // - fill inn tre måneder med inntekt
        // - verify oppsummering
        // - go back to spørsmålene
    },
});
