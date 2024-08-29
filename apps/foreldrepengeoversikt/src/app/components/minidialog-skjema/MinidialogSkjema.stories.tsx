import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';

import { Ytelse } from 'app/types/Ytelse';

import MinidialogSkjema from './MinidialogSkjema';

const queryClient = new QueryClient();

const meta = {
    title: 'MinidialogSkjema',
    component: MinidialogSkjema,
    render: ({ onSubmit }) => {
        return (
            <QueryClientProvider client={queryClient}>
                <div style={{ backgroundColor: 'white', padding: '50px' }}>
                    <MinidialogSkjema
                        ettersendelseErSendt={false}
                        isSendingEttersendelse={false}
                        minidialog={{
                            dialogId: '1',
                            opprettet: '2020-01-01',
                            saksnr: '1',
                        }}
                        ettersendelseError={undefined}
                        onSubmit={onSubmit}
                        sakstype={Ytelse.FORELDREPENGER}
                    />
                </div>
            </QueryClientProvider>
        );
    },
} satisfies Meta<typeof MinidialogSkjema>;
export default meta;

type Story = StoryObj<typeof MinidialogSkjema>;

export const SkalIkkeFeileOpplasting: Story = {
    args: {
        onSubmit: action('button-click'),
    },
};

export const SkalFeileOpplasting: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post('/rest/storage/foreldrepenger/vedlegg', () => new HttpResponse(null, { status: 400 })),
            ],
        },
    },
};
