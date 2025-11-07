import { Meta, StoryObj } from '@storybook/react-vite';
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
import { API_URLS } from './api/queries.ts';

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
                http.get(API_URLS.minidialog, () => HttpResponse.json(miniDialog)),
                http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)),
                http.get(API_URLS.saker, () => HttpResponse.json(saker)),
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)),
                http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak)),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)),
                http.get(API_URLS.dokumenter, () => HttpResponse.json(dokumenter)),
                http.post(API_URLS.lastOppFPVedlegg, () => HttpResponse.json({})),
            ],
        },
    },
} satisfies Meta<typeof AppContainer>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
