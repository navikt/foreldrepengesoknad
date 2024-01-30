import { MemoryRouter } from 'react-router-dom';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { initAmplitude } from '@navikt/fp-metrics';
import OversiktSteg from './OversiktSteg';
import { Periode, PeriodeEnum } from 'types/Periode';

export default {
    title: 'OversiktSteg',
    component: OversiktSteg,
};

const Template: StoryFn<{
    periode: Periode;
    gåTilNesteSide: (action: Action) => void;
}> = ({ gåTilNesteSide = action('button-click'), periode }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.OVERSIKT]}>
            <PlanleggerDataContext onDispatch={gåTilNesteSide} initialState={{ [ContextDataType.PERIODE]: periode }}>
                <OversiktSteg />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

export const PeriodeHundreProsent = Template.bind({});
PeriodeHundreProsent.args = {
    periode: {
        periode: PeriodeEnum.HUNDRE,
    },
};

export const PeriodeÅttiProsent = Template.bind({});
PeriodeÅttiProsent.args = {
    periode: {
        periode: PeriodeEnum.ÅTTI,
    },
};
