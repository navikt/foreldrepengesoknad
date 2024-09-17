import { Meta, StoryObj } from '@storybook/react/*';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

import OversiktRoutes from 'app/routes/routes';

import Breadcrumb from './Breadcrumb';

const queryClient = new QueryClient();

const meta = {
    title: 'Breadcrumb',
    component: Breadcrumb,
    render: (props) => {
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <Breadcrumb {...props} />
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<typeof Breadcrumb>;
export default meta;

type Story = StoryObj<typeof meta>;

export const VisForHovedside: Story = {
    args: {
        selectedRoute: OversiktRoutes.HOVEDSIDE,
    },
};

export const VisForSaksoversikt: Story = {
    args: {
        selectedRoute: OversiktRoutes.SAKSOVERSIKT,
    },
};

export const VisForDokumenter: Story = {
    args: {
        selectedRoute: OversiktRoutes.DOKUMENTER,
    },
};

export const VisForEttersend: Story = {
    args: {
        selectedRoute: OversiktRoutes.ETTERSEND,
    },
};

export const VisForTidslinjen: Story = {
    args: {
        selectedRoute: OversiktRoutes.TIDSLINJEN,
    },
};

export const VisForDinPlan: Story = {
    args: {
        selectedRoute: OversiktRoutes.DIN_PLAN,
    },
};

export const VisForOppgaver: Story = {
    args: {
        selectedRoute: OversiktRoutes.OPPGAVER,
    },
};
