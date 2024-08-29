import { Meta, StoryObj } from '@storybook/react/*';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { useRef } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import manglendeVedlegg from 'storybook/storyData/manglendeVedlegg/manglendeVedlegg.json';
import saker from 'storybook/storyData/saker/saker.json';
import søkerinfo from 'storybook/storyData/sokerinfo/sokerinfo.json';
import tidslinjeHendelser from 'storybook/storyData/tidslinjeHendelser/tidslinjeHendelser.json';

import OversiktRoutes from 'app/routes/routes';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';

import Forside from './Forside';

const queryClient = new QueryClient();

const meta = {
    title: 'Forside',
    component: Forside,
    render: () => {
        const isFirstRender = useRef(false);
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/${OversiktRoutes.TIDSLINJEN}/352011079`]}>
                    <Routes>
                        <Route
                            element={
                                <Forside
                                    // @ts-ignore Er backend og frontend-typar like her? Fiks!
                                    saker={saker}
                                    isFirstRender={isFirstRender}
                                    søkerinfo={søkerinfo as SøkerinfoDTO}
                                />
                            }
                            path={`/${OversiktRoutes.TIDSLINJEN}/:saksnummer`}
                        />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<typeof Forside>;
export default meta;

type Story = StoryObj<typeof Forside>;

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
