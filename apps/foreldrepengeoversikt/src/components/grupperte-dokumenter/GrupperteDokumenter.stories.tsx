import { Meta, StoryObj } from '@storybook/react';

import { GrupperteDokumenter } from './GrupperteDokumenter';

const meta = {
    title: 'GrupperteDokumenter',
    component: GrupperteDokumenter,
} satisfies Meta<typeof GrupperteDokumenter>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        dokumenter: [
            {
                type: 'INNGÅENDE_DOKUMENT',
                mottatt: new Date().toISOString(),
                saksnummer: '124324',
                tittel: 'Tittel arbeidsgiver',
                journalpostId: '2',
                dokumentId: '3',
            },
            {
                type: 'INNGÅENDE_DOKUMENT',
                mottatt: new Date().toISOString(),
                saksnummer: '124',
                tittel: 'Tittel på inngåande dok',
                journalpostId: '4',
                dokumentId: '6',
            },
            {
                type: 'UTGÅENDE_DOKUMENT',
                mottatt: new Date().toISOString(),
                saksnummer: '124',
                tittel: 'Tittel på utgående dok',
                journalpostId: '5',
                dokumentId: '6',
            },
        ],
    },
};
