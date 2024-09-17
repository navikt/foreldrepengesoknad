import { Meta, StoryObj } from '@storybook/react';

import { UttaksplanHexColor } from '@navikt/fp-common';

import PengerIkon from '../../common/penger-ikon/PengerIkon';
import Sirkelmaske from './Sirkelmaske';

const meta = {
    component: Sirkelmaske,
} satisfies Meta<typeof Sirkelmaske>;
export default meta;

type Story = StoryObj<typeof meta>;

export const InaktivSirkelmaske: Story = {
    args: {
        diameter: '3rem',
        aktiv: false,
        children: <PengerIkon size={48} />,
    },
};

export const AktivSirkelmaske: Story = {
    args: {
        ...InaktivSirkelmaske.args,
        aktiv: true,
    },
};

export const AktivSirkelmaskeMedBakgrunn: Story = {
    args: {
        ...InaktivSirkelmaske.args,
        aktiv: true,
        farge: UttaksplanHexColor.blaa,
    },
};
