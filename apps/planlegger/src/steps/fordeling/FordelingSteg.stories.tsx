import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';

import { Dekningsgrad, HvemPlanleggerType, KontoBeregningDto } from '@navikt/fp-types';
import {
    DELT_UTTAK_80,
    DELT_UTTAK_80_TO_BARN,
    DELT_UTTAK_100,
    DELT_UTTAK_100_TO_BARN,
    MINSTERETTER,
} from '@navikt/fp-utils-test';

import { FordelingSteg } from './FordelingSteg';

// TODO: Benytt dayjs for å håndtere datoer i testene. Spesielt for å sørge for at fremtidige datoer alltid er fremtidige.

const DEFAULT_STØNADSKONTO = {
    '100': {
        kontoer: DELT_UTTAK_100,
        minsteretter: MINSTERETTER,
    },
    '80': {
        kontoer: DELT_UTTAK_80,
        minsteretter: MINSTERETTER,
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
        dekningsgrad = '100',
    }: StoryArgs) => {
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
                    <FordelingSteg stønadskontoer={stønadskontoer} />
                </PlanleggerDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

export const FlereForsørgereEttBarn: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR_OG_FAR,
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
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR_OG_FAR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-01-01',
            antallBarn: '1',
        },
        dekningsgrad: '80',
        stønadskontoer: DEFAULT_STØNADSKONTO,
    },
};

export const FlereForsørgereToBarn: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMedmor: 'Esther Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-01-01',
            antallBarn: '2',
        },
        dekningsgrad: '80',
        stønadskontoer: DEFAULT_STØNADSKONTO,
    },
};

export const FlereForsørgereToBarn80ProsentDekningsgrad: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMedmor: 'Esther Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-01-01',
            antallBarn: '2',
        },
        dekningsgrad: '80',
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

export const FarOgFar: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Petter Pjokk',
            navnPåMedfar: 'Espen Utvikler',
            type: HvemPlanleggerType.FAR_OG_FAR,
        },
        omBarnet: {
            erFødsel: false,
            fødselsdato: '2024-01-01',
            antallBarn: '2',
            overtakelsesdato: '2024-01-01',
        },
        dekningsgrad: '100',
        stønadskontoer: DEFAULT_STØNADSKONTO,
    },
};
