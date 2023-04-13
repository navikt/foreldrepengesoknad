import React from 'react';
import { StoryFn } from '@storybook/react';
import InnholdMedIllustrasjon from './InnholdMedIllustrasjon';
import UkerSirkel from '../../../app/components/info-eksisterende-sak/illustrasjoner/uker-sirkel/UkerSirkel';

export default {
    title: 'components/InnholdMedIllustrasjon',
    component: InnholdMedIllustrasjon,
};

const Template: StoryFn<any> = (args) => <InnholdMedIllustrasjon {...args} />;

export const Default = Template.bind({});
Default.args = {
    tittel: 'Dette er en tittel',
};

export const MedIllustrasjon = Template.bind({});
MedIllustrasjon.args = {
    tittel: 'Dette er en tittel',
    illustrasjoner: [<UkerSirkel key="uker" uker={10} />],
};

export const MedIllustrasjonOgInfoboks = Template.bind({});
MedIllustrasjonOgInfoboks.args = {
    tittel: 'Dette er en tittel',
    illustrasjoner: [<UkerSirkel key="uker" uker={10} />],
    infoboks: <div>Dette er en infoboks</div>,
};
