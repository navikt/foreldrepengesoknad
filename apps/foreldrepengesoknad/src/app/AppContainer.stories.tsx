import { initAmplitude } from '@navikt/fp-metrics';
import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';
import annenPartVedtak from 'storybook/storyData/annenPartVedtak/annenPartVedtak.json';
import storageKvittering from 'storybook/storyData/kvittering/storage_kvittering.json';
import saker from 'storybook/storyData/saker/saker.json';
import stønadskontoDeltUttak100 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100.json';
import stønadskontoDeltUttak80 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80.json';
import stønadskontoer from 'storybook/storyData/stonadskontoer/stønadskontoer.json';
import AppContainer from './AppContainer';
import { AxiosInstance } from './api/apiInterceptor';
import { RequestStatus } from './types/RequestState';
import { Søkerinfo } from '@navikt/fp-types';

import '@navikt/ds-css';
import './styles/app.less';

const søkerinfo = {
    person: {
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

export default {
    title: 'AppContainer',
    component: AppContainer,
};

const Template: StoryFn<{
    søkerinfoData: Søkerinfo;
    sakerData: any;
    annenPartVedtakData: any;
    stønadskontoerData: any;
    storageKvitteringData: any;
}> = ({ søkerinfoData, sakerData, annenPartVedtakData, stønadskontoerData, storageKvitteringData }) => {
    initAmplitude();
    const apiMock = new MockAdapter(AxiosInstance);
    apiMock.onGet('/sokerinfo').reply(200, søkerinfoData);
    apiMock.onGet('/innsyn/v2/saker').reply(200, sakerData);
    apiMock.onGet('/innsyn/v2/annenPartVedtak').reply(200, annenPartVedtakData);
    apiMock.onGet('/konto').reply(200, stønadskontoerData);
    apiMock.onGet('/storage/kvittering/foreldrepenger').reply(200, storageKvitteringData);
    apiMock.onGet('test/konto').replyOnce(200, stønadskontoDeltUttak80);
    apiMock.onGet('test/konto').replyOnce(200, stønadskontoDeltUttak100);

    apiMock.onPost('/innsyn/v2/annenPartVedtak').replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onPost('/storage/foreldrepenger').reply(200, {});
    apiMock.onPost('/soknad').reply(200, {});
    apiMock.onPost('/sendSøknadUrl').reply(200, {});

    apiMock.onDelete('/storage/foreldrepenger').reply(200, {});

    return <AppContainer />;
};

export const SøkerErMann = Template.bind({});
SøkerErMann.args = {
    søkerinfoData: søkerinfo,
    sakerData: saker,
    annenPartVedtakData: annenPartVedtak,
    stønadskontoerData: stønadskontoer,
    storageKvitteringData: storageKvittering,
};
