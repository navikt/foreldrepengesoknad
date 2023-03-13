import { ComponentMeta, Story } from '@storybook/react';
import BekreftDialog, { BekreftDialogProps } from './BekreftDialog';

export default {
    title: 'components/BekreftDialog',
    component: BekreftDialog,
} as ComponentMeta<typeof BekreftDialog>;

const Template: Story<BekreftDialogProps> = (args) => <BekreftDialog {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Bekreft dialog modal',
    onBekreft: () => console.log('Ja'),
    open: true,
    bekreftLabel: 'Ja',
    avbrytLabel: 'Nei',
    onClose: () => console.log('Klikket på lukk modal'),
};
