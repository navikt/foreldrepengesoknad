import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';

import stønadskontoDeltUttak80 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80.json';
import stønadskontoDeltUttak100 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100.json';
import søkerinfo from 'storybook/storyData/sokerinfo/sokerinfoMannMedArbeidsforhold.json';
import annenPartVedtak from 'storybook/storyData/annenPartVedtak/annenPartVedtak.json';
import saker from 'storybook/storyData/saker/saker.json';
import storageKvittering from 'storybook/storyData/kvittering/storage_kvittering.json';
import stønadskontoer from 'storybook/storyData/stonadskontoer/stønadskontoer.json';

import AppContainer from './AppContainer';
import { AxiosInstance } from './api/apiInterceptor';

import '@navikt/ds-css';
import './styles/app.less';
import { RequestStatus } from './types/RequestState';
import { initAmplitude } from '@navikt/fp-metrics';

export default {
    title: 'AppContainer',
    component: AppContainer,
};

const Template: StoryFn = ({
    søkerinfoData,
    sakerData,
    annenPartVedtakData,
    stønadskontoerData,
    storageKvitteringData,
}) => {
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
