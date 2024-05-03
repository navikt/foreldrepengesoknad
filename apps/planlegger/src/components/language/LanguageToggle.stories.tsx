import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import LanguageToggle from './LanguageToggle';

const meta = {
    title: 'components/LanguageToggle',
    component: LanguageToggle,
} satisfies Meta<typeof LanguageToggle>;
export default meta;

type Story = StoryObj<typeof LanguageToggle>;

export const Default: Story = {
    args: {
        locale: 'nb',
        changeLocale: action('button-click'),
    },
};
