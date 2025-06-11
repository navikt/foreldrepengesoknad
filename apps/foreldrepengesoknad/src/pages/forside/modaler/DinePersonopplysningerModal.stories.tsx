import { Meta, StoryObj } from '@storybook/react-vite';

import { DinePersonopplysningerModal } from './DinePersonopplysningerModal';

const meta = {
    title: 'pages/forside/DinePersonopplysningerModal',
    component: DinePersonopplysningerModal,
} satisfies Meta<typeof DinePersonopplysningerModal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        isOpen: true,
        onRequestClose: () => alert('Du prøver å lukke'),
    },
};
