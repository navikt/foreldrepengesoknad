import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { HvemPlanleggerSteg } from './HvemPlanleggerSteg';

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof HvemPlanleggerSteg>;

const meta = {
    title: 'steg/HvemPlanleggerSteg',
    component: HvemPlanleggerSteg,
    render: ({ gåTilNesteSide = action('button-click'), locale }) => {
        return (
            <MemoryRouter initialEntries={[PlanleggerRoutes.HVEM_PLANLEGGER]}>
                <PlanleggerDataContext onDispatch={gåTilNesteSide}>
                    <HvemPlanleggerSteg locale={locale} />
                </PlanleggerDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        locale: 'nb',
    },
};
