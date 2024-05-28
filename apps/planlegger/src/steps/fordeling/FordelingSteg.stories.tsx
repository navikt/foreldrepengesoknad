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

import { initAmplitude } from '@navikt/fp-metrics';
import { StønadskontoType } from '@navikt/fp-types';

import FordelingSteg from './FordelingSteg';

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
            { konto: StønadskontoType.Fellesperiode, dager: 90 },
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
    gåTilNesteSide: (action: Action) => void;
} & ComponentProps<typeof FordelingSteg>;

type Story = StoryObj<StoryArgs>;

const customRenderer = ({
    hvemPlanlegger,
    omBarnet,
    stønadskontoer = DEFAULT_STØNADSKONTO,
    gåTilNesteSide = action('button-click'),
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
                    [ContextDataType.HVOR_LANG_PERIODE]: { dekningsgrad: Dekningsgrad.HUNDRE_PROSENT },
                }}
                onDispatch={gåTilNesteSide}
            >
                <FordelingSteg stønadskontoer={stønadskontoer} />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

const meta = {
    title: 'steg/FordelingSteg',
    component: FordelingSteg,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

export const FlereForsørgereEttBarn: Story = {
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
    },
};

export const FlereForsørgereToBarn: Story = {
    args: {
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
    },
};

export const FarOgFar: Story = {
    args: {
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
    },
};
