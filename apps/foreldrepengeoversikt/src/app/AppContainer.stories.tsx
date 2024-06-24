import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';
import annenPartsVedtak from 'storybook/storyData/annenPartVedtak/annenPartVedtak.json';
import dokumenter from 'storybook/storyData/dokumenter/dokumenter.json';
import manglendeVedlegg from 'storybook/storyData/manglendeVedlegg/manglendeVedlegg.json';
import miniDialog from 'storybook/storyData/miniDialog/miniDialog.json';
import saker from 'storybook/storyData/saker/saker.json';
import søkerinfo from 'storybook/storyData/sokerinfo/sokerinfo.json';
import tidslinjeHendelser from 'storybook/storyData/tidslinjeHendelser/tidslinjeHendelser.json';

import '@navikt/ds-css';

import { getAxiosInstance } from '@navikt/fp-api';

import AppContainer from './AppContainer';

export default {
    title: 'AppContainer',
    component: AppContainer,
    parameters: {
        mockData: [
            {
                url: 'test/rest/innsyn/v2/saker/oppdatert',
                method: 'GET',
                status: 200,
                response: {
                    data: true,
                },
            },
            {
                url: 'test/rest/minidialog',
                method: 'GET',
                status: 200,
                response: miniDialog,
            },
        ],
    },
};

const Template: StoryFn<any> = () => {
    const apiMock = new MockAdapter(getAxiosInstance());
    apiMock.onGet('/rest/sokerinfo').reply(200, søkerinfo);
    apiMock.onGet('/rest/innsyn/v2/saker').reply(200, saker);
    apiMock.onGet('/rest/innsyn/v2/annenPartVedtak').reply(200, annenPartsVedtak);
    apiMock.onGet('/rest/dokument/alle').reply(200, dokumenter);
    apiMock.onGet('/rest/innsyn/tidslinje').reply(200, tidslinjeHendelser);
    apiMock.onGet('/rest/minidialog').reply(200, miniDialog);
    apiMock.onGet('/rest/historikk/vedlegg').reply(200, manglendeVedlegg);
    apiMock.onPost('/rest/soknad/ettersen').reply(200, {});

    return <AppContainer />;
};

export const VisApp = Template.bind({});
