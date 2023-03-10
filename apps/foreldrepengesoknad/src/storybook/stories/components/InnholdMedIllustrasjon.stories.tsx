import React from 'react';
import { Story } from '@storybook/react';
import InnholdMedIllustrasjon from '../../../app/components/innhold-med-illustrasjon/InnholdMedIllustrasjon';
import UkerSirkel from '../../../app/components/info-eksisterende-sak/illustrasjoner/uker-sirkel/UkerSirkel';

export default {
    title: 'components/InnholdMedIllustrasjon',
    component: InnholdMedIllustrasjon,
};

const Template: Story<any> = (args) => <InnholdMedIllustrasjon {...args} />;

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
