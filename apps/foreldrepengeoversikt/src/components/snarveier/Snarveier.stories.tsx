import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { saker } from 'storybookData/saker/saker';

import { OversiktRoutes } from '../../routes/routes';
import { Snarveier } from './Snarveier';

const queryClient = new QueryClient();

const meta = {
    title: 'Snarveier',
    component: Snarveier,
    render: () => {
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/${OversiktRoutes.DIN_PLAN}/352011079`]}>
                    <Routes>
                        <Route element={<Snarveier />} path={`/${OversiktRoutes.DIN_PLAN}/:saksnummer`} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<typeof Snarveier>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        msw: {
            handlers: [http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker))],
        },
    },
};
