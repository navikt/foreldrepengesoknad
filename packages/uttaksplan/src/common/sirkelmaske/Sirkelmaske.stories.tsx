import { StoryFn } from '@storybook/react';

import PengerIkon from '../../common/penger-ikon/PengerIkon';
import Sirkelmaske from './Sirkelmaske';

export default {
    title: 'components/Sirkelmaske',
    component: Sirkelmaske,
};

const Template: StoryFn<any> = (args) => (
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
