import { Meta, StoryObj } from '@storybook/react/*';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { useRef } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { manglendeVedlegg } from 'storybookData/manglendeVedlegg/manglendeVedlegg';
import { saker } from 'storybookData/saker/saker';
import { søkerinfo } from 'storybookData/sokerinfo/sokerinfo';
import { tidslinjeHendelser } from 'storybookData/tidslinjeHendelser/tidslinjeHendelser';

import { OversiktRoutes } from '../../routes/routes';
import { SakOppslag } from '../../types/SakOppslag';
import { SøkerinfoDTO } from '../../types/SøkerinfoDTO';
import Forside from './Forside';

const queryClient = new QueryClient();

type StoryArgs = {
    saker: SakOppslag;
    søkerinfo: SøkerinfoDTO;
};

const meta = {
    title: 'Forside',
    render: (props) => {
        const isFirstRender = useRef(false);
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/${OversiktRoutes.TIDSLINJEN}/352011079`]}>
                    <Routes>
                        <Route
                            element={<Forside {...props} isFirstRender={isFirstRender} />}
                            path={`/${OversiktRoutes.TIDSLINJEN}/:saksnummer`}
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
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)),
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () =>
                    HttpResponse.json(tidslinjeHendelser),
                ),
                http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () =>
                    HttpResponse.json(manglendeVedlegg),
                ),
            ],
        },
    },
    args: {
        // @ts-ignore Er backend og frontend-typar like her? Fiks!
        saker,
        søkerinfo: søkerinfo as SøkerinfoDTO,
    },
};
