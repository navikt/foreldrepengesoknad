import { Meta, StoryObj } from '@storybook/react-vite';

import { HvorforSpørNAVOmDette } from './HvorforSpørNAVOmDette';

const meta = {
    title: 'components/HvorforSpørNAVOmDette',
    component: HvorforSpørNAVOmDette,
} satisfies Meta<typeof HvorforSpørNAVOmDette>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        text: 'Dette er en tekst',
    },
};
