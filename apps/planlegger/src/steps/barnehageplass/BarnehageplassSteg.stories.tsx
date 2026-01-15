import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';

import { HvemPlanleggerType } from '@navikt/fp-types';

import { BarnehageplassSteg } from './BarnehageplassSteg';

type StoryArgs = {
    hvemPlanlegger: HvemPlanlegger;
    omBarnet: OmBarnet;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof BarnehageplassSteg>;

const meta = {
    title: 'steg/BarnehageplassSteg',
    component: BarnehageplassSteg,
    render: ({ hvemPlanlegger, omBarnet, gåTilNesteSide = action('button-click') }: StoryArgs) => {
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
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FlereForsørgereBarnTerminDesemberStartAugustOmToÅr: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            navnPåFar: 'Espen Utvikler',
            type: HvemPlanleggerType.MOR_OG_FAR,
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
            type: HvemPlanleggerType.MOR_OG_FAR,
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

export const AleneforsørgerToBarnFødtJanuarStartAugust: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR,
        },
        omBarnet: {
            erBarnetFødt: true,
            erFødsel: true,
            fødselsdato: '2024-01-01',
            termindato: '2023-08-01',
            antallBarn: '2',
        },
    },
};

export const FlereForsørgereAdoptertBarnFødtJanuarStartJuni2027: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            navnPåFar: 'Espen Utvikler',
            type: HvemPlanleggerType.MOR_OG_FAR,
        },
        omBarnet: {
            antallBarn: '1',
            erFødsel: false,
            erBarnetFødt: true,
            fødselsdato: '2026-01-11',
            overtakelsesdato: '2026-03-01',
        },
        uttaksdata: {
            familiehendelsedato: '2026-03-01',
            startdatoPeriode1: '2026-03-01',
            sluttdatoPeriode1: '2027-01-01',
            startdatoPeriode2: '2027-01-02',
            sluttdatoPeriode2: '2027-06-01',
        },
    },
};
