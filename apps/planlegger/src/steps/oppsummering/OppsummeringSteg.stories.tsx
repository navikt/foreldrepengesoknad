import { MemoryRouter } from 'react-router-dom';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Action, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { initAmplitude } from '@navikt/fp-metrics';
import OppsummeringSteg from './OppsummeringSteg';

export default {
    title: 'OppsummeringSteg',
    component: OppsummeringSteg,
};

const Template: StoryFn<{
    gåTilNesteSide: (action: Action) => void;
}> = ({ gåTilNesteSide = action('button-click') }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.OPPSUMMERING]}>
            <PlanleggerDataContext onDispatch={gåTilNesteSide}>
                <OppsummeringSteg />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

export const Default = Template.bind({});
