import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';
import annenPartVedtak from 'storybook/storyData/annenPartVedtak/annenPartVedtak.json';
import storageKvittering from 'storybook/storyData/kvittering/storage_kvittering.json';
import saker from 'storybook/storyData/saker/saker.json';
import stønadskontoDeltUttak80 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80.json';
import stønadskontoDeltUttak100 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100.json';
import stønadskontoer from 'storybook/storyData/stonadskontoer/stønadskontoer.json';

import '@navikt/ds-css';

import { getAxiosInstance } from '@navikt/fp-api';
import { initAmplitude } from '@navikt/fp-metrics';
import { Søkerinfo } from '@navikt/fp-types';

import AppContainer from './AppContainer';
import './styles/app.less';
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
    const apiMock = new MockAdapter(getAxiosInstance());
    apiMock.onGet('/rest/sokerinfo').reply(200, søkerinfoData);
    apiMock.onGet('/rest/innsyn/v2/saker').reply(200, sakerData);
    apiMock.onGet('/rest/innsyn/v2/annenPartVedtak').reply(200, annenPartVedtakData);
    apiMock.onGet('/rest/konto').reply(200, stønadskontoerData);
    apiMock.onGet('/rest/storage/kvittering/foreldrepenger').reply(200, storageKvitteringData);
    apiMock.onGet('test/rest/konto').replyOnce(200, stønadskontoDeltUttak80);
    apiMock.onGet('test/rest/konto').replyOnce(200, stønadskontoDeltUttak100);

    apiMock.onPost('/rest/innsyn/v2/annenPartVedtak').replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, {});
    apiMock.onPost('/rest/soknad').reply(200, {});
    apiMock.onPost('/rest/sendSøknadUrl').reply(200, {});

    apiMock.onDelete('/rest/storage/foreldrepenger').reply(200, {});

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
