import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MockAdapter from 'axios-mock-adapter';

import '@navikt/ds-css';

import { getAxiosInstance } from '@navikt/fp-api';

import { Ytelse } from 'app/types/Ytelse';

import MinidialogSkjema from './MinidialogSkjema';

const queryClient = new QueryClient();

export default {
    title: 'MinidialogSkjema',
    component: MinidialogSkjema,
};

const Template: StoryFn<{ skalFeileOpplasting: boolean; send: () => void }> = ({ skalFeileOpplasting, send }) => {
    const apiMock = new MockAdapter(getAxiosInstance());
    if (!skalFeileOpplasting) {
        apiMock.onPost('test/rest/storage/foreldrepenger/vedlegg').reply(200);
    }

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
    skalFeileOpplasting: false,
};

export const SkalFeileOpplasting = Template.bind({});
SkalFeileOpplasting.args = {
    send: action('button-click'),
    skalFeileOpplasting: true,
};
