import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';

import { OmPlanleggerenSteg } from './OmPlanleggerenSteg';

const meta = {
    title: 'steg/OmPlanleggerenSteg',
    component: OmPlanleggerenSteg,
    render: ({ gåTilNesteSide = action('button-click') }) => {
        return (
            <MemoryRouter initialEntries={[PlanleggerRoutes.OM_PLANLEGGEREN]}>
                <PlanleggerDataContext onDispatch={gåTilNesteSide}>
                    <OmPlanleggerenSteg />
                </PlanleggerDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<
    ComponentProps<typeof OmPlanleggerenSteg> & {
        gåTilNesteSide?: (action: Action) => void;
    }
>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
