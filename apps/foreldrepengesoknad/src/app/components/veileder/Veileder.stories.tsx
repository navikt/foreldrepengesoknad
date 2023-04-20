import React from 'react';
import { StoryFn } from '@storybook/react';

import Veileder from './Veileder';

export default {
    title: 'components/Veileder',
    component: Veileder,
    decorators: [
        (Story: StoryFn) => (
            <div style={{ margin: 'auto', width: '10em' }}>
                <Story />
            </div>
        ),
    ],
};

const Template: StoryFn<any> = (args) => <Veileder {...args} />;

export const Default = Template.bind({});

export const MedAnsiktUndrende = Template.bind({});
MedAnsiktUndrende.args = {
    ansikt: 'undrende',
};

export const MedAnsiktSkeptisk = Template.bind({});
MedAnsiktSkeptisk.args = {
    ansikt: 'skeptisk',
};

export const MedFargeGrøn = Template.bind({});
MedFargeGrøn.args = {
    farge: 'gronn',
};

export const MedFargeBlå = Template.bind({});
MedFargeBlå.args = {
    farge: 'bla',
};

export const MedFargeTransparent = Template.bind({});
MedFargeTransparent.args = {
    farge: 'transparent',
};

export const MedStilKompakt = Template.bind({});
MedStilKompakt.args = {
    stil: 'kompakt',
};
