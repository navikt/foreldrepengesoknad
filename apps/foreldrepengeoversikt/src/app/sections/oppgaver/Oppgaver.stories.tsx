import { Meta, StoryObj } from '@storybook/react/*';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { MemoryRouter } from 'react-router-dom';

import Oppgaver from './Oppgaver';

const queryClient = new QueryClient();

const meta = {
    title: 'Oppgaver',
    component: Oppgaver,
    render: () => {
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <Oppgaver saksnummer="352011079" />
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<typeof Oppgaver>;
export default meta;

type Story = StoryObj<typeof Oppgaver>;

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
            ],
        },
    },
};

export const FeilIMinidialogApiKall: Story = {
    parameters: {
        msw: {
            handlers: [http.get('/rest/minidialog', () => new HttpResponse(null, { status: 400 }))],
        },
    },
};
