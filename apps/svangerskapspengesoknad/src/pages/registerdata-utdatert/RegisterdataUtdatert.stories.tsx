import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

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

export const Default: Story = {};
