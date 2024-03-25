import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';

import { initAmplitude } from '@navikt/fp-metrics';

import ArbeidssituasjonSteg from './ArbeidssituasjonSteg';

interface StoryArgs {
    hvemPlanlegger: HvemPlanlegger;
    gåTilNesteSide?: (action: Action) => void;
}

const meta = {
    title: 'ArbeidssituasjonSteg',
    component: ArbeidssituasjonSteg,
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<StoryArgs>;

const renderFunction = ({ hvemPlanlegger, gåTilNesteSide = action('button-click') }: StoryArgs) => {
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

export const ArbeidssituasjonMorOgFar: Story = {
    render: renderFunction,
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: SøkersituasjonEnum.MOR_OG_FAR,
        },
    },
};

export const ArbeidssituasjonAleneforsørger: Story = {
    render: renderFunction,
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            type: SøkersituasjonEnum.MOR,
        },
    },
};

export const ArbeidssituasjonMorOgMedmor: Story = {
    render: renderFunction,
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Esther Utvikler',
            navnPåMedmor: 'Klara Utvikler',
            type: SøkersituasjonEnum.MOR_OG_MEDMOR,
        },
    },
};
