import { Meta, StoryObj } from '@storybook/react/*';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { OversiktRoutes } from '../../routes/routes';
import { SakOppslag } from '../../types/SakOppslag';
import { EttersendingPage } from './EttersendingPage';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

interface QueryParamAwareEttersendingPage {
    saker: SakOppslag;
    skjematypeQueryParamValue?: string;
}

const meta: Meta<QueryParamAwareEttersendingPage> = {
    title: 'EttersendingPage',
    component: EttersendingPage,
    render: (props) => {
        const { skjematypeQueryParamValue, ...rest } = props as QueryParamAwareEttersendingPage;
        const queryString = skjematypeQueryParamValue ? `?skjematype=${skjematypeQueryParamValue}` : '';
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/${OversiktRoutes.ETTERSEND}/1${queryString}`]}>
                    <Routes>
                        <Route
                            element={<EttersendingPage {...rest} />}
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
            handlers: [
                http.post(`${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg`, () => {
                    return new HttpResponse(null, { status: 200 });
                }),
            ],
        },
    },
    args: {
        saker: {
            engangsstønad: [
                {
                    ytelse: 'ENGANGSSTØNAD',
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
            handlers: [
                http.post(`${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg`, () => {
                    return new HttpResponse(null, { status: 400 });
                }),
            ],
        },
    },
    args: SkalIkkeFeileOpplasting.args,
};
