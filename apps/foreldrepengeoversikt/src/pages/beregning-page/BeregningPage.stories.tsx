import { Meta, StoryObj } from '@storybook/react-vite';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { saker_beregning } from 'storybookData/saker/saker.ts';

import { withQueryClient } from '@navikt/fp-utils-test';

import { API_URLS } from '../../api/queries.ts';
import { OversiktRoutes } from '../../routes/routes.ts';
import { BeregningPage } from './BeregningPage.tsx';

const meta = {
    title: 'Beregning',
    decorators: [withQueryClient],

    render: (args) => {
        return (
            <MemoryRouter
                initialEntries={[`${OversiktRoutes.SAKSOVERSIKT}/${args.saksnummer}/${OversiktRoutes.BEREGNING}`]}
            >
                <Routes>
                    <Route
                        element={<BeregningPage />}
                        path={`${OversiktRoutes.SAKSOVERSIKT}/:saksnummer/${OversiktRoutes.BEREGNING}`}
                    />
                </Routes>
            </MemoryRouter>
        );
    },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Beregning: Story = {
    parameters: {
        msw: {
            handlers: [http.get(API_URLS.saker, () => HttpResponse.json(saker_beregning))],
        },
    },
    args: {
        saksnummer: '502',
    },
};
