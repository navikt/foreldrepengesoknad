import { StoryFn } from '@storybook/react';

import AvbrytSøknadDialog, { AvbrytSøknadDialogProps } from './AvbrytSoknadDialog';

export default {
    title: 'components/AvbrytSoknadDialog',
    component: AvbrytSøknadDialog,
};

const Template: StoryFn<AvbrytSøknadDialogProps> = (args) => <AvbrytSøknadDialog {...args} />;

export const Default = Template.bind({});
Default.args = {
    synlig: true,
    onAvbrytSøknad: () => null,
    onFortsettSøknad: () => null,
};
