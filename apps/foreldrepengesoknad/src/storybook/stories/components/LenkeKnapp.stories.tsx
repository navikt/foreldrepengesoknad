import React from 'react';
import { Story } from '@storybook/react';

import LenkeKnapp from 'app/components/lenke-knapp/LenkeKnapp';

export default {
    title: 'components/LenkeKnapp',
    component: LenkeKnapp,
};

const Template: Story<any> = (args) => <LenkeKnapp {...args} />;

export const Default = Template.bind({});
Default.args = {
    onClick: () => alert('Du har klikka!'),
    text: 'Knappetekst',
};
