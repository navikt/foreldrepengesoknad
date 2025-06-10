import { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { RegisterdataUtdatert } from './RegisterdataUtdatert';

const meta = {
    title: 'pages/RegisterdataUtdatert',
    component: RegisterdataUtdatert,
    args: {
        slettMellomlagringOgLastSidePåNytt: action('button-click'),
    },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Svangerskapspenger: Story = {
    args: {
        appName: 'svangerskapspengesoknad',
    },
};
export const Foreldrepenger: Story = {
    args: {
        appName: 'foreldrepengesoknad',
    },
};

export const Engangsstønad: Story = {
    args: {
        appName: 'engangsstonad',
    },
};
