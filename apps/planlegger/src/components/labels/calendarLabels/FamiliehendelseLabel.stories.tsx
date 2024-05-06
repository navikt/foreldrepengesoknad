import { Meta, StoryObj } from '@storybook/react';

import FamiliehendelseLabel from './FamiliehendelseLabel';

const meta = {
    title: 'components/FamiliehendelseLabel',
    component: FamiliehendelseLabel,
} satisfies Meta<typeof FamiliehendelseLabel>;
export default meta;

type Story = StoryObj<typeof FamiliehendelseLabel>;

export const FødselLabel: Story = {
    args: {
        barnet: {
            antallBarn: '1',
            erBarnetFødt: true,
            erFødsel: true,
            fødselsdato: '2024-01-04',
        },
    },
};

export const TermindatoLabel: Story = {
    args: {
        barnet: {
            antallBarn: '1',
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-01-04',
        },
    },
};

export const OmsorgsovertakelseLabel: Story = {
    args: {
        barnet: {
            antallBarn: '1',
            erBarnetFødt: true,
            erFødsel: false,
            fødselsdato: '2024-01-04',
            overtakelsesdato: '2024-01-04',
        },
    },
};
