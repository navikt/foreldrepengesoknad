import { MemoryRouter } from 'react-router-dom';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Action, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { initAmplitude } from '@navikt/fp-metrics';
import HvemPlanleggerSteg from './HvemPlanleggerSteg';

export default {
    title: 'HvemPlanleggerSteg',
    component: HvemPlanleggerSteg,
};

const Template: StoryFn<{
    gåTilNesteSide: (action: Action) => void;
}> = ({ gåTilNesteSide = action('button-click') }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.HVEM_PLANLEGGER]}>
            <PlanleggerDataContext onDispatch={gåTilNesteSide}>
                <HvemPlanleggerSteg />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

export const Default = Template.bind({});
