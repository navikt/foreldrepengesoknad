import { MemoryRouter } from 'react-router-dom';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Action, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { initAmplitude } from '@navikt/fp-metrics';
import OmPlanleggerenSteg from './OmPlanleggerenSteg';

export default {
    title: 'OmPlanleggerenSteg',
    component: OmPlanleggerenSteg,
};

const Template: StoryFn<{
    gåTilNesteSide: (action: Action) => void;
}> = ({ gåTilNesteSide = action('button-click') }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.OM_PLANLEGGEREN]}>
            <PlanleggerDataContext onDispatch={gåTilNesteSide}>
                <OmPlanleggerenSteg />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

export const Default = Template.bind({});
