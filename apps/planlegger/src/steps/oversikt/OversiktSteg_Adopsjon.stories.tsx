import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';

import { initAmplitude } from '@navikt/fp-metrics';

import OversiktSteg from './OversiktSteg';

type StoryArgs = {
    hvemPlanlegger: HvemPlanlegger;
    hvorLangPeriode: HvorLangPeriode;
    fordeling: Fordeling;
    omBarnet: OmBarnet;
    arbeidssituasjon: Arbeidssituasjon;
    gåTilNesteSide: (action: Action) => void;
} & ComponentProps<typeof OversiktSteg>;

type Story = StoryObj<StoryArgs>;

const customRenderer = ({
    gåTilNesteSide = action('button-click'),
    hvemPlanlegger,
    fordeling,
    hvorLangPeriode,
    omBarnet,
    arbeidssituasjon,
    stønadskontoer,
}: StoryArgs) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.OVERSIKT]}>
            <PlanleggerDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.FORDELING]: fordeling,
                    [ContextDataType.HVOR_LANG_PERIODE]: hvorLangPeriode,
                    [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                    [ContextDataType.OM_BARNET]: omBarnet,
                    [ContextDataType.ARBEIDSSITUASJON]: arbeidssituasjon,
                }}
            >
                <OversiktSteg stønadskontoer={stønadskontoer} />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

const meta = {
    title: 'OversiktSteg - Adopsjon',
    component: OversiktSteg,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

export const AdopsjonMorOgFarBeggeHarRett: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåFar: 'Espen Utvikler',
            type: Situasjon.MOR_OG_FAR,
        },
        omBarnet: {
            erFødsel: false,
            //FIXME Treng ein adopsjonsdato?
            adopsjonsdato: '2024-04-11',
            overtakelsesdato: '2024-04-11',
            fødselsdato: '2020-04-11',
            antallBarn: '1',
        },
        fordeling: {
            antallUkerSøker1: 0,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '100': {
                kontoer: {
                    MØDREKVOTE: 75,
                    FEDREKVOTE: 75,
                    FELLESPERIODE: 80,
                },
                minsteretter: {
                    generellMinsterett: 0,
                    farRundtFødsel: 0,
                    toTette: 0,
                },
            },
            '80': {
                kontoer: {
                    MØDREKVOTE: 95,
                    FEDREKVOTE: 95,
                    FELLESPERIODE: 90,
                },
                minsteretter: {
                    generellMinsterett: 0,
                    farRundtFødsel: 0,
                    toTette: 0,
                },
            },
        },
    },
};
