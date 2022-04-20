import React from 'react';
import { Story } from '@storybook/react';
import Sirkelmaske from '../../../app/components/sirkelmaske/Sirkelmaske';
import PengerIkon from 'app/assets/PengerIkon';

export default {
    title: 'components/Sirkelmaske',
    component: Sirkelmaske,
};

const Template: Story<any> = (args) => (
    <Sirkelmaske {...args}>
        <PengerIkon size={48} />
    </Sirkelmaske>
);

export const InaktivSirkelmaske = Template.bind({});
InaktivSirkelmaske.args = {
    diameter: '3rem',
    aktiv: false,
};

export const AktivSirkelmaske = Template.bind({});
AktivSirkelmaske.args = {
    diameter: '3rem',
    aktiv: true,
};

export const AktivSirkelmaskeMedBakgrunn = Template.bind({});
AktivSirkelmaskeMedBakgrunn.args = {
    diameter: '3rem',
    aktiv: true,
    farge: '#0067C5',
};
