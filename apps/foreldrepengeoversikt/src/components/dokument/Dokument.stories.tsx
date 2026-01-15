import { Meta, StoryObj } from '@storybook/react-vite';

import { Dokument } from './Dokument';

const meta = {
    title: 'Dokument',
    component: Dokument,
} satisfies Meta<typeof Dokument>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        dokument: {
            type: 'UTGÅENDE_DOKUMENT',
            dokumentId: '1',
            journalpostId: '2',
            saksnummer: '12234',
            mottatt: new Date().toISOString(),
            tittel: 'Dette er en tittel',
        },
    },
};
