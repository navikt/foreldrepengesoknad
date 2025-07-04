import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { HvemPlanlegger } from 'types/HvemPlanlegger';

import { HvemPlanleggerType } from '@navikt/fp-types';

import { ArbeidssituasjonSteg } from './ArbeidssituasjonSteg';

const DEFAULT_SATSER = {
    engangstønad: [
        {
            fom: '01.01.2023',
            verdi: 92648,
        },
        {
            fom: '01.01.2021',
            verdi: 90300,
        },
    ],
    grunnbeløp: [
        {
            fom: '01.05.2024',
            verdi: 124028,
        },
        {
            fom: '01.05.2023',
            verdi: 118620,
        },
    ],
};

type StoryArgs = {
    hvemPlanlegger: HvemPlanlegger;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof ArbeidssituasjonSteg>;

type Story = StoryObj<typeof meta>;

const customRenderer = ({ hvemPlanlegger, gåTilNesteSide = action('button-click'), satser }: StoryArgs) => {
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
                <ArbeidssituasjonSteg satser={satser} />
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
            type: HvemPlanleggerType.MOR_OG_FAR,
        },
        satser: DEFAULT_SATSER,
    },
};

export const ArbeidssituasjonAleneforsørger: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR,
        },
        satser: DEFAULT_SATSER,
    },
};

export const ArbeidssituasjonMorOgMedmorUtenNavn: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Esther Utvikler',
            navnPåMedmor: undefined,
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
        },
        satser: DEFAULT_SATSER,
    },
};

export const ArbeidssituasjonFarOgFar: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMedfar: 'Anders Utvikler',
            type: HvemPlanleggerType.FAR_OG_FAR,
        },
        satser: DEFAULT_SATSER,
    },
};
