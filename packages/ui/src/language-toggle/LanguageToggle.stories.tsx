import { Meta, StoryObj } from '@storybook/react';

import LanguageToggle from './LanguageToggle';

const meta = {
    component: LanguageToggle,
} satisfies Meta<typeof LanguageToggle>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        toggleLanguage: () => null,
        locale: 'nb',
        availableLocales: ['nb', 'nn', 'en'],
    },
};
