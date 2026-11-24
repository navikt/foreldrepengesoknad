import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router';
import { action } from 'storybook/actions';

import { OmPlanleggerenSteg } from './OmPlanleggerenSteg';

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
    lenkeErUgyldig?: boolean;
};

const NesteSteg = () => {
    const navigate = useNavigate();
    return (
        <button type="button" onClick={() => void navigate(-1)}>
            Tilbake i nettleserhistorikken
        </button>
    );
};

const meta = {
    title: 'steg/OmPlanleggerenSteg',
    component: OmPlanleggerenSteg,
    render: ({ gåTilNesteSide = action('button-click'), lenkeErUgyldig }) => {
        return (
            <MemoryRouter
                initialEntries={[
                    {
                        pathname: PlanleggerRoutes.OM_PLANLEGGEREN,
                        state: lenkeErUgyldig ? { ugyldigLenke: true } : null,
                    },
                ]}
            >
                <PlanleggerDataContext onDispatch={gåTilNesteSide}>
                    <Routes>
                        <Route path={PlanleggerRoutes.OM_PLANLEGGEREN} element={<OmPlanleggerenSteg />} />
                        <Route path={PlanleggerRoutes.HVEM_PLANLEGGER} element={<NesteSteg />} />
                    </Routes>
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

export const MedUgyldigLenke: Story = {
    args: {
        lenkeErUgyldig: true,
    },
};
