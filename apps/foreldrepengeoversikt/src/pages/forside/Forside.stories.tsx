import { Meta, StoryObj } from '@storybook/react-vite';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { manglendeVedlegg } from 'storybookData/manglendeVedlegg/manglendeVedlegg';
import { saker } from 'storybookData/saker/saker';
import { søkerinfo } from 'storybookData/sokerinfo/sokerinfo';
import { tidslinjeHendelserFP } from 'storybookData/tidslinjeHendelser/tidslinjeHendelser.ts';

import { PersonMedArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';
import { withQueryClient } from '@navikt/fp-utils-test';

import { API_URLS } from '../../api/queries.ts';
import { SakOppslag } from '../../types/SakOppslag';
import { mapSakerDTOToSaker } from '../../utils/sakerUtils';
import { Forside } from './Forside';

type StoryArgs = {
    saker: SakOppslag;
    søkerinfo: PersonMedArbeidsforholdDto_fpoversikt;
};

const meta = {
    title: 'Forside',
    decorators: [withQueryClient],
    render: (props) => {
        return (
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route element={<Forside {...props} />} path="/" />
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
                http.get(API_URLS.saker, () => HttpResponse.json(saker)),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelserFP)),
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)),
            ],
        },
    },
    args: {
        saker: mapSakerDTOToSaker(saker),
        søkerinfo: søkerinfo,
    },
};
