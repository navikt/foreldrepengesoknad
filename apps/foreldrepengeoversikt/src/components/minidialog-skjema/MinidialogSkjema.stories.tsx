import { Meta, StoryObj } from '@storybook/react-vite';
import { HttpResponse, http } from 'msw';
import { action } from 'storybook/actions';

import { withQueryClient } from '@navikt/fp-utils-test';

import { API_URLS } from '../../api/api.ts';
import { MinidialogSkjema } from './MinidialogSkjema';

const meta = {
    title: 'MinidialogSkjema',
    component: MinidialogSkjema,
    decorators: [withQueryClient],
    render: (props) => {
        return (
            <div style={{ backgroundColor: 'white', padding: '50px' }}>
                <MinidialogSkjema {...props} />
            </div>
        );
    },
} satisfies Meta<typeof MinidialogSkjema>;
export default meta;

type Story = StoryObj<typeof meta>;

export const SkalIkkeFeileOpplasting: Story = {
    parameters: {
        msw: {
            handlers: [http.post(API_URLS.lastOppFPVedlegg, () => new HttpResponse(null, { status: 200 }))],
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
        sakstype: 'FORELDREPENGER',
        ettersendelseError: undefined,
    },
};

export const SkalFeileOpplasting: Story = {
    parameters: {
        msw: {
            handlers: [http.post(API_URLS.lastOppFPVedlegg, () => new HttpResponse(null, { status: 400 }))],
        },
    },
    args: SkalIkkeFeileOpplasting.args,
};
