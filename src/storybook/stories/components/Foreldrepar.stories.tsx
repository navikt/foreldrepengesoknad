import React from 'react';
import { Story } from '@storybook/react';
import Foreldrepar from '../../../app/components/foreldrepar/Foreldrepar';

export default {
    title: 'components/Foreldrepar',
    component: Foreldrepar,
};

const Template: Story<any> = (args) => <Foreldrepar {...args} />;

export const Default = Template.bind({});
Default.args = {
    forelder1: 'mor1',
};

export const MorOgFar = Template.bind({});
MorOgFar.args = {
    forelder1: 'mor1',
    forelder2: 'far1',
};

export const MorHalvtSynlig = Template.bind({});
MorHalvtSynlig.args = {
    forelder1: 'mor1',
    forelder2: 'far1',
    variant: 'førsteForelderHalvtSynlig',
};

export const ForeldreSeparert = Template.bind({});
ForeldreSeparert.args = {
    forelder1: 'mor1',
    forelder2: 'far1',
    variant: 'foreldreSeparert',
};

export const ForeldreNærmere = Template.bind({});
ForeldreNærmere.args = {
    forelder1: 'mor1',
    forelder2: 'far1',
    variant: 'foreldreNærmere',
};

export const Kompakt = Template.bind({});
Kompakt.args = {
    forelder1: 'mor1',
    forelder2: 'far1',
    variant: 'foreldreNærmere',
    kompakt: true,
};
