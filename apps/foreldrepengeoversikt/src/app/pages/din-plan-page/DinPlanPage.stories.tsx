import { Meta, StoryObj } from '@storybook/react/*';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import annenPartsVedtak from 'storybook/storyData/annenPartVedtak/annenPartVedtak.json';
import saker from 'storybook/storyData/saker/saker.json';
import søkerinfo from 'storybook/storyData/sokerinfo/sokerinfo.json';

import OversiktRoutes from 'app/routes/routes';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';

import DinPlanPage from './DinPlanPage';

const queryClient = new QueryClient();

const meta = {
    title: 'DinPlanPage',
    component: DinPlanPage,
    render: () => {
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/${OversiktRoutes.DIN_PLAN}/352011079`]}>
                    <Routes>
                        <Route
                            element={<DinPlanPage søkerinfo={søkerinfo as SøkerinfoDTO} />}
                            path={`/${OversiktRoutes.DIN_PLAN}/:saksnummer`}
                        />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<typeof DinPlanPage>;
export default meta;

type Story = StoryObj<typeof DinPlanPage>;

export const Default: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('/rest/innsyn/v2/saker', () => HttpResponse.json(saker)),
                http.post('/rest/innsyn/v2/annenPartVedtak', () => HttpResponse.json(annenPartsVedtak)),
            ],
        },
    },
};
