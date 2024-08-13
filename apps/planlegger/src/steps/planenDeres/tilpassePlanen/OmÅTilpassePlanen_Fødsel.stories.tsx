import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { Situasjon } from 'types/HvemPlanlegger';

import OmÅTilpassePlanen from './OmÅTilpassePlanen';

type StoryArgs = ComponentProps<typeof OmÅTilpassePlanen>;

type Story = StoryObj<StoryArgs>;

const customRenderer = ({ hvemPlanlegger, barnet, arbeidssituasjon }: StoryArgs) => {
    return <OmÅTilpassePlanen arbeidssituasjon={arbeidssituasjon} hvemPlanlegger={hvemPlanlegger} barnet={barnet} />;
};

const meta = {
    title: 'steg/PlanenDeresSteg/components/OmÅTilpassePlanen - Fødsel',
    component: OmÅTilpassePlanen,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

export const FødselMorOgFarBeggeHarRett: Story = {
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
export const FødselMorOgMedmorBeggeHarRett: Story = {
    args: {
        hvemPlanlegger: {
            type: Situasjon.MOR_OG_MEDMOR,
            navnPåMor: 'Mor',
            navnPåMedmor: 'Medmor',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
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
export const FødselMorOgMedmorKunMorHarRett: Story = {
    args: {
        hvemPlanlegger: {
            type: Situasjon.MOR_OG_MEDMOR,
            navnPåMor: 'Mor',
            navnPåMedmor: 'Medmor',
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
export const FødselMorOgMedmorKunMedmorHarRett: Story = {
    args: {
        hvemPlanlegger: {
            type: Situasjon.MOR_OG_MEDMOR,
            navnPåMor: 'Mor',
            navnPåMedmor: 'Medmor',
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
export const FødselFarOgFarBeggeHarRett: Story = {
    args: {
        hvemPlanlegger: {
            type: Situasjon.FAR_OG_FAR,
            navnPåMedfar: 'Medfar',
            navnPåFar: 'Far',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
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
export const FødselFarOgFarKunFar1HarRett: Story = {
    args: {
        hvemPlanlegger: {
            type: Situasjon.FAR_OG_FAR,
            navnPåMedfar: 'Medfar',
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
export const FødselAleneforsørgerMor: Story = {
    args: {
        hvemPlanlegger: {
            type: Situasjon.MOR,
            navnPåMor: 'Mor',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
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
export const FødselAleneforsørgerFar: Story = {
    args: {
        hvemPlanlegger: {
            type: Situasjon.FAR,
            navnPåFar: 'Far',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
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
