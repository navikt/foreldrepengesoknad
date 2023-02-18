import React from 'react';
import { Story } from '@storybook/react';

import Veileder from 'app/components/veileder/Veileder';

export default {
    title: 'components/Veileder',
    component: Veileder,
    decorators: [
        (Story: Story) => (
            <div style={{ margin: 'auto', width: '10em' }}>
                <Story />
            </div>
        ),
    ],
};

const Template: Story<any> = (args) => <Veileder {...args} />;

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
