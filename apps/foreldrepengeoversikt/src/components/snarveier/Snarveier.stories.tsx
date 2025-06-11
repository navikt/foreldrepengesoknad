import { Meta, StoryObj } from '@storybook/react-vite';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { saker } from 'storybookData/saker/saker';

import { withQueryClient } from '@navikt/fp-utils-test';

import { OversiktRoutes } from '../../routes/routes';
import { Snarveier } from './Snarveier';

const meta = {
    title: 'Snarveier',
    component: Snarveier,
    decorators: [withQueryClient],
    render: () => {
        return (
            <MemoryRouter initialEntries={[`/${OversiktRoutes.DIN_PLAN}/352011079`]}>
                <Routes>
                    <Route element={<Snarveier />} path={`/${OversiktRoutes.DIN_PLAN}/:saksnummer`} />
                </Routes>
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof Snarveier>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        msw: {
            handlers: [http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker))],
        },
    },
};
