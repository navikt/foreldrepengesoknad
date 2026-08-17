import { Meta, StoryObj } from '@storybook/react-vite';
import { HttpResponse, delay, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router';
import { saker } from 'storybookData/saker/saker';
import { søkerinfo } from 'storybookData/sokerinfo/sokerinfo.ts';

import { TilbakekrevingUttalelseOppgave_fpoversikt } from '@navikt/fp-types';
import { withQueryClient } from '@navikt/fp-utils-test';

import { API_URLS } from '../../api/queries.ts';
import { OversiktRoutes } from './../../routes/routes';
import { MinidialogPage } from './MinidialogPage';

const meta = {
    title: 'MinidialogPage',
    component: MinidialogPage,
    decorators: [withQueryClient],
    render: () => {
        return (
            <MemoryRouter initialEntries={[`/${OversiktRoutes.DIN_PLAN}/1/${OversiktRoutes.OPPGAVER}`]}>
                <Routes>
                    <Route
                        element={<MinidialogPage />}
                        path={`/${OversiktRoutes.DIN_PLAN}/:saksnummer/${OversiktRoutes.OPPGAVER}`}
                    />
                </Routes>
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof MinidialogPage>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    beforeEach({ msw }) {
        msw.use(
            // I produksjon er saker-spørringa alt henta (og dermed alltid ferdig) før
            // MinidialogPage nokon gong blir rendra, sidan Foreldrepengeoversikt.tsx
            // ventar på henne på app-rot-nivå. Her testar vi derimot sida i isolasjon,
            // så vi legg på ei lita, deterministisk forsinking på minidialog-kallet for
            // å spegle den garantien og unngå eit race mellom dei to spørringane.
            http.get(API_URLS.minidialog, async () => {
                await delay(20);
                return HttpResponse.json([
                    {
                        saksnummer: '1',
                        opprettet: '2023-02-09',
                    },
                ] satisfies TilbakekrevingUttalelseOppgave_fpoversikt[]);
            }),
            http.get(API_URLS.saker, () => HttpResponse.json(saker)),
            http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)),
            http.post(API_URLS.ettersend, () => new HttpResponse(null, { status: 200 })),
        );
    },
};
