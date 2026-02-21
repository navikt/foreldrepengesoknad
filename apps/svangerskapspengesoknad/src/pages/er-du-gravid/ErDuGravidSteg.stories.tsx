import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps } from 'react';
import { action } from 'storybook/actions';

import { ErDuGravidSteg } from './ErDuGravidSteg';

type StoryArgs = ComponentProps<typeof ErDuGravidSteg>;

const meta = {
    title: 'pages/ErDuGravidSteg',
    component: ErDuGravidSteg,
    render: ({ onBekreft = action('onBekreft'), ...rest }) => {
        return <ErDuGravidSteg {...rest} onBekreft={onBekreft} />;
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onBekreft: action('onBekreft'),
    },
};

