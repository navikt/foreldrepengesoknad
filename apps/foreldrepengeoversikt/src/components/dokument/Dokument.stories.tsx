import { Meta, StoryObj } from '@storybook/react/*';

import { DokumentType } from '../../types/DokumentType';
import Dokument from './Dokument';

const meta = {
    title: 'Dokument',
    component: Dokument,
} satisfies Meta<typeof Dokument>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        dokument: {
            type: DokumentType.ARBEIDSGIVER,
            dokumentId: '1',
            journalpostId: '2',
            saksnummer: '12234',
            mottatt: new Date(),
            url: 'www.test.nu',
            tittel: 'Dette er en tittel',
        },
    },
};
