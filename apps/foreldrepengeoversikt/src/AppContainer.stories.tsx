import { Meta, StoryObj } from '@storybook/react/*';
import { HttpResponse, http } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { annenPartVedtak } from 'storybookData/annenPartVedtak/annenPartVedtak';
import { dokumenter } from 'storybookData/dokumenter/dokumenter';
import { manglendeVedlegg } from 'storybookData/manglendeVedlegg/manglendeVedlegg';
import { miniDialog } from 'storybookData/miniDialog/miniDialog';
import { saker } from 'storybookData/saker/saker';
import { søkerinfo } from 'storybookData/sokerinfo/sokerinfo';
import { tidslinjeHendelser } from 'storybookData/tidslinjeHendelser/tidslinjeHendelser';

import { AppContainer } from './AppContainer';

const meta = {
    title: 'AppContainer',
    component: AppContainer,
    render: () => {
        return (
            <MemoryRouter>
                <AppContainer />
            </MemoryRouter>
        );
    },
    parameters: {
        msw: {
            handlers: [
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)),
                http.get(`${import.meta.env.BASE_URL}/rest/minidialog`, () => HttpResponse.json(miniDialog)),
                http.get(`${import.meta.env.BASE_URL}/rest/sokerinfo`, () => HttpResponse.json(søkerinfo)),
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)),
                http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () =>
                    HttpResponse.json(manglendeVedlegg),
                ),
                http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () =>
                    HttpResponse.json(annenPartVedtak),
                ),
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () =>
                    HttpResponse.json(tidslinjeHendelser),
                ),
                http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)),
                http.post(`${import.meta.env.BASE_URL}/rest/storage/foreldrepenger/vedlegg`, () =>
                    HttpResponse.json({}),
                ),
            ],
        },
    },
} satisfies Meta<typeof AppContainer>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
