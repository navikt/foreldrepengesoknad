import { Meta, StoryObj } from '@storybook/react';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { saker } from 'storybookData/saker/saker';

import { withQueryClient } from '@navikt/fp-utils-test';

import { OversiktRoutes } from './../../routes/routes';
import { MinidialogPage } from './MinidialogPage';

const meta = {
    title: 'MinidialogPage',
    component: MinidialogPage,
    decorators: [withQueryClient],
    render: (props) => {
        return (
            <MemoryRouter initialEntries={[`/${OversiktRoutes.DIN_PLAN}/352011079/1111111112`]}>
                <Routes>
                    <Route
                        element={<MinidialogPage {...props} />}
                        path={`/${OversiktRoutes.DIN_PLAN}/:saksnummer/:oppgaveId`}
                    />
                </Routes>
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof MinidialogPage>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(`${import.meta.env.BASE_URL}/rest/minidialog`, () =>
                    HttpResponse.json([
                        {
                            saksnr: '352011079',
                            opprettet: '2023-02-09',
                            dialogId: '1111111112',
                        },
                    ]),
                ),
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)),
            ],
        },
    },
    args: {
        fnr: '12434',
    },
};
