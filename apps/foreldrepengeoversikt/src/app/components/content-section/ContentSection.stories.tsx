import { Meta, StoryObj } from '@storybook/react/*';

import ContentSection from './ContentSection';

const meta = {
    title: 'ContentSection',
    component: ContentSection,
} satisfies Meta<typeof ContentSection>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <div>Dette er innholdet</div>,
    },
};

export const VisSkjelett: Story = {
    args: {
        children: <div>Dette er innholdet</div>,
        showSkeleton: true,
        skeletonProps: { height: '200px' },
    },
};
