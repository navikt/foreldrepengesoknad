import React from 'react';
import { StoryFn } from '@storybook/react';

import CheckmarkIkon from 'app/assets/CheckmarkIkon';
import Personkort from './Personkort';

export default {
    title: 'components/Personkort',
    component: Personkort,
};

const Template: StoryFn<any> = (args) => <Personkort {...args} />;

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
