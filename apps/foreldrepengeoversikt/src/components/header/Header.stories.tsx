import { Meta, StoryObj } from '@storybook/react/*';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import saker from 'storybookData/saker/saker.json';

import { OversiktRoutes } from './../../routes/routes';
import { DinSakHeader } from './Header';

const queryClient = new QueryClient();

const meta = {
    title: 'DinSakHeader',
    component: DinSakHeader,
    render: (params) => {
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/${OversiktRoutes.DIN_PLAN}/352011079`]}>
                    <Routes>
                        <Route
                            element={<DinSakHeader {...params} />}
                            path={`/${OversiktRoutes.DIN_PLAN}/:saksnummer`}
                        />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<typeof DinSakHeader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultDinSakHeader: Story = {
    args: {
        //@ts-ignore Sjekk om ytelse litt i backend
        sak: saker.foreldrepenger[0],
    },
};
