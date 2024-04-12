import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';

import { initAmplitude } from '@navikt/fp-metrics';

import BarnehageplassSteg from './BarnehageplassSteg';

interface StoryArgs {
    hvemPlanlegger: HvemPlanlegger;
    omBarnet: OmBarnet;
    gåTilNesteSide?: (action: Action) => void;
}

type Story = StoryObj<StoryArgs>;

const customRenderer = ({ hvemPlanlegger, omBarnet, gåTilNesteSide = action('button-click') }: StoryArgs) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.ARBEIDSSITUASJON]}>
            <PlanleggerDataContext
                initialState={{
                    [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                    [ContextDataType.OM_BARNET]: omBarnet,
                }}
                onDispatch={gåTilNesteSide}
            >
                <BarnehageplassSteg />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

const meta = {
    title: 'BarnehageplassSteg',
    component: BarnehageplassSteg,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

export const FlereForsørgereBarnTerminDesemberStartAugustOmToÅr: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            navnPåFar: 'Espen Utvikler',
            type: Situasjon.MOR_OG_FAR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-12-01',
            antallBarn: '1',
        },
    },
};

export const FlereForsørgereBarnFødtSeptemberStartSeptember: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR_OG_FAR,
        },
        omBarnet: {
            erBarnetFødt: true,
            erFødsel: true,
            fødselsdato: '2024-09-01',
            termindato: '2024-09-03',
            antallBarn: '1',
        },
    },
};

export const AleneforsørgerBarnFødtJanuarStartAugust: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR,
        },
        omBarnet: {
            erBarnetFødt: true,
            erFødsel: true,
            fødselsdato: '2024-01-01',
            termindato: '2023-08-01',
            antallBarn: '1',
        },
    },
};

export const FlereForsørgereAdoptertBarnFødtJanuarStartAugust: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            navnPåFar: 'Espen Utvikler',
            type: Situasjon.MOR_OG_FAR,
        },
        omBarnet: {
            antallBarn: '1',
            erFødsel: false,
            erBarnetFødt: true,
            fødselsdato: '2026-01-11',
            overtakelsesdato: '2026-03-01',
        },
    },
};
