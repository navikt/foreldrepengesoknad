import { Meta, StoryObj } from '@storybook/react/*';

import { DokumentType } from '../../types/DokumentType';
import GrupperteDokumenter from './GrupperteDokumenter';

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
                type: DokumentType.ARBEIDSGIVER,
                mottatt: new Date(),
                saksnummer: '124324',
                tittel: 'Tittel arbeidsgiver',
                url: 'www.test.nu',
                journalpostId: '2',
                dokumentId: '3',
            },
            {
                type: DokumentType.INNGÅENDE_DOKUMENT,
                mottatt: new Date(),
                saksnummer: '124',
                tittel: 'Tittel på inngåande dok',
                url: 'www.test.nu',
                journalpostId: '4',
                dokumentId: '6',
            },
            {
                type: DokumentType.UTGÅENDE_DOKUMENT,
                mottatt: new Date(),
                saksnummer: '124',
                tittel: 'Tittel på utgående dok',
                url: 'www.test.nu',
                journalpostId: '5',
                dokumentId: '6',
            },
        ],
    },
};
