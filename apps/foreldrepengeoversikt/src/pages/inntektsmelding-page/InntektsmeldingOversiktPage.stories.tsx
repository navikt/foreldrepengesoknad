import { Meta, StoryObj } from '@storybook/react-vite';
import { HttpResponse, delay, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router';
import { utenRefusjon } from 'storybookData/inntektsmeldinger/utenRefusjon';

import { withQueryClient } from '@navikt/fp-utils-test';

import { API_URLS } from '../../api/queries.ts';
import { OversiktRoutes } from '../../routes/routes';
import { InntektsmeldingOversiktPage } from './InntektsmeldingOversiktPage';

const SAKSNUMMER = '352011079';

const meta = {
    title: 'InntektsmeldingOversikt',
    decorators: [withQueryClient],
    render: () => (
        <MemoryRouter initialEntries={[`${OversiktRoutes.SAKSOVERSIKT}/${SAKSNUMMER}/${OversiktRoutes.INNTEKTSMELDING}`]}>
            <Routes>
                <Route path={`${OversiktRoutes.SAKSOVERSIKT}/:saksnummer`}>
                    <Route index element={<div>Saksoversikt</div>} />
                    <Route path={OversiktRoutes.INNTEKTSMELDING} element={<InntektsmeldingOversiktPage />} />
                </Route>
            </Routes>
        </MemoryRouter>
    ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const MedInntektsmeldinger: Story = {
    beforeEach({ msw }) {
        msw.use(http.get(API_URLS.inntektsmelding, () => HttpResponse.json(utenRefusjon)));
    },
};

export const Laster: Story = {
    beforeEach({ msw }) {
        msw.use(
            http.get(API_URLS.inntektsmelding, async () => {
                await delay('infinite');
                return HttpResponse.json(utenRefusjon);
            }),
        );
    },
};

export const IngenAktiveInntektsmeldinger: Story = {
    beforeEach({ msw }) {
        msw.use(http.get(API_URLS.inntektsmelding, () => HttpResponse.json([])));
    },
};
