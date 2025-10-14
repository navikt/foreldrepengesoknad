import { Meta, StoryObj } from '@storybook/react-vite';

import { Kvittering } from './Kvittering';

const meta = {
    component: Kvittering,
} satisfies Meta<typeof Kvittering>;
export default meta;

type Story = StoryObj<typeof meta>;

export const VenterPåSvar: Story = {
    args: {
        forsendelseStatus: {
            status: 'PENDING',
        },
        pageTitle: 'Foreldrepengesøknad',
    },
};

export const Midlertidig: Story = {
    args: {
        forsendelseStatus: {
            status: 'MIDLERTIDIG',
        },
        pageTitle: 'Foreldrepengesøknad',
    },
};
export const Endelig: Story = {
    args: {
        forsendelseStatus: {
            status: 'ENDELIG',
            saksnummer: 1,
        },
        pageTitle: 'Foreldrepengesøknad',
    },
};
