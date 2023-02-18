import React from 'react';
import { Story } from '@storybook/react';

import Personkort from 'app/components/personkort/Personkort';
import CheckmarkIkon from 'app/assets/CheckmarkIkon';

export default {
    title: 'components/Personkort',
    component: Personkort,
};

const Template: Story<any> = (args) => <Personkort {...args} />;

export const Default = Template.bind({});
Default.args = {
    tittel: 'Dette er en tittel',
    children: <div>Dette er innholdet</div>,
};

export const PersonkortMedIkon = Template.bind({});
PersonkortMedIkon.args = {
    tittel: 'Dette er en tittel',
    children: <div>Dette er innholdet</div>,
    ikon: <CheckmarkIkon />,
};

export const PersonkortMedInvertertTekst = Template.bind({});
PersonkortMedInvertertTekst.args = {
    tittel: 'Dette er en tittel',
    children: <div>Dette er innholdet</div>,
    invertert: true,
};

export const PersonkortMedTextAlignBottom = Template.bind({});
PersonkortMedTextAlignBottom.args = {
    tittel: 'Dette er en tittel',
    children: <div>Dette er innholdet</div>,
    textValign: 'bottom',
};
