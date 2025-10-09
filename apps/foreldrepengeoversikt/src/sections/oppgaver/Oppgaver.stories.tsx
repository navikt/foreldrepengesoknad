import { Meta, StoryObj } from '@storybook/react-vite';
import { HttpResponse, http } from 'msw';
import { MemoryRouter } from 'react-router-dom';

import { withQueryClient } from '@navikt/fp-utils-test';

import { API_URLS } from '../../api/api.ts';
import { Oppgaver } from './Oppgaver';

const meta = {
    title: 'Oppgaver',
    component: Oppgaver,
    decorators: [withQueryClient],
    render: (props) => {
        return (
            <MemoryRouter>
                <Oppgaver {...props} />
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof Oppgaver>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.minidialog, () =>
                    HttpResponse.json([
                        {
                            saksnr: '352011079',
                            opprettet: '2023-02-09',
                            dialogId: '1111111112',
                        },
                    ]),
                ),
            ],
        },
    },
    args: {
        saksnummer: '352011079',
    },
};

export const FeilIMinidialogApiKall: Story = {
    parameters: {
        msw: {
            handlers: [http.get(API_URLS.minidialog, () => new HttpResponse(null, { status: 400 }))],
        },
    },
    args: {
        saksnummer: '352011079',
    },
};
