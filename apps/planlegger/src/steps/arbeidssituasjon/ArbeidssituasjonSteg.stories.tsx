import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';

import { initAmplitude } from '@navikt/fp-metrics';

import ArbeidssituasjonSteg from './ArbeidssituasjonSteg';

type StoryArgs = {
    hvemPlanlegger: HvemPlanlegger;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof ArbeidssituasjonSteg>;

type Story = StoryObj<StoryArgs>;

const customRenderer = ({ hvemPlanlegger, gåTilNesteSide = action('button-click') }: StoryArgs) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.ARBEIDSSITUASJON]}>
            <PlanleggerDataContext
                initialState={{
                    [ContextDataType.OM_BARNET]: {
                        erFødsel: true,
                        erBarnetFødt: false,
                        antallBarn: '1',
                        termindato: '2024-01-01',
                    },
                    [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                }}
                onDispatch={gåTilNesteSide}
            >
                <ArbeidssituasjonSteg locale="nb" />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

const meta = {
    title: 'steg/ArbeidssituasjonSteg',
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

export const ArbeidssituasjonFarOgFar: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMedfar: 'Anders Utvikler',
            type: Situasjon.FAR_OG_FAR,
        },
    },
};
