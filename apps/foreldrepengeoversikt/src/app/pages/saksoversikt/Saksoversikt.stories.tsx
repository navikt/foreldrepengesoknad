import { Meta, StoryObj } from '@storybook/react/*';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { useRef } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import annenPartsVedtak from 'storybookData/annenPartVedtak/annenPartVedtak.json';
import dokumenter from 'storybookData/dokumenter/dokumenter.json';
import manglendeVedlegg from 'storybookData/manglendeVedlegg/manglendeVedlegg.json';
import saker from 'storybookData/saker/saker.json';
import søkerinfo from 'storybookData/sokerinfo/sokerinfo.json';
import tidslinjeHendelser from 'storybookData/tidslinjeHendelser/tidslinjeHendelser.json';

import OversiktRoutes from 'app/routes/routes';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';

import Saksoversikt from './Saksoversikt';

const queryClient = new QueryClient();

const meta = {
    title: 'Saksoversikt',
    component: Saksoversikt,
    render: () => {
        const isFirstRender = useRef(false);
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/${OversiktRoutes.DIN_PLAN}/352011079`]}>
                    <Routes>
                        <Route
                            element={
                                <Saksoversikt søkerinfo={søkerinfo as SøkerinfoDTO} isFirstRender={isFirstRender} />
                            }
                            path={`/${OversiktRoutes.DIN_PLAN}/:saksnummer`}
                        />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<typeof Saksoversikt>;
export default meta;

type Story = StoryObj<typeof Saksoversikt>;

export const Default: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('/rest/dokument/alle', () => HttpResponse.json(dokumenter)),
                http.get('/rest/innsyn/v2/saker', () => HttpResponse.json(saker)),
                http.get('/rest/innsyn/tidslinje', () => HttpResponse.json(tidslinjeHendelser)),
                http.get('/rest/historikk/vedlegg', () => HttpResponse.json(manglendeVedlegg)),
                http.get('/rest/innsyn/v2/saker/oppdatert', () => HttpResponse.json(true)),
                http.post('/rest/innsyn/v2/annenPartVedtak', () => HttpResponse.json(annenPartsVedtak)),
            ],
        },
    },
};
