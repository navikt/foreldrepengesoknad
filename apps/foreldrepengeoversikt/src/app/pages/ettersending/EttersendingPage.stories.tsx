import { Meta, StoryObj } from '@storybook/react/*';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import OversiktRoutes from 'app/routes/routes';
import { Ytelse } from 'app/types/Ytelse';

import EttersendingPage from './EttersendingPage';

const queryClient = new QueryClient();

const meta = {
    title: 'EttersendingPage',
    component: EttersendingPage,
    render: () => {
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/${OversiktRoutes.ETTERSEND}/1`]}>
                    <Routes>
                        <Route
                            element={
                                <EttersendingPage
                                    saker={{
                                        engangsstønad: [
                                            {
                                                ytelse: Ytelse.ENGANGSSTØNAD,
                                                saksnummer: '1',
                                                sakAvsluttet: false,
                                                gjelderAdopsjon: false,
                                                familiehendelse: {
                                                    fødselsdato: '2020-01-01',
                                                    antallBarn: 1,
                                                },
                                                oppdatertTidspunkt: '2024-02-28T21:19:08.911',
                                            },
                                        ],
                                        foreldrepenger: [],
                                        svangerskapspenger: [],
                                    }}
                                />
                            }
                            path={`/${OversiktRoutes.ETTERSEND}/:saksnummer`}
                        />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<typeof EttersendingPage>;
export default meta;

type Story = StoryObj<typeof EttersendingPage>;

export const SkalIkkeFeileOpplasting: Story = {
    parameters: {
        msw: {
            handlers: [http.post('/rest/storage/engangsstonad/vedlegg', () => new HttpResponse(null, { status: 200 }))],
        },
    },
};

export const SkalFeileOpplasting: Story = {
    parameters: {
        msw: {
            handlers: [http.post('/rest/storage/engangsstonad/vedlegg', () => new HttpResponse(null, { status: 400 }))],
        },
    },
};
