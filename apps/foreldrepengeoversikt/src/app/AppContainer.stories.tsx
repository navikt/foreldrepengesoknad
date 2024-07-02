import { StoryFn } from '@storybook/react';
import { HttpResponse, http } from 'msw';
import annenPartsVedtak from 'storybook/storyData/annenPartVedtak/annenPartVedtak.json';
import dokumenter from 'storybook/storyData/dokumenter/dokumenter.json';
import manglendeVedlegg from 'storybook/storyData/manglendeVedlegg/manglendeVedlegg.json';
import miniDialog from 'storybook/storyData/miniDialog/miniDialog.json';
import saker from 'storybook/storyData/saker/saker.json';
import søkerinfo from 'storybook/storyData/sokerinfo/sokerinfo.json';
import tidslinjeHendelser from 'storybook/storyData/tidslinjeHendelser/tidslinjeHendelser.json';

import '@navikt/ds-css';

import AppContainer from './AppContainer';

export default {
    title: 'AppContainer',
    component: AppContainer,
    parameters: {
        msw: {
            handlers: [
                http.get('/rest/innsyn/v2/saker/oppdatert', () => HttpResponse.json(true)),
                http.get('/rest/minidialog', () => HttpResponse.json(miniDialog)),
                http.get('/rest/sokerinfo', () => HttpResponse.json(søkerinfo)),
                http.get('/rest/innsyn/v2/saker', () => HttpResponse.json(saker)),
                http.get('/rest/historikk/vedlegg', () => HttpResponse.json(manglendeVedlegg)),
                http.post('/rest/innsyn/v2/annenPartVedtak', () => HttpResponse.json(annenPartsVedtak)),
                http.get('/rest/innsyn/tidslinje', () => HttpResponse.json(tidslinjeHendelser)),
                http.get('/rest/dokument/alle', () => HttpResponse.json(dokumenter)),
                http.post('/rest/storage/foreldrepenger/vedlegg', () => HttpResponse.json({})),
            ],
        },
    },
};

const Template: StoryFn<any> = () => {
    return <AppContainer />;
};

export const VisApp = Template.bind({});
