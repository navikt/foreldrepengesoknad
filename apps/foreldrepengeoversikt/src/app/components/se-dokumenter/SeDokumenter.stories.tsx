import { Meta, StoryObj } from '@storybook/react/*';
import { MemoryRouter } from 'react-router-dom';

import SeDokumenter from './SeDokumenter';

const meta = {
    title: 'SeDokumenter',
    component: SeDokumenter,
    render: () => {
        return (
            <MemoryRouter>
                <SeDokumenter />
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof SeDokumenter>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
