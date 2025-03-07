import { Meta, StoryObj } from '@storybook/react/*';
import { MemoryRouter } from 'react-router-dom';
import { SAK_1, SAK_2, SAK_3, SAK_4 } from 'storybookData/saker/svpsaker';

import { LayoutWrapper } from '../../sections/LayoutWrapper';
import { Svangerskapspenger } from './Svangerskapspenger';

const meta = {
    title: 'SVP oversikt',
    component: Svangerskapspenger,
    render: (props) => {
        return (
            <MemoryRouter>
                <LayoutWrapper className="pt-1 pb-1 pl-4 pr-4 bg-deepblue-50">
                    <Svangerskapspenger {...props} />
                </LayoutWrapper>
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof Svangerskapspenger>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Case1: Story = {
    args: {
        svpSak: SAK_1,
    },
};
export const Case2: Story = {
    args: {
        svpSak: SAK_2,
    },
};

export const Case3: Story = {
    args: {
        svpSak: SAK_3,
    },
};

export const Case4: Story = {
    args: {
        svpSak: SAK_4,
    },
};
