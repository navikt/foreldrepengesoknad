import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { Situasjon } from 'types/Søkersituasjon';

import { initAmplitude } from '@navikt/fp-metrics';

import ArbeidssituasjonSteg from './ArbeidssituasjonSteg';

interface StoryArgs {
    hvemPlanlegger: HvemPlanlegger;
    gåTilNesteSide?: (action: Action) => void;
}

type Story = StoryObj<StoryArgs>;

const customRenderer = ({ hvemPlanlegger, gåTilNesteSide = action('button-click') }: StoryArgs) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.ARBEIDSSITUASJON]}>
            <PlanleggerDataContext
                initialState={{
                    [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                }}
                onDispatch={gåTilNesteSide}
            >
                <ArbeidssituasjonSteg />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

const meta = {
    title: 'ArbeidssituasjonSteg',
    component: ArbeidssituasjonSteg,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

export const ArbeidssituasjonMorOgFar: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR_OG_FAR,
        },
    },
};

export const ArbeidssituasjonAleneforsørger: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR,
        },
    },
};

export const ArbeidssituasjonMorOgMedmor: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Esther Utvikler',
            navnPåMedmor: 'Klara Utvikler',
            type: Situasjon.MOR_OG_MEDMOR,
        },
    },
};
