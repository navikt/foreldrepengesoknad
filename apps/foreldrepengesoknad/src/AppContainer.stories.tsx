import { Meta, StoryObj } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';
import annenPartVedtak from 'storybookData/annenPartVedtak/annenPartVedtak.json';
import storageKvittering from 'storybookData/kvittering/storage_kvittering.json';
import saker from 'storybookData/saker/saker.json';
import stønadskontoDeltUttak80 from 'storybookData/stonadskontoer/stønadskontoDeltUttak80.json';
import stønadskontoDeltUttak100 from 'storybookData/stonadskontoer/stønadskontoDeltUttak100.json';
import stønadskontoer from 'storybookData/stonadskontoer/stønadskontoer.json';

import '@navikt/ds-css';

import { initAmplitude } from '@navikt/fp-metrics';
import { Søkerinfo } from '@navikt/fp-types';

import { AxiosInstanceAPI } from 'app/api/AxiosInstance';

import AppContainer from './AppContainer';
import { RequestStatus } from './types/RequestState';

const søkerinfo = {
    søker: {
        fnr: '06499121154',
        fornavn: 'Tapper',
        etternavn: 'Konvolutt',
        kjønn: 'M',
        fødselsdato: '1991-09-06',
        bankkonto: {
            kontonummer: '',
            banknavn: '',
        },
        barn: [],
    },
    arbeidsforhold: [
        {
            arbeidsgiverId: '896929119',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'SAUEFABRIKK',
            stillingsprosent: 100,
            fom: '2018-03-01',
        },
    ],
} as Søkerinfo;

type StoryArgs = {
    søkerinfoData: Søkerinfo;
    sakerData: any;
    annenPartVedtakData: any;
    stønadskontoerData: any;
    storageKvitteringData: any;
};

const meta = {
    component: AppContainer,
    render: (props) => {
        initAmplitude();
        const apiMock = new MockAdapter(AxiosInstanceAPI());
        apiMock.onGet('/rest/sokerinfo').reply(200, props.søkerinfoData);
        apiMock.onGet('/rest/innsyn/v2/saker').reply(200, props.sakerData);
        apiMock.onGet('/rest/innsyn/v2/annenPartVedtak').reply(200, props.annenPartVedtakData);
        apiMock.onGet('/rest/konto').reply(200, props.stønadskontoerData);
        apiMock.onGet('/rest/storage/kvittering/foreldrepenger').reply(200, props.storageKvitteringData);
        apiMock.onGet('test/rest/konto').replyOnce(200, stønadskontoDeltUttak80);
        apiMock.onGet('test/rest/konto').replyOnce(200, stønadskontoDeltUttak100);

        apiMock.onPost('/rest/innsyn/v2/annenPartVedtak').replyOnce(200, undefined, RequestStatus.FINISHED);
        apiMock.onPost('/rest/storage/foreldrepenger').reply(200, {});
        apiMock.onPost('/rest/soknad').reply(200, {});
        apiMock.onPost('/rest/sendSøknadUrl').reply(200, {});

        apiMock.onDelete('/rest/storage/foreldrepenger').reply(200, {});

        return <AppContainer />;
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const SøkerErMann: Story = {
    args: {
        søkerinfoData: søkerinfo,
        sakerData: saker,
        annenPartVedtakData: annenPartVedtak,
        stønadskontoerData: stønadskontoer,
        storageKvitteringData: storageKvittering,
    },
};
