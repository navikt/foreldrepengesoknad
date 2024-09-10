import { Meta, StoryObj } from '@storybook/react/*';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Ytelse } from 'types/Ytelse';

import OversiktRoutes from 'app/routes/routes';

import EttersendingPage from './EttersendingPage';

const queryClient = new QueryClient();

const meta = {
    title: 'EttersendingPage',
    component: EttersendingPage,
    render: (props) => {
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/${OversiktRoutes.ETTERSEND}/1`]}>
                    <Routes>
                        <Route
                            element={<EttersendingPage {...props} />}
                            path={`/${OversiktRoutes.ETTERSEND}/:saksnummer`}
                        />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<typeof EttersendingPage>;
export default meta;

type Story = StoryObj<typeof meta>;

export const SkalIkkeFeileOpplasting: Story = {
    parameters: {
        msw: {
            handlers: [http.post('/rest/storage/engangsstonad/vedlegg', () => new HttpResponse(null, { status: 200 }))],
        },
    },
    args: {
        saker: {
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
        },
    },
};

export const SkalFeileOpplasting: Story = {
    parameters: {
        msw: {
            handlers: [http.post('/rest/storage/engangsstonad/vedlegg', () => new HttpResponse(null, { status: 400 }))],
        },
    },
    args: SkalIkkeFeileOpplasting.args,
};
