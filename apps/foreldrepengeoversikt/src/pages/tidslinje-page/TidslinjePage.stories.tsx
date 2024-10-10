import { Meta, StoryObj } from '@storybook/react/*';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import manglendeVedlegg from 'storybookData/manglendeVedlegg/manglendeVedlegg.json';
import saker from 'storybookData/saker/saker.json';
import tidslinjeHendelser from 'storybookData/tidslinjeHendelser/tidslinjeHendelser.json';

import OversiktRoutes from './../../routes/routes';
import TidslinjePage from './TidslinjePage';

const queryClient = new QueryClient();

const meta = {
    title: 'TidslinjePage',
    component: TidslinjePage,
    render: (props) => {
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/${OversiktRoutes.TIDSLINJEN}/352011079`]}>
                    <Routes>
                        <Route
                            element={<TidslinjePage {...props} />}
                            path={`/${OversiktRoutes.TIDSLINJEN}/:saksnummer`}
                        />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<typeof TidslinjePage>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('https://oversikt/rest/innsyn/v2/saker', () => HttpResponse.json(saker)),
                http.get('https://oversikt/rest/innsyn/tidslinje', () => HttpResponse.json(tidslinjeHendelser)),
                http.get('https://oversikt/rest/historikk/vedlegg', () => HttpResponse.json(manglendeVedlegg)),
            ],
        },
    },
    args: {
        søkersBarn: [
            {
                fornavn: 'Olga',
                etternavn: 'Utvikler',
                fnr: '23232424',
                fødselsdato: '2024-01-01',
                kjønn: 'K',
            },
        ],
    },
};
