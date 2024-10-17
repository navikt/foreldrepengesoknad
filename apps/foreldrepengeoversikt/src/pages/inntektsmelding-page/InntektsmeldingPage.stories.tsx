import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import im1 from 'storybookData/inntektsmeldinger/im1.json';
import saker from 'storybookData/saker/saker.json';

import OversiktRoutes from '../../routes/routes';
import { InntektsmeldingPage } from './InntektsmeldingPage';

const queryClient = new QueryClient();

type StoryArgs = {};

const meta = {
    title: 'Inntektsmelding',
    render: () => {
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter
                    initialEntries={[
                        `${OversiktRoutes.SAKSOVERSIKT}/352011079/${OversiktRoutes.INNTEKTSMELDING}/1017115920`,
                    ]}
                >
                    <Routes>
                        <Route
                            element={<InntektsmeldingPage />}
                            path={`${OversiktRoutes.SAKSOVERSIKT}/:saksnummer/${OversiktRoutes.INNTEKTSMELDING}/:journalpostId`}
                        />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('https://oversikt/rest/innsyn/inntektsmeldinger', () => HttpResponse.json(im1)),
                http.get('https://oversikt/rest/innsyn/v2/saker', () => HttpResponse.json(saker)),
            ],
        },
    },
    args: {},
};
