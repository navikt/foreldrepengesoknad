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

import { SøkerinfoDTO } from '../../types/SøkerinfoDTO';
import OversiktRoutes from './../../routes/routes';
import Saksoversikt from './Saksoversikt';

const queryClient = new QueryClient();

type StoryArgs = {
    søkerinfo: SøkerinfoDTO;
};

const meta = {
    title: 'Saksoversikt',
    render: (props) => {
        const isFirstRender = useRef(false);
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/${OversiktRoutes.DIN_PLAN}/352011079`]}>
                    <Routes>
                        <Route
                            element={<Saksoversikt {...props} isFirstRender={isFirstRender} />}
                            path={`/${OversiktRoutes.DIN_PLAN}/:saksnummer`}
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
                http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)),
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)),
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () =>
                    HttpResponse.json(tidslinjeHendelser),
                ),
                http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () =>
                    HttpResponse.json(manglendeVedlegg),
                ),
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)),
                http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () =>
                    HttpResponse.json(annenPartsVedtak),
                ),
            ],
        },
    },
    args: {
        søkerinfo: søkerinfo as SøkerinfoDTO,
    },
};
