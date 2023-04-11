import React from 'react';
import { Story } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';

import søkerinfo from '../storybook/stories/app-container/mock_data/sokerinfo.json';
import annenPartVedtak from '../storybook/stories/app-container/mock_data/annenPartVedtak.json';
import saker from '../storybook/stories/app-container/mock_data/saker.json';
import storageKvittering from '../storybook/stories/app-container/mock_data/storage_kvittering.json';
import stønadskontoer from '../storybook/stories/app-container/mock_data/stønadskontoer.json';

import AppContainer from './AppContainer';
import { AxiosInstance } from './api/apiInterceptor';

import '@navikt/ds-css';
import './styles/app.less';

export default {
    title: 'AppContainer',
    component: AppContainer,
};

const Template: Story<any> = () => {
    const apiMock = new MockAdapter(AxiosInstance);
    apiMock.onGet('/sokerinfo').reply(200, søkerinfo);
    apiMock.onGet('/innsyn/v2/saker').reply(200, saker);
    apiMock.onGet('innsyn/v2/annenPartVedtak').reply(200, annenPartVedtak);
    apiMock.onGet('/uttak-url/konto').reply(200, stønadskontoer);
    apiMock.onGet('/storage/kvittering/foreldrepenger').reply(200, storageKvittering);

    apiMock.onPost('/storage').reply(200, {});
    apiMock.onPost('/soknad').reply(200, {});
    apiMock.onPost('/sendSøknadUrl').reply(200, {});

    apiMock.onDelete('/storage').reply(200, {});

    return <AppContainer />;
};

export const VisApp = Template.bind({});
