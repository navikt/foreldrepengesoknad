import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { Action, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

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
                <OmPlanleggerenSteg locale="nb" changeLocale={() => undefined} />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

export const Default = Template.bind({});
