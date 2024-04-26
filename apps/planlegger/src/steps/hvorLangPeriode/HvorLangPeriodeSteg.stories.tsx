import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import { StønadskontoType } from 'types/TilgjengeligeStønadskontoer';

import { initAmplitude } from '@navikt/fp-metrics';

import HvorLangPeriodeSteg from './HvorLangPeriodeSteg';

const MINSTERETTER = {
    farRundtFødsel: 10,
    toTette: 0,
};

type StoryArgs = {
    hvemPlanlegger: HvemPlanlegger;
    omBarnet: OmBarnet;
    arbeidssituasjon: Arbeidssituasjon;
    gåTilNesteSide: (action: Action) => void;
} & ComponentProps<typeof HvorLangPeriodeSteg>;

type Story = StoryObj<StoryArgs>;

const customRenderer = ({
    hvemPlanlegger,
    omBarnet,
    arbeidssituasjon,
    stønadskontoer,
    gåTilNesteSide = action('button-click'),
}: StoryArgs) => {
    initAmplitude();
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
                <HvorLangPeriodeSteg stønadskontoer={stønadskontoer} locale="nb" />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

const meta = {
    title: 'HvorLangPeriodeSteg',
    component: HvorLangPeriodeSteg,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

export const FlereForsørgereEttBarnKunMorHarRett: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR_OG_FAR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-01-01',
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
                    { konto: StønadskontoType.Fellesperiode, dager: 90 },
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
        hvemPlanlegger: {
            navnPåMedmor: 'Esther Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR_OG_MEDMOR,
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
                    { konto: StønadskontoType.Fellesperiode, dager: 90 },
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

export const AleneforsørgerMorEttBarn: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-01-01',
            antallBarn: '1',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
        },
        stønadskontoer: {
            '80': {
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 280 },
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
            type: Situasjon.MOR_OG_FAR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-01-01',
            antallBarn: '1',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.INGEN,
            jobberAnnenPart: true,
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
export const FlereForsørgereFarOgFarKunFar1HarRett: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMedfar: 'Hugo Utvikler',
            type: Situasjon.FAR_OG_FAR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-01-01',
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
            type: Situasjon.FAR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-01-01',
            antallBarn: '2',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
        },
        stønadskontoer: {
            '80': {
                kontoer: [{ konto: StønadskontoType.Foreldrepenger, dager: 280 }],
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
            type: Situasjon.FAR_OG_FAR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-01-01',
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
                    { konto: StønadskontoType.Fellesperiode, dager: 90 },
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
