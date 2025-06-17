import { Meta, StoryObj } from '@storybook/react-vite';

import Foreldrepar from './Foreldrepar';

const meta = {
    title: 'components/Foreldrepar',
    component: Foreldrepar,
} satisfies Meta<typeof Foreldrepar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        forelder1: 'mor1',
    },
};

export const MorOgFar: Story = {
    args: {
        forelder1: 'mor1',
        forelder2: 'far1',
    },
};

export const MorHalvtSynlig: Story = {
    args: {
        forelder1: 'mor1',
        forelder2: 'far1',
        variant: 'førsteForelderHalvtSynlig',
    },
};

export const ForeldreSeparert: Story = {
    args: {
        forelder1: 'mor1',
        forelder2: 'far1',
        variant: 'foreldreSeparert',
    },
};

export const ForeldreNærmere: Story = {
    args: {
        forelder1: 'mor1',
        forelder2: 'far1',
        variant: 'foreldreNærmere',
    },
};

export const Kompakt: Story = {
    args: {
        forelder1: 'mor1',
        forelder2: 'far1',
        variant: 'foreldreNærmere',
        kompakt: true,
    },
};
