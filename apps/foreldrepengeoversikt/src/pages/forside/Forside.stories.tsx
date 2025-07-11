import { Meta, StoryObj } from '@storybook/react-vite';
import { HttpResponse, http } from 'msw';
import { useRef } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { manglendeVedlegg } from 'storybookData/manglendeVedlegg/manglendeVedlegg';
import { saker } from 'storybookData/saker/saker';
import { søkerinfo } from 'storybookData/sokerinfo/sokerinfo';
import { tidslinjeHendelser } from 'storybookData/tidslinjeHendelser/tidslinjeHendelser';

import { Søkerinfo } from '@navikt/fp-types';
import { withQueryClient } from '@navikt/fp-utils-test';

import { OversiktRoutes } from '../../routes/routes';
import { SakOppslag } from '../../types/SakOppslag';
import { mapSakerDTOToSaker } from '../../utils/sakerUtils';
import { Forside } from './Forside';

type StoryArgs = {
    saker: SakOppslag;
    søkerinfo: Søkerinfo;
};

const meta = {
    title: 'Forside',
    decorators: [withQueryClient],
    render: (props) => {
        const isFirstRender = useRef(false);
        return (
            <MemoryRouter initialEntries={[`/${OversiktRoutes.TIDSLINJEN}/352011079`]}>
                <Routes>
                    <Route
                        element={<Forside {...props} isFirstRender={isFirstRender} />}
                        path={`/${OversiktRoutes.TIDSLINJEN}/:saksnummer`}
                    />
                </Routes>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)),
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () =>
                    HttpResponse.json(tidslinjeHendelser),
                ),
                http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () =>
                    HttpResponse.json(manglendeVedlegg),
                ),
            ],
        },
    },
    args: {
        saker: mapSakerDTOToSaker(saker),
        søkerinfo: søkerinfo,
    },
};
