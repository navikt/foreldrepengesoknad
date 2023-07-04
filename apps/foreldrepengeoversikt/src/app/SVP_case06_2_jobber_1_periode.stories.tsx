import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';

import søkerinfo from 'storybook/storyData/svp/case6_2_jobber_1_periode/sokerinfo.json';
import saker from 'storybook/storyData/svp/case6_2_jobber_1_periode/saker.json';
import dokumenter from 'storybook/storyData/svp/case6_2_jobber_1_periode/dokumenter.json';
import tidslinjeHendelser from 'storybook/storyData/svp/case6_2_jobber_1_periode/tidslinjeHendelser.json';
import manglendeVedlegg from 'storybook/storyData/svp/case6_2_jobber_1_periode/manglendeVedlegg.json';

import AppContainer from './AppContainer';
import { AxiosInstance } from './api/apiInterceptor';

import '@navikt/ds-css';

export default {
    title: 'SVP_case06_2_jobber_1_periode',
    component: AppContainer,
};

const Template: StoryFn<any> = () => {
    const apiMock = new MockAdapter(AxiosInstance);
    apiMock.onGet('/sokerinfo').reply(200, søkerinfo);
    apiMock.onGet('/innsyn/v2/saker').reply(200, saker);
    apiMock.onGet('/dokument/alle').reply(200, dokumenter);
    apiMock.onGet('/innsyn/tidslinje').reply(200, tidslinjeHendelser);
    apiMock.onGet('/historikk/vedlegg').reply(200, manglendeVedlegg);
    apiMock.onGet('/minidialog').reply(200, []);

    apiMock.onPost('/soknad/ettersen').reply(200, {});

    return <AppContainer />;
};

export const VisApp6 = Template.bind({});
