import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';

import { HvemPlanleggerType, KontoBeregningDto } from '@navikt/fp-types';
import {
    DELT_UTTAK_80,
    DELT_UTTAK_80_TO_BARN,
    DELT_UTTAK_100,
    DELT_UTTAK_100_TO_BARN,
    IKKE_DELT_UTTAK_80_FARMEDMOR,
    IKKE_DELT_UTTAK_80_FAR_OG_FAR,
    IKKE_DELT_UTTAK_80_MOR,
    IKKE_DELT_UTTAK_100_FARMEDMOR,
    IKKE_DELT_UTTAK_100_FAR_OG_FAR,
    IKKE_DELT_UTTAK_100_MOR,
} from '@navikt/fp-utils-test';

import { HvorLangPeriodeSteg } from './HvorLangPeriodeSteg';

// TODO: Benytt dayjs for å håndtere datoer i testene. Spesielt for å sørge for at fremtidige datoer alltid er fremtidige.

const MINSTERETTER = {
    farRundtFødsel: 10,
    toTette: 0,
};

type StoryArgs = {
    hvemPlanlegger: HvemPlanlegger;
    omBarnet: OmBarnet;
    arbeidssituasjon: Arbeidssituasjon;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof HvorLangPeriodeSteg>;

const meta = {
    title: 'steg/HvorLangPeriodeSteg',
    component: HvorLangPeriodeSteg,
    render: ({
        hvemPlanlegger,
        omBarnet,
        arbeidssituasjon,
        stønadskontoer,
        gåTilNesteSide = action('button-click'),
    }: StoryArgs) => {
        return (
            <MemoryRouter initialEntries={[PlanleggerRoutes.HVOR_LANG_PERIODE]}>
                <PlanleggerDataContext
                    initialState={{
                        [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                        [ContextDataType.OM_BARNET]: omBarnet,
                        [ContextDataType.ARBEIDSSITUASJON]: arbeidssituasjon,
                    }}
                    onDispatch={gåTilNesteSide}
                >
                    <HvorLangPeriodeSteg stønadskontoer={stønadskontoer} />
                </PlanleggerDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FlereForsørgereEttBarnKunMorHarRett: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR_OG_FAR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-07-03',
            antallBarn: '1',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '80': {
                kontoer: DELT_UTTAK_80,
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: DELT_UTTAK_100,
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const FlereForsørgereEttBarnBeggeHarRettAdopsjon: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR_OG_FAR,
        },
        omBarnet: {
            antallBarn: '1',
            erFødsel: false,
            fødselsdato: '2025-07-08',
            overtakelsesdato: '2025-07-08',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '80': {
                kontoer: DELT_UTTAK_80,
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: DELT_UTTAK_100,
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const FlereForsørgereToBarn: Story = {
    args: {
        ...FlereForsørgereEttBarnKunMorHarRett.args,
        omBarnet: {
            ...FlereForsørgereEttBarnKunMorHarRett.args.omBarnet,
            antallBarn: '2',
        },
        hvemPlanlegger: {
            navnPåMedmor: 'Esther Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '80': {
                kontoer: DELT_UTTAK_80_TO_BARN,
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: DELT_UTTAK_100_TO_BARN,
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const AleneforsørgerMorEttBarn: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-07-01',
            antallBarn: '1',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
        },
        stønadskontoer: {
            '80': {
                kontoer: IKKE_DELT_UTTAK_80_MOR,
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: IKKE_DELT_UTTAK_100_MOR,
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const FlereForsørgereKunFarHarRett: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR_OG_FAR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-07-01',
            antallBarn: '1',
        },
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
export const FlereForsørgereFarOgFarKunFar1HarRettAdopsjon: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMedfar: 'Hugo Utvikler',
            type: HvemPlanleggerType.FAR_OG_FAR,
        },
        omBarnet: {
            erBarnetFødt: true,
            fødselsdato: '2024-07-01',
            erFødsel: false,
            overtakelsesdato: '2024-07-01',
            antallBarn: '1',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: false,
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

export const FlereForsørgereFarOgFarKunFar1HarRettFødsel: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMedfar: 'Hugo Utvikler',
            type: HvemPlanleggerType.FAR_OG_FAR,
        },
        omBarnet: {
            erBarnetFødt: true,
            fødselsdato: '2024-01-01',
            erFødsel: true,
            antallBarn: '1',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: false,
        },
        stønadskontoer: {
            '80': {
                kontoer: IKKE_DELT_UTTAK_80_FAR_OG_FAR,
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: IKKE_DELT_UTTAK_100_FAR_OG_FAR,
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const AleneforsørgerFarToBarn: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            type: HvemPlanleggerType.FAR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-07-01',
            antallBarn: '2',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
        },
        stønadskontoer: {
            '80': {
                kontoer: [{ konto: 'FORELDREPENGER', dager: 291 }],
                minsteretter: MINSTERETTER,
            } satisfies KontoBeregningDto,
            '100': {
                kontoer: [{ konto: 'FORELDREPENGER', dager: 230 }],
                minsteretter: MINSTERETTER,
            } satisfies KontoBeregningDto,
        },
    },
};

export const FarOgFarBeggeHarRett: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMedfar: 'Anders Utvikler',
            type: HvemPlanleggerType.FAR_OG_FAR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-07-01',
            antallBarn: '1',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '100': {
                kontoer: [
                    { konto: 'FORELDREPENGER', dager: 125 },
                    { konto: 'AKTIVITETSFRI_KVOTE', dager: 75 },
                ],
                minsteretter: {
                    farRundtFødsel: 0,
                    toTette: 0,
                },
            } satisfies KontoBeregningDto,
            '80': {
                kontoer: [
                    { konto: 'FORELDREPENGER', dager: 166 },
                    { konto: 'AKTIVITETSFRI_KVOTE', dager: 95 },
                ],
                minsteretter: {
                    farRundtFødsel: 0,
                    toTette: 0,
                },
            } satisfies KontoBeregningDto,
        },
    },
};
