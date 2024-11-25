import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';

import { StønadskontoType } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';

import { FordelingSteg } from './FordelingSteg';

const DEFAULT_STØNADSKONTO = {
    '100': {
        kontoer: [
            { konto: StønadskontoType.Mødrekvote, dager: 75 },
            { konto: StønadskontoType.Fedrekvote, dager: 75 },
            { konto: StønadskontoType.Fellesperiode, dager: 80 },
            { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    },
    '80': {
        kontoer: [
            { konto: StønadskontoType.Mødrekvote, dager: 95 },
            { konto: StønadskontoType.Fedrekvote, dager: 95 },
            { konto: StønadskontoType.Fellesperiode, dager: 101 },
            { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    },
};

type StoryArgs = {
    hvemPlanlegger: HvemPlanlegger;
    omBarnet: OmBarnet;
    dekningsgrad?: Dekningsgrad;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof FordelingSteg>;

const meta = {
    title: 'steg/FordelingSteg',
    component: FordelingSteg,
    render: ({
        hvemPlanlegger,
        omBarnet,
        stønadskontoer,
        gåTilNesteSide = action('button-click'),
        dekningsgrad = Dekningsgrad.HUNDRE_PROSENT,
        locale,
    }: StoryArgs) => {
        initAmplitude();
        return (
            <MemoryRouter initialEntries={[PlanleggerRoutes.FORDELING]}>
                <PlanleggerDataContext
                    initialState={{
                        [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                        [ContextDataType.ARBEIDSSITUASJON]: {
                            status: Arbeidsstatus.JOBBER,
                            jobberAnnenPart: true,
                        },
                        [ContextDataType.OM_BARNET]: omBarnet,
                        [ContextDataType.HVOR_LANG_PERIODE]: { dekningsgrad },
                    }}
                    onDispatch={gåTilNesteSide}
                >
                    <FordelingSteg stønadskontoer={stønadskontoer} locale={locale} />
                </PlanleggerDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

export const FlereForsørgereEttBarn: Story = {
    args: {
        locale: 'nb',
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
        stønadskontoer: DEFAULT_STØNADSKONTO,
    },
};

type Story = StoryObj<typeof meta>;

export const FlereForsørgereEttBarn80ProsentDekningsgrad: Story = {
    args: {
        locale: 'nb',
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
        dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
        stønadskontoer: DEFAULT_STØNADSKONTO,
    },
};

export const FlereForsørgereToBarn: Story = {
    args: {
        locale: 'nb',
        hvemPlanlegger: {
            navnPåMedmor: 'Esther Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR_OG_MEDMOR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-01-01',
            antallBarn: '2',
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        stønadskontoer: DEFAULT_STØNADSKONTO,
    },
};

export const FarOgFar: Story = {
    args: {
        locale: 'nb',
        hvemPlanlegger: {
            navnPåFar: 'Petter Pjokk',
            navnPåMedfar: 'Espen Utvikler',
            type: Situasjon.FAR_OG_FAR,
        },
        omBarnet: {
            erFødsel: false,
            fødselsdato: '2024-01-01',
            antallBarn: '2',
            overtakelsesdato: '2024-01-01',
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        stønadskontoer: DEFAULT_STØNADSKONTO,
    },
};
