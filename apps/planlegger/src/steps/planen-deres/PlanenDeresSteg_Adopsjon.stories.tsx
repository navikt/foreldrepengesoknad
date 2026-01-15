import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';

import { HvemPlanleggerType } from '@navikt/fp-types';
import {
    DELT_UTTAK_80_ADOPSJON,
    DELT_UTTAK_100_ADOPSJON,
    IKKE_DELT_UTTAK_80_ADOPSJON_MOR,
    IKKE_DELT_UTTAK_80_FARMEDMOR,
    IKKE_DELT_UTTAK_80_FARMEDMOR_MOR_UFØR,
    IKKE_DELT_UTTAK_80_FAR_OG_FAR_ADOPSJON,
    IKKE_DELT_UTTAK_100_ADOPSJON_MOR,
    IKKE_DELT_UTTAK_100_FARMEDMOR,
    IKKE_DELT_UTTAK_100_FARMEDMOR_MOR_UFØR,
    IKKE_DELT_UTTAK_100_FAR_OG_FAR_ADOPSJON,
} from '@navikt/fp-utils-test';

import { PlanenDeresSteg } from './PlanenDeresSteg';

const MINSTERETTER = {
    farRundtFødsel: 0,
    toTette: 0,
};

type StoryArgs = {
    hvemPlanlegger: HvemPlanlegger;
    hvorLangPeriode: HvorLangPeriode;
    fordeling?: Fordeling;
    omBarnet: OmBarnet;
    arbeidssituasjon: Arbeidssituasjon;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof PlanenDeresSteg>;

const meta = {
    title: 'steg/PlanenDeresSteg/Adopsjon',
    component: PlanenDeresSteg,
    render: ({
        gåTilNesteSide = action('button-click'),
        hvemPlanlegger,
        fordeling,
        hvorLangPeriode,
        omBarnet,
        arbeidssituasjon,
        stønadskontoer,
    }) => {
        return (
            <MemoryRouter initialEntries={[PlanleggerRoutes.PLANEN_DERES]}>
                <PlanleggerDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.FORDELING]: fordeling,
                        [ContextDataType.HVOR_LANG_PERIODE]: hvorLangPeriode,
                        [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                        [ContextDataType.OM_BARNET]: omBarnet,
                        [ContextDataType.ARBEIDSSITUASJON]: arbeidssituasjon,
                    }}
                >
                    <PlanenDeresSteg stønadskontoer={stønadskontoer} />
                </PlanleggerDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const MorOgFarBeggeHarRett: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåFar: 'Espen Utvikler',
            type: HvemPlanleggerType.MOR_OG_FAR,
        },
        omBarnet: {
            erFødsel: false,
            overtakelsesdato: '2024-07-08',
            fødselsdato: '2020-04-11',
            antallBarn: '1',
        },
        fordeling: {
            antallDagerSøker1: 0,
        },
        hvorLangPeriode: {
            dekningsgrad: '100',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '100': {
                kontoer: DELT_UTTAK_100_ADOPSJON,
                minsteretter: MINSTERETTER,
            },
            '80': {
                kontoer: DELT_UTTAK_80_ADOPSJON,
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const MorOgFarKunMorHarRett: Story = {
    args: {
        ...MorOgFarBeggeHarRett.args,
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: false,
        },
        stønadskontoer: {
            '100': {
                kontoer: IKKE_DELT_UTTAK_100_ADOPSJON_MOR,
                minsteretter: MINSTERETTER,
            },
            '80': {
                kontoer: IKKE_DELT_UTTAK_80_ADOPSJON_MOR,
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const MorOgFarKunFarHarRettMorErUfør: Story = {
    args: {
        ...MorOgFarBeggeHarRett.args,
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.UFØR,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '100': {
                kontoer: IKKE_DELT_UTTAK_100_FARMEDMOR_MOR_UFØR,
                minsteretter: MINSTERETTER,
            },
            '80': {
                kontoer: IKKE_DELT_UTTAK_80_FARMEDMOR_MOR_UFØR,
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const MorOgFarKunFarHarRettMorIngenAvDisse: Story = {
    args: {
        ...MorOgFarBeggeHarRett.args,
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.UFØR,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '100': {
                kontoer: IKKE_DELT_UTTAK_100_FARMEDMOR,
                minsteretter: MINSTERETTER,
            },
            '80': {
                kontoer: IKKE_DELT_UTTAK_80_FARMEDMOR,
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const MorOgMedmorBeggeHarRett: Story = {
    args: {
        ...MorOgFarBeggeHarRett.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåMedmor: 'Helga Utvikler',
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
        },
    },
};

export const MorOgMedmorKunMorHarRett: Story = {
    args: {
        ...MorOgFarKunMorHarRett.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåMedmor: 'Helga Utvikler',
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
        },
    },
};

export const MorOgMedmorKunMedmorHarRettMorErUfør: Story = {
    args: {
        ...MorOgFarKunFarHarRettMorErUfør.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåMedmor: 'Helga Utvikler',
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
        },
    },
};

export const MorOgMedmorKunMedmorHarRettMorIngenAvDisse: Story = {
    args: {
        ...MorOgFarKunFarHarRettMorIngenAvDisse.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåMedmor: 'Helga Utvikler',
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
        },
    },
};

export const BareMorSøkerOgHarRett: Story = {
    args: {
        ...MorOgFarBeggeHarRett.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            type: HvemPlanleggerType.MOR,
        },
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: undefined,
        },
        stønadskontoer: MorOgFarKunMorHarRett.args?.stønadskontoer,
    },
};

export const BareFarSøkerAleneOmOmsorg: Story = {
    args: {
        ...MorOgFarBeggeHarRett.args,
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            type: HvemPlanleggerType.FAR,
        },
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: undefined,
        },
        stønadskontoer: MorOgFarKunMorHarRett.args?.stønadskontoer,
    },
};

export const FarOgFarBeggeHarRett: Story = {
    args: {
        ...MorOgFarBeggeHarRett.args,
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMedfar: 'Anders Utvikler',
            type: HvemPlanleggerType.FAR_OG_FAR,
        },
    },
};

export const FarOgFarKunFarHarRett: Story = {
    args: {
        ...FarOgFarBeggeHarRett.args,
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: false,
        },
        stønadskontoer: {
            '80': {
                kontoer: IKKE_DELT_UTTAK_80_FAR_OG_FAR_ADOPSJON,
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: IKKE_DELT_UTTAK_100_FAR_OG_FAR_ADOPSJON,
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const FarOgFarKunMedfarHarRett: Story = {
    args: {
        ...FarOgFarBeggeHarRett.args,
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.INGEN,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '80': {
                kontoer: IKKE_DELT_UTTAK_80_FARMEDMOR,
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: IKKE_DELT_UTTAK_100_FARMEDMOR,
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const MorOgMedmorKunMorHarRettOmsorgsovertakelseIHelgen: Story = {
    args: {
        ...MorOgFarKunMorHarRett.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåMedmor: 'Helga Utvikler',
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
        },
        omBarnet: {
            erFødsel: false,
            overtakelsesdato: '2024-07-07',
            fødselsdato: '2020-04-11',
            antallBarn: '1',
        },
    },
};
