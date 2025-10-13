import { Meta, StoryObj } from '@storybook/react-vite';

import { Kvittering } from './Kvittering';

const meta = {
    component: Kvittering,
} satisfies Meta<typeof Kvittering>;
export default meta;

type Story = StoryObj<typeof meta>;

export const MedSaksnummer: Story = {
    args: {
        forsendelseStatus: {
            status: 'ENDELIG',
            saksnummer: 1,
        },
    },
};

export const Pending: Story = {
    args: {
        forsendelseStatus: {
            status: 'PENDING',
        },
    },
};

export const Midlertidig: Story = {
    args: {
        forsendelseStatus: {
            status: 'MIDLERTIDIG',
        },
    },
};

export const EndeligUtenSaksnummer: Story = {
    args: {
        forsendelseStatus: {
            status: 'ENDELIG',
        },
    },
};
