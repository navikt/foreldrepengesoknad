import { Meta, StoryObj } from '@storybook/react';

import AndreVeivisereLinkPanel from './AndreVeivisereLinkPanel';

const meta = {
    title: 'components/AndreVeivisereLinkPanel',
    component: AndreVeivisereLinkPanel,
} satisfies Meta<typeof AndreVeivisereLinkPanel>;
export default meta;

type Story = StoryObj<typeof AndreVeivisereLinkPanel>;

export const EnLenke: Story = {
    args: {
        links: [
            {
                url: 'test',
                content: <div>Innhold lenke 1</div>,
            },
        ],
    },
};

export const FlereLenker: Story = {
    args: {
        links: [
            {
                url: 'test',
                content: <div>Innhold lenke 1</div>,
            },
            {
                url: 'test2',
                content: <div>Innhold lenke 2</div>,
            },
        ],
    },
};
