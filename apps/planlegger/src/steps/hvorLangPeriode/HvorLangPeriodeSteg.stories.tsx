import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { Situasjon } from 'types/Søkersituasjon';

import { initAmplitude } from '@navikt/fp-metrics';

import HvorLangPeriodeSteg from './HvorLangPeriodeSteg';

const defaultKonto80 = {
    kontoer: {
        MØDREKVOTE: 95,
        FEDREKVOTE: 95,
        FELLESPERIODE: 90,
        FORELDREPENGER_FØR_FØDSEL: 15,
    },
    minsteretter: {
        farRundtFødsel: 0,
        generellMinsterett: 0,
        toTette: 0,
    },
};
const defaultKonto100 = {
    kontoer: {
        MØDREKVOTE: 75,
        FEDREKVOTE: 75,
        FELLESPERIODE: 80,
        FORELDREPENGER_FØR_FØDSEL: 15,
    },
    minsteretter: {
        farRundtFødsel: 0,
        generellMinsterett: 0,
        toTette: 0,
    },
};

type StoryArgs = {
    hvemPlanlegger: HvemPlanlegger;
    omBarnet: OmBarnet;
    arbeidssituasjon: Arbeidssituasjon;
    gåTilNesteSide: (action: Action) => void;
} & ComponentProps<typeof HvorLangPeriodeSteg>;

type Story = StoryObj<StoryArgs>;

const customRenderer = ({
    hvemPlanlegger,
    omBarnet,
    arbeidssituasjon,
    stønadskontoer = {
        '80': defaultKonto80,
        '100': defaultKonto100,
    },
    gåTilNesteSide = action('button-click'),
}: StoryArgs) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.HVOR_LANG_PERIODE]}>
            <PlanleggerDataContext
                initialState={{
                    [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                    [ContextDataType.OM_BARNET]: omBarnet,
                    [ContextDataType.ARBEIDSSITUASJON]: arbeidssituasjon,
                }}
                onDispatch={gåTilNesteSide}
            >
                <HvorLangPeriodeSteg stønadskontoer={stønadskontoer} />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

const meta = {
    title: 'HvorLangPeriodeSteg',
    component: HvorLangPeriodeSteg,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

export const FlereForsørgereEttBarnKunMorHarRett: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR_OG_FAR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-01-01',
            antallBarn: '1',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: false,
        },
    },
};

export const FlereForsørgereToBarn: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMedmor: 'Esther Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR_OG_MEDMOR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-01-01',
            antallBarn: '2',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
    },
};

export const AleneforsørgerMorEttBarn: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-01-01',
            antallBarn: '1',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
        },
    },
};

export const FlereForsørgereKunFarHarRett: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMor: 'Klara Utvikler',
            type: Situasjon.MOR_OG_FAR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-01-01',
            antallBarn: '1',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.INGEN,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '80': {
                kontoer: {
                    FORELDREPENGER: 250,
                },
                minsteretter: {
                    farRundtFødsel: 0,
                    generellMinsterett: 40,
                    toTette: 0,
                },
            },
            '100': {
                kontoer: {
                    FORELDREPENGER: 200,
                },
                minsteretter: {
                    farRundtFødsel: 0,
                    generellMinsterett: 40,
                    toTette: 0,
                },
            },
        },
    },
};

export const AleneforsørgerFarToBarn: Story = {
    args: {
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            type: Situasjon.FAR,
        },
        omBarnet: {
            erBarnetFødt: false,
            erFødsel: true,
            termindato: '2024-01-01',
            antallBarn: '2',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
        },
    },
};
