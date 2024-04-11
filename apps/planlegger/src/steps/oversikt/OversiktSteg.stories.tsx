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

const MINSTERETTER = {
    generellMinsterett: 0,
    farRundtFødsel: 10,
    toTette: 0,
};

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
        minsteretter: MINSTERETTER,
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
        minsteretter: MINSTERETTER,
    },
};

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

export const FødselMorOgFarBeggeHarRett: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåFar: 'Espen Utvikler',
            type: Situasjon.MOR_OG_FAR,
        },
        omBarnet: {
            erFødsel: true,
            erBarnetFødt: false,
            termindato: '2024-04-11',
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
            '80': {
                kontoer: {
                    MØDREKVOTE: 95,
                    FEDREKVOTE: 95,
                    FELLESPERIODE: 90,
                    FORELDREPENGER_FØR_FØDSEL: 15,
                },
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: {
                    MØDREKVOTE: 75,
                    FEDREKVOTE: 75,
                    FELLESPERIODE: 80,
                    FORELDREPENGER_FØR_FØDSEL: 15,
                },
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const FødselMorOgFarKunMorHarRett: Story = {
    args: {
        ...FødselMorOgFarBeggeHarRett.args,
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: false,
        },
        stønadskontoer: {
            '80': {
                kontoer: {
                    FORELDREPENGER: 280,
                    FORELDREPENGER_FØR_FØDSEL: 15,
                },
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: {
                    FORELDREPENGER: 230,
                    FORELDREPENGER_FØR_FØDSEL: 15,
                },
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const FødselMorOgFarKunFarHarRett: Story = {
    args: {
        ...FødselMorOgFarBeggeHarRett.args,
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.UFØR,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '80': {
                kontoer: {
                    FORELDREPENGER: 250,
                },
                minsteretter: {
                    generellMinsterett: 95,
                    farRundtFødsel: 10,
                    toTette: 0,
                },
            },
            '100': {
                kontoer: {
                    FORELDREPENGER: 200,
                },
                minsteretter: {
                    generellMinsterett: 75,
                    farRundtFødsel: 10,
                    toTette: 0,
                },
            },
        },
    },
};

export const FødselMorOgMedmorBeggeHarRett: Story = {
    args: {
        ...FødselMorOgFarBeggeHarRett.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåMedmor: 'Helga Utvikler',
            type: Situasjon.MOR_OG_MEDMOR,
        },
    },
};

export const FødselMorOgMedmorKunMorHarRett: Story = {
    args: {
        ...FødselMorOgFarKunMorHarRett.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåMedmor: 'Helga Utvikler',
            type: Situasjon.MOR_OG_MEDMOR,
        },
    },
};

export const FødselMorOgMedmorKunMedmorHarRett: Story = {
    args: {
        ...FødselMorOgFarKunFarHarRett.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåMedmor: 'Helga Utvikler',
            type: Situasjon.MOR_OG_MEDMOR,
        },
    },
};

export const FødselBareMorSøkerOgHarRett: Story = {
    args: {
        ...FødselMorOgFarBeggeHarRett.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            type: Situasjon.MOR,
        },
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: undefined,
        },
        stønadskontoer: FødselMorOgFarKunMorHarRett.args?.stønadskontoer,
    },
};

export const FødselBareFarSøkerOgHarRett: Story = {
    args: {
        ...FødselMorOgFarBeggeHarRett.args,
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            type: Situasjon.FAR,
        },
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: undefined,
        },
        stønadskontoer: {
            '80': {
                kontoer: {
                    FORELDREPENGER: 280,
                },
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: {
                    FORELDREPENGER: 230,
                },
                minsteretter: MINSTERETTER,
            },
        },
    },
};
