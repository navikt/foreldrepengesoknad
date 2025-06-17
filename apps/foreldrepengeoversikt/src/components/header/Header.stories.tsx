import { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { saker } from 'storybookData/saker/saker';

import { withQueryClient } from '@navikt/fp-utils-test';

import { OversiktRoutes } from '../../routes/routes';
import { DinSakHeader } from './Header';

const meta = {
    title: 'DinSakHeader',
    component: DinSakHeader,
    decorators: [withQueryClient],
    render: (params) => {
        return (
            <MemoryRouter initialEntries={[`/${OversiktRoutes.DIN_PLAN}/352011079`]}>
                <Routes>
                    <Route element={<DinSakHeader {...params} />} path={`/${OversiktRoutes.DIN_PLAN}/:saksnummer`} />
                </Routes>
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof DinSakHeader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultDinSakHeader: Story = {
    args: {
        //@ts-expect-error Sjekk om ytelse litt i backend
        sak: saker.foreldrepenger[0],
    },
};
