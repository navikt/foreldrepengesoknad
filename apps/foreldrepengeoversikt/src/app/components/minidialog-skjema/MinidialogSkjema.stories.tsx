import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';

import '@navikt/ds-css';

import { Ytelse } from 'app/types/Ytelse';

import MinidialogSkjema from './MinidialogSkjema';

const queryClient = new QueryClient();

export default {
    title: 'MinidialogSkjema',
    component: MinidialogSkjema,
};

const Template: StoryFn<{ send: () => void }> = ({ send }) => {
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
                    onSubmit={send}
                    sakstype={Ytelse.FORELDREPENGER}
                />
            </div>
        </QueryClientProvider>
    );
};

export const SkalIkkeFeileOpplasting = Template.bind({});
SkalIkkeFeileOpplasting.args = {
    send: action('button-click'),
};
SkalIkkeFeileOpplasting.parameters = {
    msw: {
        handlers: [http.post('/rest/storage/foreldrepenger/vedlegg', () => new HttpResponse(null, { status: 200 }))],
    },
};

export const SkalFeileOpplasting = Template.bind({});
SkalFeileOpplasting.args = {
    send: action('button-click'),
};
SkalFeileOpplasting.parameters = {
    msw: {
        handlers: [http.post('/rest/storage/foreldrepenger/vedlegg', () => new HttpResponse(null, { status: 400 }))],
    },
};
