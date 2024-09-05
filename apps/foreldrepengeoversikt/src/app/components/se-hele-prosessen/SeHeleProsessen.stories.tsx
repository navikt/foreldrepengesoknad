import { Meta, StoryObj } from '@storybook/react/*';
import { MemoryRouter } from 'react-router-dom';

import SeHeleProsessen from './SeHeleProsessen';

const meta = {
    title: 'SeHeleProsessen',
    component: SeHeleProsessen,
    render: () => {
        return (
            <MemoryRouter>
                <SeHeleProsessen />
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof SeHeleProsessen>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
