import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';

import { HvemPlanleggerType } from '@navikt/fp-types';

import { OmÅTilpassePlanen } from './OmÅTilpassePlanen';

type StoryArgs = ComponentProps<typeof OmÅTilpassePlanen>;

const meta = {
    title: 'steg/PlanenDeresSteg/components/OmÅTilpassePlanen - Adopsjon',
    component: OmÅTilpassePlanen,
    render: ({ hvemPlanlegger, barnet, arbeidssituasjon }) => {
        return (
            <OmÅTilpassePlanen arbeidssituasjon={arbeidssituasjon} hvemPlanlegger={hvemPlanlegger} barnet={barnet} />
        );
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
        barnet: {
            antallBarn: '1',
            overtakelsesdato: '2022-01-01',
            fødselsdato: '2022-01-01',
            erFødsel: false,
            erBarnetFødt: true,
        },
    },
};
export const AdopsjonMorOgFarKunMorHarRett: Story = {
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
            overtakelsesdato: '2022-01-01',
            fødselsdato: '2022-01-01',
            erFødsel: false,
            erBarnetFødt: true,
        },
    },
};
export const AdopsjonMorOgFarKunFarHarRett: Story = {
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
            overtakelsesdato: '2022-01-01',
            fødselsdato: '2022-01-01',
            erFødsel: false,
            erBarnetFødt: true,
        },
    },
};
export const AdopsjonMorOgMedmorBeggeHarRett: Story = {
    args: {
        hvemPlanlegger: {
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
            navnPåMedmor: 'Medmor',
            navnPåMor: 'Mor',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
        barnet: {
            antallBarn: '1',
            overtakelsesdato: '2022-01-01',
            fødselsdato: '2022-01-01',
            erFødsel: false,
            erBarnetFødt: true,
        },
    },
};
export const AdopsjonMorOgMedmorKunMedmorHarRett: Story = {
    args: {
        hvemPlanlegger: {
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
            navnPåMedmor: 'Medmor',
            navnPåMor: 'Mor',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.INGEN,
            jobberAnnenPart: true,
        },
        barnet: {
            antallBarn: '1',
            overtakelsesdato: '2022-01-01',
            fødselsdato: '2022-01-01',
            erFødsel: false,
            erBarnetFødt: true,
        },
    },
};
export const AdopsjonMorOgMedmorKunMorHarRett: Story = {
    args: {
        hvemPlanlegger: {
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
            navnPåMedmor: 'Medmor',
            navnPåMor: 'Mor',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: false,
        },
        barnet: {
            antallBarn: '1',
            overtakelsesdato: '2022-01-01',
            fødselsdato: '2022-01-01',
            erFødsel: false,
            erBarnetFødt: true,
        },
    },
};

export const AdopsjonFarOgFarBeggeHarRett: Story = {
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
        barnet: {
            antallBarn: '1',
            overtakelsesdato: '2022-01-01',
            fødselsdato: '2022-01-01',
            erFødsel: false,
            erBarnetFødt: true,
        },
    },
};

export const AdopsjonFarOgFarKunFar1HarRett: Story = {
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
        barnet: {
            antallBarn: '1',
            overtakelsesdato: '2022-01-01',
            fødselsdato: '2022-01-01',
            erFødsel: false,
            erBarnetFødt: true,
        },
    },
};

export const AdopsjonFarOgFarKunFar2HarRett: Story = {
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
        barnet: {
            antallBarn: '1',
            overtakelsesdato: '2022-01-01',
            fødselsdato: '2022-01-01',
            erFødsel: false,
            erBarnetFødt: true,
        },
    },
};
export const AdopsjonAleneforsørgerMor: Story = {
    args: {
        hvemPlanlegger: {
            type: HvemPlanleggerType.MOR,
            navnPåMor: 'Mor',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
        },
        barnet: {
            antallBarn: '1',
            overtakelsesdato: '2022-01-01',
            fødselsdato: '2022-01-01',
            erFødsel: false,
            erBarnetFødt: true,
        },
    },
};
export const AdopsjonAleneforsørgerFar: Story = {
    args: {
        hvemPlanlegger: {
            type: HvemPlanleggerType.FAR,
            navnPåFar: 'Far',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
        },
        barnet: {
            antallBarn: '1',
            overtakelsesdato: '2022-01-01',
            fødselsdato: '2022-01-01',
            erFødsel: false,
            erBarnetFødt: true,
        },
    },
};
