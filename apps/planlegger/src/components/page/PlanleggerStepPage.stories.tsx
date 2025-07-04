import { Meta, StoryObj } from '@storybook/react-vite';
import { PlanleggerRoutes } from 'appData/routes';

import { PlanleggerStepPage } from './PlanleggerStepPage';

const meta = {
    title: 'components/PlanleggerStepPage',
    component: PlanleggerStepPage,
} satisfies Meta<typeof PlanleggerStepPage>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        steps: [
            { id: PlanleggerRoutes.FORDELING, isSelected: true, label: 'Fordeling' },
            { id: PlanleggerRoutes.HVEM_PLANLEGGER, isSelected: false, label: 'Hvem planlegger' },
        ],
        goToStep: () => undefined,
        children: <div>Steginnhold</div>,
    },
};
