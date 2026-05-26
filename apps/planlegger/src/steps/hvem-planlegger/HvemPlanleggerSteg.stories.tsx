import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataMap, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { HvemPlanleggerType } from 'types/HvemPlanlegger';

import { HvemPlanleggerSteg } from './HvemPlanleggerSteg';

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
    initialState?: ContextDataMap;
};

const meta = {
    title: 'steg/HvemPlanleggerSteg',
    component: HvemPlanleggerSteg,
    render: ({ gåTilNesteSide = action('button-click'), initialState }) => {
        return (
            <MemoryRouter initialEntries={[PlanleggerRoutes.HVEM_PLANLEGGER]}>
                <PlanleggerDataContext onDispatch={gåTilNesteSide} initialState={initialState}>
                    <HvemPlanleggerSteg />
                </PlanleggerDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const MedEksisterendeData: Story = {
    args: {
        initialState: {
            [ContextDataType.HVEM_PLANLEGGER]: { type: HvemPlanleggerType.MOR_OG_FAR, navnPåMor: 'Helga', navnPåFar: 'Espen' },
            [ContextDataType.OM_BARNET]: { erFødsel: true, antallBarn: '1', erBarnetFødt: true, fødselsdato: '2024-01-01' },
        },
    },
};
