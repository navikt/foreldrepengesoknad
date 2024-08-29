import { Meta, StoryObj } from '@storybook/react/*';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import manglendeVedlegg from 'storybook/storyData/manglendeVedlegg/manglendeVedlegg.json';
import saker from 'storybook/storyData/saker/saker.json';
import tidslinjeHendelser from 'storybook/storyData/tidslinjeHendelser/tidslinjeHendelser.json';

import OversiktRoutes from 'app/routes/routes';

import TidslinjePage from './TidslinjePage';

const queryClient = new QueryClient();

const meta = {
    title: 'TidslinjePage',
    component: TidslinjePage,
    render: () => {
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/${OversiktRoutes.TIDSLINJEN}/352011079`]}>
                    <Routes>
                        <Route
                            element={
                                <TidslinjePage
                                    søkersBarn={[
                                        {
                                            fornavn: 'Olga',
                                            etternavn: 'Utvikler',
                                            fnr: '23232424',
                                            fødselsdato: '2024-01-01',
                                            kjønn: 'K',
                                        },
                                    ]}
                                />
                            }
                            path={`/${OversiktRoutes.TIDSLINJEN}/:saksnummer`}
                        />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<typeof TidslinjePage>;
export default meta;

type Story = StoryObj<typeof TidslinjePage>;

export const Default: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('/rest/innsyn/v2/saker', () => HttpResponse.json(saker)),
                http.get('/rest/innsyn/tidslinje', () => HttpResponse.json(tidslinjeHendelser)),
                http.get('/rest/historikk/vedlegg', () => HttpResponse.json(manglendeVedlegg)),
            ],
        },
    },
};
