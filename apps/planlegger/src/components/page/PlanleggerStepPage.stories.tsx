import { Meta, StoryObj } from '@storybook/react';
import { PlanleggerRoutes } from 'appData/routes';

import PlanleggerStepPage from './PlanleggerStepPage';

const meta: Meta<typeof PlanleggerStepPage> = {
    title: 'components/PlanleggerStepPage',
    component: PlanleggerStepPage,
};
export default meta;

type Story = StoryObj<typeof PlanleggerStepPage>;

export const Default: Story = {
    args: {
        steps: [
            { id: PlanleggerRoutes.FORDELING, isSelected: true, label: 'Fordeling' },
            { id: PlanleggerRoutes.HVEM_PLANLEGGER, isSelected: false, label: 'Hvem planlegger' },
        ],
        children: <div>Steginnhold</div>,
    },
};
