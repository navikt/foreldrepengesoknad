import { Meta, StoryObj } from '@storybook/react/*';
import { HttpResponse, http } from 'msw';
import annenPartsVedtak from 'storybookData/annenPartVedtak/annenPartVedtak.json';
import dokumenter from 'storybookData/dokumenter/dokumenter.json';
import manglendeVedlegg from 'storybookData/manglendeVedlegg/manglendeVedlegg.json';
import miniDialog from 'storybookData/miniDialog/miniDialog.json';
import saker from 'storybookData/saker/saker.json';
import søkerinfo from 'storybookData/sokerinfo/sokerinfo.json';
import tidslinjeHendelser from 'storybookData/tidslinjeHendelser/tidslinjeHendelser.json';

import AppContainer from './AppContainer';

const meta = {
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
} satisfies Meta<typeof AppContainer>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
