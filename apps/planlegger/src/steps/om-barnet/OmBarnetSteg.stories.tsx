import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { HvemPlanlegger } from 'types/HvemPlanlegger';

import { HvemPlanleggerType } from '@navikt/fp-types';

import { OmBarnetSteg } from './OmBarnetSteg';

type StoryArgs = {
    hvemPlanlegger: HvemPlanlegger;
    gåTilNesteSide?: (action: Action) => void;
};

const meta = {
    title: 'steg/OmBarnetSteg',
    component: OmBarnetSteg,
    render: ({ hvemPlanlegger, gåTilNesteSide = action('button-click') }: StoryArgs) => {
        return (
            <MemoryRouter initialEntries={[PlanleggerRoutes.OM_BARNET]}>
                <PlanleggerDataContext
                    initialState={{
                        [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                    }}
                    onDispatch={gåTilNesteSide}
                >
                    <OmBarnetSteg />
                </PlanleggerDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FlereForsørgere: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR_OG_FAR,
        },
    },
};

export const AleneforsørgerMor: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR,
        },
    },
};

export const AleneforsørgerFar: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            type: HvemPlanleggerType.FAR,
        },
    },
};
export const FlereForsørgereFarOgFar: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMedfar: 'Hugo Utvikler',
            type: HvemPlanleggerType.FAR_OG_FAR,
        },
    },
};

export const FlereForsørgereMorOgMor: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            navnPåMedmor: 'Petra Utvikler',
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
        },
    },
};
