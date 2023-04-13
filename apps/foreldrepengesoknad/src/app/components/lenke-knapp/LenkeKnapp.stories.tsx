import React from 'react';
import { StoryFn } from '@storybook/react';

import LenkeKnapp from './LenkeKnapp';

export default {
    title: 'components/LenkeKnapp',
    component: LenkeKnapp,
};

const Template: StoryFn<any> = (args) => <LenkeKnapp {...args} />;

export const Default = Template.bind({});
Default.args = {
    onClick: () => alert('Du har klikka!'),
    text: 'Knappetekst',
};
