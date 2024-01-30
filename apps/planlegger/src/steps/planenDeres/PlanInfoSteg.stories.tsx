import { MemoryRouter } from 'react-router-dom';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Action, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { initAmplitude } from '@navikt/fp-metrics';
import PlanInfoSteg from './PlanInfoSteg';

export default {
    title: 'PlanInfoSteg',
    component: PlanInfoSteg,
};

const Template: StoryFn<{
    gåTilNesteSide: (action: Action) => void;
}> = ({ gåTilNesteSide = action('button-click') }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.PLAN_INFO]}>
            <PlanleggerDataContext onDispatch={gåTilNesteSide}>
                <PlanInfoSteg />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

export const Default = Template.bind({});
