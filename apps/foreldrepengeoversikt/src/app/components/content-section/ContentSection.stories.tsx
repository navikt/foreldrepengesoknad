import { Meta, StoryObj } from '@storybook/react/*';

import ContentSection from './ContentSection';

const meta = {
    title: 'ContentSection',
    component: ContentSection,
} satisfies Meta<typeof ContentSection>;
export default meta;

type Story = StoryObj<typeof ContentSection>;

export const Default: Story = {
    args: {
        children: <div>Dette er innholdet</div>,
    },
};

export const GulMedOverskriftOgRetteHjørne: Story = {
    args: {
        children: <div>Dette er innholdet</div>,
        backgroundColor: 'yellow',
        cornerStyle: 'square',
        heading: 'Dette er en overskrift',
    },
};

export const VisSkjelett: Story = {
    args: {
        children: <div>Dette er innholdet</div>,
        showSkeleton: true,
        skeletonProps: { height: '200px' },
    },
};
