import { Meta, StoryObj } from '@storybook/react';

import FrontPage from './FrontPage';

const meta = {
    title: 'components/FrontPage',
    component: FrontPage,
} satisfies Meta<typeof FrontPage>;
export default meta;

type Story = StoryObj<typeof FrontPage>;

export const Default: Story = {
    args: {
        children: <div>Steginnhold</div>,
        locale: 'nb',
        changeLocale: () => undefined,
        titleLabel: 'Dette er tittelen på veiviseren',
        minutesLabel: 'Ca 5 min',
        innholdLabel: 'Dette er innhold',
        goToNextDefaultStep: () => undefined,
    },
};
