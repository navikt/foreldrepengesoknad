import { StoryFn } from '@storybook/react';

import BekreftDialog, { BekreftDialogProps } from './BekreftDialog';

export default {
    title: 'components/BekreftDialog',
    component: BekreftDialog,
};

const Template: StoryFn<BekreftDialogProps> = (args) => <BekreftDialog {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Bekreft dialog modal',
    // eslint-disable-next-line no-console
    onBekreft: () => console.log('Ja'),
    open: true,
    bekreftLabel: 'Ja',
    avbrytLabel: 'Nei',
    // eslint-disable-next-line no-console
    onClose: () => console.log('Klikket på lukk modal'),
};
