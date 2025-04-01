import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { LayoutWrapper } from '../../sections/LayoutWrapper';
import { SøkelenkerPanel } from './SøkelenkerPanel';

const meta = {
    title: 'SøkelenkerPanel',
    component: SøkelenkerPanel,
    render: (props) => {
        return (
            <MemoryRouter>
                <LayoutWrapper className="pt-1 pb-1 pl-4 pr-4">
                    <SøkelenkerPanel {...props} />
                </LayoutWrapper>
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof SøkelenkerPanel>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MedBakgrunn: Story = {
    args: {
        doBleed: true,
    },
};
