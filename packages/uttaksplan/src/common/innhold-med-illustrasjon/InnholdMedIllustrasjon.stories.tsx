import { Meta, StoryObj } from '@storybook/react';

import UkerSirkel from '../uker-sirkel/UkerSirkel';
import InnholdMedIllustrasjon from './InnholdMedIllustrasjon';

const meta = {
    title: 'components/InnholdMedIllustrasjon',
    component: InnholdMedIllustrasjon,
} satisfies Meta<typeof InnholdMedIllustrasjon>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        tittel: 'Dette er en tittel',
    },
};

export const MedIllustrasjon: Story = {
    args: {
        ...Default.args,
        illustrasjoner: [<UkerSirkel key="uker" uker={10} />],
    },
};

export const MedIllustrasjonOgInfoboks: Story = {
    args: {
        ...MedIllustrasjon.args,
        infoboks: <div>Dette er en infoboks</div>,
    },
};
