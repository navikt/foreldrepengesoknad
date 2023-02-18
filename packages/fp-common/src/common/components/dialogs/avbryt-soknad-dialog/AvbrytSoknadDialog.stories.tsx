import { ComponentMeta, Story } from '@storybook/react';
import AvbrytSøknadDialog, { AvbrytSøknadDialogProps } from './AvbrytSoknadDialog';

export default {
    title: 'components/AvbrytSoknadDialog',
    component: AvbrytSøknadDialog,
} as ComponentMeta<typeof AvbrytSøknadDialog>;

const Template: Story<AvbrytSøknadDialogProps> = (args) => <AvbrytSøknadDialog {...args} />;

export const Default = Template.bind({});
Default.args = {
    synlig: true,
    onAvbrytSøknad: () => null,
    onFortsettSøknad: () => null,
};
