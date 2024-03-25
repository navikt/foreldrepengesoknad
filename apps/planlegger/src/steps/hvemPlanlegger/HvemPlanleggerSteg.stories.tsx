import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import HvemPlanleggerSteg from './HvemPlanleggerSteg';

interface StoryArgs {
    gåTilNesteSide?: (action: Action) => void;
}

const meta = {
    title: 'HvemPlanleggerSteg',
    component: HvemPlanleggerSteg,
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {
    render: ({ gåTilNesteSide = action('button-click') }) => {
        initAmplitude();
        return (
            <MemoryRouter initialEntries={[PlanleggerRoutes.HVEM_PLANLEGGER]}>
                <PlanleggerDataContext onDispatch={gåTilNesteSide}>
                    <HvemPlanleggerSteg />
                </PlanleggerDataContext>
            </MemoryRouter>
        );
    },
};
