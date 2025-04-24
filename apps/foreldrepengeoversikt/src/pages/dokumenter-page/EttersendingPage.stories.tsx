import { Meta, StoryObj } from '@storybook/react';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { dokumenter } from 'storybookData/dokumenter/dokumenter';

import { withQueryClient } from '@navikt/fp-utils-test';

import { OversiktRoutes } from './../../routes/routes';
import { DokumenterPage } from './DokumenterPage';

const meta = {
    title: 'DokumenterPage',
    component: DokumenterPage,
    decorators: [withQueryClient],
    render: () => {
        return (
            <MemoryRouter initialEntries={[`/${OversiktRoutes.DOKUMENTER}/1`]}>
                <Routes>
                    <Route element={<DokumenterPage />} path={`/${OversiktRoutes.DOKUMENTER}/:saksnummer`} />
                </Routes>
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof DokumenterPage>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        msw: {
            handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter))],
        },
    },
};
