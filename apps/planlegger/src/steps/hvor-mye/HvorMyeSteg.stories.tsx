import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { HvorMye } from 'types/HvorMye';

import { HvemPlanleggerType } from '@navikt/fp-types';

import { HvorMyeSteg } from './HvorMyeSteg';

type StoryArgs = {
    hvorMye: HvorMye;
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon?: Arbeidssituasjon;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof HvorMyeSteg>;

const DEFAULT_SATSER = {
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
};
const meta = {
    title: 'steg/HvorMyeSteg',
    component: HvorMyeSteg,
    render: ({
        hvorMye,
        hvemPlanlegger,
        arbeidssituasjon,
        gåTilNesteSide = action('button-click'),
        satser,
    }: StoryArgs) => {
        return (
            <MemoryRouter initialEntries={[PlanleggerRoutes.HVOR_MYE]}>
                <PlanleggerDataContext
                    initialState={{
                        [ContextDataType.HVOR_MYE]: hvorMye,
                        [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                        [ContextDataType.ARBEIDSSITUASJON]: arbeidssituasjon,
                    }}
                    onDispatch={gåTilNesteSide}
                >
                    <HvorMyeSteg satser={satser} />
                </PlanleggerDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FlereForsørgere: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR_OG_FAR,
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
        satser: DEFAULT_SATSER,
        hvorMye: {
            lønnSøker1: undefined,
            lønnSøker2: undefined,
        },
    },
};

export const AleneforsørgerMor: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            type: HvemPlanleggerType.MOR,
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
        },
        satser: DEFAULT_SATSER,
        hvorMye: {
            lønnSøker1: undefined,
        },
    },
};
