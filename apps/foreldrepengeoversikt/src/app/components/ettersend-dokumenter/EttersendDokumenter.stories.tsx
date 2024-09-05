import { Meta, StoryObj } from '@storybook/react/*';
import { MemoryRouter } from 'react-router-dom';

import EttersendDokumenter from './EttersendDokumenter';

const meta = {
    title: 'EttersendDokumenter',
    component: EttersendDokumenter,
    render: () => {
        return (
            <MemoryRouter>
                <EttersendDokumenter />
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof EttersendDokumenter>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
