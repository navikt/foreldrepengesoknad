import { Meta, StoryObj } from '@storybook/react/*';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import dokumenter from 'storybookData/dokumenter/dokumenter.json';

import OversiktRoutes from 'app/routes/routes';

import DokumenterPage from './DokumenterPage';

const queryClient = new QueryClient();

const meta = {
    title: 'DokumenterPage',
    component: DokumenterPage,
    render: () => {
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/${OversiktRoutes.DOKUMENTER}/1`]}>
                    <Routes>
                        <Route element={<DokumenterPage />} path={`/${OversiktRoutes.DOKUMENTER}/:saksnummer`} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<typeof DokumenterPage>;
export default meta;

type Story = StoryObj<typeof DokumenterPage>;

export const Default: Story = {
    parameters: {
        msw: {
            handlers: [http.get('/rest/dokument/alle', () => HttpResponse.json(dokumenter))],
        },
    },
};
