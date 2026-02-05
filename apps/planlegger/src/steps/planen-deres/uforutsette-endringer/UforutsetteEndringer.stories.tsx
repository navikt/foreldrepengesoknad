import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps } from 'react';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';

import { HvemPlanleggerType } from '@navikt/fp-types';

import { UforutsetteEndringer } from './UforutsetteEndringer';

type StoryArgs = ComponentProps<typeof UforutsetteEndringer>;

const meta = {
    title: 'steg/PlanenDeresSteg/components/UforutsetteEndringer',
    component: UforutsetteEndringer,
    render: ({ hvemPlanlegger, arbeidssituasjon }) => {
        return <UforutsetteEndringer arbeidssituasjon={arbeidssituasjon} hvemPlanlegger={hvemPlanlegger} />;
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const AdopsjonMorOgFarBeggeHarRett: Story = {
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
    },
};
export const FødselMorOgFarBeggeHarRett: Story = {
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
    },
};
export const FødselMorOgMedmorBeggeHarRett: Story = {
    args: {
        hvemPlanlegger: {
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
            navnPåMor: 'Mor',
            navnPåMedmor: 'Medmor',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
    },
};
export const FødselMorOgMedmorKunMorHarRett: Story = {
    args: {
        hvemPlanlegger: {
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
            navnPåMor: 'Mor',
            navnPåMedmor: 'Medmor',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: false,
        },
    },
};
export const FødselMorOgMedmorKunMedmorHarRett: Story = {
    args: {
        hvemPlanlegger: {
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
            navnPåMor: 'Mor',
            navnPåMedmor: 'Medmor',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.INGEN,
            jobberAnnenPart: true,
        },
    },
};
export const FødselFarOgFarBeggeHarRett: Story = {
    args: {
        hvemPlanlegger: {
            type: HvemPlanleggerType.FAR_OG_FAR,
            navnPåMedfar: 'Medfar',
            navnPåFar: 'Far',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
    },
};
export const FødselFarOgFarKunFarHarRett: Story = {
    args: {
        hvemPlanlegger: {
            type: HvemPlanleggerType.FAR_OG_FAR,
            navnPåMedfar: 'Medfar',
            navnPåFar: 'Far',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: false,
        },
    },
};
export const FødselFarOgFarKunMedfarHarRett: Story = {
    args: {
        hvemPlanlegger: {
            type: HvemPlanleggerType.FAR_OG_FAR,
            navnPåMedfar: 'Medfar',
            navnPåFar: 'Far',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.INGEN,
            jobberAnnenPart: true,
        },
    },
};
export const FødselMorAleneomsorg: Story = {
    args: {
        hvemPlanlegger: {
            type: HvemPlanleggerType.MOR,
            navnPåMor: 'Mor',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
        },
    },
};
export const FødselFarAleneomsorg: Story = {
    args: {
        hvemPlanlegger: {
            type: HvemPlanleggerType.FAR,
            navnPåFar: 'Far',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
        },
    },
};
