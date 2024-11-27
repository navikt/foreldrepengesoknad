import { CalendarIcon } from '@navikt/aksel-icons';
import { Meta, StoryObj } from '@storybook/react';

import { IconCircleWrapper } from './IconCircleWrapper';

const meta = {
    title: 'components/IconCircleWrapper',
    component: IconCircleWrapper,
} satisfies Meta<typeof IconCircleWrapper>;
export default meta;

type Story = StoryObj<typeof meta>;

export const GreenXlSizedIcon: Story = {
    args: {
        children: <CalendarIcon width="24" height="25" aria-label="icon-label" />,
        color: 'green',
        size: 'xl',
    },
};

export const BlueMediumSizedIcon: Story = {
    args: {
        children: <CalendarIcon width="24" height="25" aria-label="icon-label" />,
        color: 'blue',
        size: 'medium',
    },
};

export const grayLargeSizedIcon: Story = {
    args: {
        children: <CalendarIcon width="24" height="25" aria-label="icon-label" />,
        color: 'gray',
        size: 'large',
    },
};
