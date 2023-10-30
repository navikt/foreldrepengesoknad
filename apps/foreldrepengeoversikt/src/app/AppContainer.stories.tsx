import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';

import søkerinfo from 'storybook/storyData/sokerinfo/sokerinfo.json';
import saker from 'storybook/storyData/saker/saker.json';
import dokumenter from 'storybook/storyData/dokumenter/dokumenter.json';
import annenPartsVedtak from 'storybook/storyData/annenPartVedtak/annenPartVedtak.json';
import tidslinjeHendelser from 'storybook/storyData/tidslinjeHendelser/tidslinjeHendelser.json';
import miniDialog from 'storybook/storyData/miniDialog/miniDialog.json';
import manglendeVedlegg from 'storybook/storyData/manglendeVedlegg/manglendeVedlegg.json';

import AppContainer from './AppContainer';
import { AxiosInstance } from './api/apiInterceptor';

import '@navikt/ds-css';

export default {
    title: 'AppContainer',
    component: AppContainer,
    parameters: {
        mockData: [
            {
                url: 'test/innsyn/v2/saker/oppdatert',
                method: 'GET',
                status: 200,
                response: {
                    data: true,
                },
            },
            {
                url: 'test/minidialog',
                method: 'GET',
                status: 200,
                response: miniDialog,
            },
        ],
    },
};

const Template: StoryFn<any> = () => {
    const apiMock = new MockAdapter(AxiosInstance);
    apiMock.onGet('/sokerinfo').reply(200, søkerinfo);
    apiMock.onGet('/innsyn/v2/saker').reply(200, saker);
    apiMock.onGet('/innsyn/v2/annenPartVedtak').reply(200, annenPartsVedtak);
    apiMock.onGet('/dokument/alle').reply(200, dokumenter);
    apiMock.onGet('/innsyn/tidslinje').reply(200, tidslinjeHendelser);
    apiMock.onGet('/minidialog').reply(200, miniDialog);
    apiMock.onGet('/historikk/vedlegg').reply(200, manglendeVedlegg);

    apiMock.onPost('/soknad/ettersen').reply(200, {});

    return <AppContainer />;
};

export const VisApp = Template.bind({});
