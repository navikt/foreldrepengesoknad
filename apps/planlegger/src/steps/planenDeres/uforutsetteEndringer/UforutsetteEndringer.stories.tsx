import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { Situasjon } from 'types/HvemPlanlegger';

import UforutsetteEndringer from './UforutsetteEndringer';

type StoryArgs = ComponentProps<typeof UforutsetteEndringer>;

type Story = StoryObj<StoryArgs>;

const customRenderer = ({ hvemPlanlegger, barnet, arbeidssituasjon }: StoryArgs) => {
    return <UforutsetteEndringer arbeidssituasjon={arbeidssituasjon} hvemPlanlegger={hvemPlanlegger} barnet={barnet} />;
};

const meta = {
    title: 'steg/PlanenDeresSteg/components/UforutsetteEndringer',
    component: UforutsetteEndringer,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

export const AdopsjonMorOgFarBeggeHarRettToBarn: Story = {
    args: {
        hvemPlanlegger: {
            type: Situasjon.MOR_OG_FAR,
            navnPåMor: 'Mor',
            navnPåFar: 'Far',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
        barnet: {
            antallBarn: '2',
            overtakelsesdato: '2022-01-01',
            fødselsdato: '2022-01-01',
            erFødsel: false,
            erBarnetFødt: true,
        },
    },
};
export const FødselMorOgFarKunFarHarRett: Story = {
    args: {
        hvemPlanlegger: {
            type: Situasjon.MOR_OG_FAR,
            navnPåMor: 'Mor',
            navnPåFar: 'Far',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.INGEN,
            jobberAnnenPart: true,
        },
        barnet: {
            antallBarn: '1',
            termindato: '2022-01-01',
            fødselsdato: '2022-01-01',
            erFødsel: true,
            erBarnetFødt: true,
        },
    },
};
export const FødselMorOgFarKunMorHarRett: Story = {
    args: {
        hvemPlanlegger: {
            type: Situasjon.MOR_OG_FAR,
            navnPåMor: 'Mor',
            navnPåFar: 'Far',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: false,
        },
        barnet: {
            antallBarn: '1',
            termindato: '2022-01-01',
            fødselsdato: '2022-01-01',
            erFødsel: true,
            erBarnetFødt: true,
        },
    },
};
