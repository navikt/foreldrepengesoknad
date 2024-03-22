import { Meta, StoryObj } from '@storybook/react';

import HvorforSpørNAVOmDette from './HvorforSpørNAVOmDette';

const meta: Meta<typeof HvorforSpørNAVOmDette> = {
    title: 'components/HvorforSpørNAVOmDette',
    component: HvorforSpørNAVOmDette,
};
export default meta;

type Story = StoryObj<typeof HvorforSpørNAVOmDette>;

export const Default: Story = {
    args: {
        text: 'Dette er en tekst',
    },
};
