import { CalendarIcon } from '@navikt/aksel-icons';
import { Meta, StoryObj } from '@storybook/react';

import IconCircleWrapper from './IconCircleWrapper';

const meta: Meta<typeof IconCircleWrapper> = {
    title: 'components/IconCircleWrapper',
    component: IconCircleWrapper,
};
export default meta;

type Story = StoryObj<typeof IconCircleWrapper>;

export const Default: Story = {
    args: {
        children: <CalendarIcon width="24" height="25" aria-label="icon-label" />,
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
