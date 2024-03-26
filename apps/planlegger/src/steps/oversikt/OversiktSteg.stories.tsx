import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import { Situasjon } from 'types/Søkersituasjon';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';

import { initAmplitude } from '@navikt/fp-metrics';

import OversiktSteg from './OversiktSteg';

const DEFAULT_STØNADSKONTOER = {
    '100': {
        kontoer: {
            MØDREKVOTE: 75,
            FEDREKVOTE: 75,
            FELLESPERIODE: 80,
            FORELDREPENGER_FØR_FØDSEL: 15,
            AKTIVITETSFRI_KVOTE: 40,
            FORELDREPENGER: 200,
        },
        minsteretter: {
            farRundtFødsel: 0,
            generellMinsterett: 0,
            toTette: 0,
        },
    },
    '80': {
        kontoer: {
            MØDREKVOTE: 95,
            FEDREKVOTE: 95,
            FELLESPERIODE: 90,
            FORELDREPENGER_FØR_FØDSEL: 15,
            AKTIVITETSFRI_KVOTE: 40,
            FORELDREPENGER: 250,
        },
        minsteretter: {
            farRundtFødsel: 0,
            generellMinsterett: 0,
            toTette: 0,
        },
    },
};

interface StoryArgs {
    hvemPlanlegger: HvemPlanlegger;
    hvorLangPeriode: HvorLangPeriode;
    fordeling: Fordeling;
    omBarnet: OmBarnet;
    arbeidssituasjon: Arbeidssituasjon;
    gåTilNesteSide: (action: Action) => void;
    stønadskontoer?: TilgjengeligeStønadskontoerDTO;
}

type Story = StoryObj<StoryArgs>;

const customRenderer = ({
    gåTilNesteSide = action('button-click'),
    hvemPlanlegger,
    fordeling,
    hvorLangPeriode,
    omBarnet,
    arbeidssituasjon,
    stønadskontoer = DEFAULT_STØNADSKONTOER,
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
    title: 'OversiktSteg',
    component: OversiktSteg,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

export const PeriodeFlereForsørgereTerminBeggeHarRett: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR_OG_FAR,
        },
        fordeling: {
            fellesperiodefordeling: 6,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        },
        omBarnet: {
            erFødsel: true,
            erBarnetFødt: false,
            termindato: '2022-10-24',
            antallBarn: '1',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
    },
};

export const PeriodeAleneforsørgerFarTermin: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            type: Situasjon.FAR,
        },
        fordeling: {
            fellesperiodefordeling: 6,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        },
        omBarnet: {
            erFødsel: true,
            erBarnetFødt: false,
            termindato: '2022-10-24',
            antallBarn: '1',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
        },
    },
};

export const PeriodeAleneforsørgerMorFødt: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR,
        },
        fordeling: {
            fellesperiodefordeling: 7,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        },
        omBarnet: {
            erBarnetFødt: true,
            erFødsel: true,
            fødselsdato: '2024-09-01',
            termindato: '2024-09-01',
            antallBarn: '1',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
        },
    },
};

export const PeriodeFlereForsørgereToBarnFødtKunMorHarRett: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            navnPåMedmor: 'Kari Utvikler',
            type: Situasjon.MOR_OG_MEDMOR,
        },
        fordeling: {
            fellesperiodefordeling: 9,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
        },
        omBarnet: {
            erBarnetFødt: true,
            erFødsel: true,
            fødselsdato: '2024-10-01',
            termindato: '2024-10-03',
            antallBarn: '2',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: false,
        },
    },
};

export const PeriodeFlereForsørgereAdoptertKunFarHarRett: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            navnPåFar: 'Espen Utvikler',
            type: Situasjon.MOR_OG_FAR,
        },
        fordeling: {
            fellesperiodefordeling: 9,
        },
        hvorLangPeriode: {
            dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
        },
        omBarnet: {
            erBarnetFødt: true,
            erFødsel: false,
            erAdoptert: true,
            fødselsdato: '2024-09-01',
            termindato: '2024-09-01',
            overtakelsesdato: '2024-09-01',
            adopsjonsdato: '2024-09-01',
            antallBarn: '1',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.INGEN,
            jobberAnnenPart: true,
        },
    },
};
