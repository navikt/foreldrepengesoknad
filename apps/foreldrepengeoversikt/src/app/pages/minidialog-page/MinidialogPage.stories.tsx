import { Meta, StoryObj } from '@storybook/react/*';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import saker from 'storybook/storyData/saker/saker.json';

import OversiktRoutes from 'app/routes/routes';

import MinidialogPage from './MinidialogPage';

const queryClient = new QueryClient();

const meta = {
    title: 'MinidialogPage',
    component: MinidialogPage,
    render: () => {
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/${OversiktRoutes.DIN_PLAN}/352011079/1111111112`]}>
                    <Routes>
                        <Route
                            element={<MinidialogPage fnr="12434" />}
                            path={`/${OversiktRoutes.DIN_PLAN}/:saksnummer/:oppgaveId`}
                        />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<typeof MinidialogPage>;
export default meta;

type Story = StoryObj<typeof MinidialogPage>;

export const Default: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('/rest/minidialog', () =>
                    HttpResponse.json([
                        {
                            saksnr: '352011079',
                            opprettet: '2023-02-09',
                            dialogId: '1111111112',
                        },
                    ]),
                ),
                http.get('/rest/innsyn/v2/saker', () => HttpResponse.json(saker)),
            ],
        },
    },
};
