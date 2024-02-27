import { StoryFn } from '@storybook/react';

import { LocaleAll } from '@navikt/fp-types';

import LanguageToggle, { LanguageToggleProps } from './LanguageToggle';

export default {
    title: 'LanguageToggle',
    component: LanguageToggle,
};

const Template: StoryFn<LanguageToggleProps<LocaleAll>> = (args) => <LanguageToggle {...args} />;

export const Default = Template.bind({});
Default.args = {
    toggleLanguage: () => null,
    locale: 'nb',
    availableLocales: ['nb', 'nn', 'en'],
};
