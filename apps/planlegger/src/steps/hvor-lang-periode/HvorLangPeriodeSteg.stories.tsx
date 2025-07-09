import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';

import { StønadskontoType } from '@navikt/fp-constants';
import { HvemPlanleggerType } from '@navikt/fp-types';

import { HvorLangPeriodeSteg } from './HvorLangPeriodeSteg';

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
                kontoer: [
                    { konto: StønadskontoType.Mødrekvote, dager: 95 },
                    { konto: StønadskontoType.Fedrekvote, dager: 95 },
                    { konto: StønadskontoType.Fellesperiode, dager: 101 },
                    { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
                ],
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: [
                    { konto: StønadskontoType.Mødrekvote, dager: 75 },
                    { konto: StønadskontoType.Fedrekvote, dager: 75 },
                    { konto: StønadskontoType.Fellesperiode, dager: 80 },
                    { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
                ],
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
                kontoer: [
                    { konto: StønadskontoType.Mødrekvote, dager: 95 },
                    { konto: StønadskontoType.Fedrekvote, dager: 95 },
                    { konto: StønadskontoType.Fellesperiode, dager: 101 },
                    { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
                ],
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: [
                    { konto: StønadskontoType.Mødrekvote, dager: 75 },
                    { konto: StønadskontoType.Fedrekvote, dager: 75 },
                    { konto: StønadskontoType.Fellesperiode, dager: 80 },
                    { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
                ],
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
                kontoer: [
                    { konto: StønadskontoType.Mødrekvote, dager: 95 },
                    { konto: StønadskontoType.Fedrekvote, dager: 95 },
                    { konto: StønadskontoType.Fellesperiode, dager: 207 },
                    { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
                ],
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: [
                    { konto: StønadskontoType.Mødrekvote, dager: 75 },
                    { konto: StønadskontoType.Fedrekvote, dager: 75 },
                    { konto: StønadskontoType.Fellesperiode, dager: 165 },
                    { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
                ],
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
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 291 },
                    { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
                ],
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 230 },
                    { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
                ],
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
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 211 },
                    { konto: StønadskontoType.AktivitetsfriKvote, dager: 50 },
                ],
                minsteretter: {
                    farRundtFødsel: 10,
                    toTette: 0,
                },
            },
            '100': {
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 150 },
                    { konto: StønadskontoType.AktivitetsfriKvote, dager: 50 },
                ],
                minsteretter: {
                    farRundtFødsel: 10,
                    toTette: 0,
                },
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
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 211 },
                    { konto: StønadskontoType.AktivitetsfriKvote, dager: 50 },
                ],
                minsteretter: {
                    farRundtFødsel: 10,
                    toTette: 0,
                },
            },
            '100': {
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 150 },
                    { konto: StønadskontoType.AktivitetsfriKvote, dager: 50 },
                ],
                minsteretter: {
                    farRundtFødsel: 10,
                    toTette: 0,
                },
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
                kontoer: [{ konto: StønadskontoType.Foreldrepenger, dager: 250 }],
                minsteretter: {
                    farRundtFødsel: 10,
                    toTette: 0,
                },
            },
            '100': {
                kontoer: [{ konto: StønadskontoType.Foreldrepenger, dager: 200 }],
                minsteretter: {
                    farRundtFødsel: 10,
                    toTette: 0,
                },
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
                kontoer: [{ konto: StønadskontoType.Foreldrepenger, dager: 291 }],
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: [{ konto: StønadskontoType.Foreldrepenger, dager: 230 }],
                minsteretter: MINSTERETTER,
            },
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
                    { konto: StønadskontoType.Foreldrepenger, dager: 125 },
                    { konto: StønadskontoType.AktivitetsfriKvote, dager: 75 },
                ],
                minsteretter: {
                    farRundtFødsel: 0,
                    toTette: 0,
                },
            },
            '80': {
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 166 },
                    { konto: StønadskontoType.AktivitetsfriKvote, dager: 95 },
                ],
                minsteretter: {
                    farRundtFødsel: 0,
                    toTette: 0,
                },
            },
        },
    },
};
