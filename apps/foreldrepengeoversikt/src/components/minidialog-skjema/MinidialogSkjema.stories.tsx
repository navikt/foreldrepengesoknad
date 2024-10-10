import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';

import { Ytelse } from './../../types/Ytelse';
import MinidialogSkjema from './MinidialogSkjema';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const meta = {
    title: 'MinidialogSkjema',
    component: MinidialogSkjema,
    render: (props) => {
        return (
            <QueryClientProvider client={queryClient}>
                <div style={{ backgroundColor: 'white', padding: '50px' }}>
                    <MinidialogSkjema {...props} />
                </div>
            </QueryClientProvider>
        );
    },
} satisfies Meta<typeof MinidialogSkjema>;
export default meta;

type Story = StoryObj<typeof meta>;

export const SkalIkkeFeileOpplasting: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(
                    'https://oversikt/rest/storage/foreldrepenger/vedlegg',
                    () => new HttpResponse(null, { status: 200 }),
                ),
            ],
        },
    },
    args: {
        onSubmit: action('button-click'),
        ettersendelseErSendt: false,
        isSendingEttersendelse: false,
        minidialog: {
            dialogId: '1',
            opprettet: '2020-01-01',
            saksnr: '1',
        },
        sakstype: Ytelse.FORELDREPENGER,
        ettersendelseError: undefined,
    },
};

export const SkalFeileOpplasting: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(
                    'https://oversikt/rest/storage/foreldrepenger/vedlegg',
                    () => new HttpResponse(null, { status: 400 }),
                ),
            ],
        },
    },
    args: SkalIkkeFeileOpplasting.args,
};
