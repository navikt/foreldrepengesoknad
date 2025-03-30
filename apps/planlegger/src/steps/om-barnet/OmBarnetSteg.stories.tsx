import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { HvemPlanlegger } from 'types/HvemPlanlegger';

import { HvemPlanleggerType } from '@navikt/fp-types';

import { OmBarnetSteg } from './OmBarnetSteg';

type StoryArgs = {
    hvemPlanlegger: HvemPlanlegger;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof OmBarnetSteg>;

const meta = {
    title: 'steg/OmBarnetSteg',
    component: OmBarnetSteg,
    render: ({ hvemPlanlegger, gåTilNesteSide = action('button-click'), locale }: StoryArgs) => {
        return (
            <MemoryRouter initialEntries={[PlanleggerRoutes.OM_BARNET]}>
                <PlanleggerDataContext
                    initialState={{
                        [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                    }}
                    onDispatch={gåTilNesteSide}
                >
                    <OmBarnetSteg locale={locale} />
                </PlanleggerDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FlereForsørgere: Story = {
    args: {
        locale: 'nb',
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR_OG_FAR,
        },
    },
};

export const AleneforsørgerMor: Story = {
    args: {
        locale: 'nb',
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR,
        },
    },
};

export const AleneforsørgerFar: Story = {
    args: {
        locale: 'nb',
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            type: HvemPlanleggerType.FAR,
        },
    },
};
export const FlereForsørgereFarOgFar: Story = {
    args: {
        locale: 'nb',
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMedfar: 'Hugo Utvikler',
            type: HvemPlanleggerType.FAR_OG_FAR,
        },
    },
};
