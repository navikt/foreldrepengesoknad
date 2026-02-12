import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps } from 'react';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';

import { HvemPlanleggerType } from '@navikt/fp-types';

import { UforutsetteEndringer } from './UforutsetteEndringer';

type StoryArgs = ComponentProps<typeof UforutsetteEndringer>;

const meta = {
    title: 'steg/PlanenDeresSteg/components/UforutsetteEndringer',
    component: UforutsetteEndringer,
    render: ({ hvemPlanlegger, barnet, arbeidssituasjon }) => {
        return (
            <UforutsetteEndringer arbeidssituasjon={arbeidssituasjon} hvemPlanlegger={hvemPlanlegger} barnet={barnet} />
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const AdopsjonMorOgFarBeggeHarRettToBarn: Story = {
    args: {
        hvemPlanlegger: {
            type: HvemPlanleggerType.MOR_OG_FAR,
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
            type: HvemPlanleggerType.MOR_OG_FAR,
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
            type: HvemPlanleggerType.MOR_OG_FAR,
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
