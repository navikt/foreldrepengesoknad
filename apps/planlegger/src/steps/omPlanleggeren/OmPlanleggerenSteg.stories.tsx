import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import OmPlanleggerenSteg from './OmPlanleggerenSteg';

interface StoryArgs {
    gåTilNesteSide?: (action: Action) => void;
}

const meta = {
    title: 'OmPlanleggerenSteg',
    component: OmPlanleggerenSteg,
} satisfies Meta<typeof OmPlanleggerenSteg & StoryArgs>;
export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {
    render: ({ gåTilNesteSide = action('button-click') }) => {
        initAmplitude();
        return (
            <MemoryRouter initialEntries={[PlanleggerRoutes.OM_PLANLEGGEREN]}>
                <PlanleggerDataContext onDispatch={gåTilNesteSide}>
                    <OmPlanleggerenSteg locale="nb" changeLocale={() => undefined} />
                </PlanleggerDataContext>
            </MemoryRouter>
        );
    },
};
