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
    farRundtFødsel: 0,
    toTette: 0,
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

export const MorOgFarBeggeHarRett: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåFar: 'Espen Utvikler',
            type: Situasjon.MOR_OG_FAR,
        },
        omBarnet: {
            erFødsel: false,
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
                minsteretter: MINSTERETTER,
            },
            '80': {
                kontoer: {
                    MØDREKVOTE: 95,
                    FEDREKVOTE: 95,
                    FELLESPERIODE: 90,
                },
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const MorOgFarKunMorHarRett: Story = {
    args: {
        ...MorOgFarBeggeHarRett.args,
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: false,
        },
        stønadskontoer: {
            '100': {
                kontoer: {
                    FORELDREPENGER: 230,
                },
                minsteretter: MINSTERETTER,
            },
            '80': {
                kontoer: {
                    FORELDREPENGER: 280,
                },
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const MorOgFarKunFarHarRettMorErUfør: Story = {
    args: {
        ...MorOgFarBeggeHarRett.args,
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.UFØR,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '100': {
                kontoer: {
                    FORELDREPENGER: 200,
                },
                minsteretter: {
                    generellMinsterett: 75,
                    farRundtFødsel: 0,
                    toTette: 0,
                },
            },
            '80': {
                kontoer: {
                    FORELDREPENGER: 250,
                },
                minsteretter: {
                    generellMinsterett: 95,
                    farRundtFødsel: 0,
                    toTette: 0,
                },
            },
        },
    },
};

export const MorOgFarKunFarHarRettMorIngenAvDisse: Story = {
    args: {
        ...MorOgFarBeggeHarRett.args,
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.UFØR,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '100': {
                kontoer: {
                    FORELDREPENGER: 200,
                },
                minsteretter: {
                    generellMinsterett: 40,
                    farRundtFødsel: 0,
                    toTette: 0,
                },
            },
            '80': {
                kontoer: {
                    FORELDREPENGER: 250,
                },
                minsteretter: {
                    generellMinsterett: 40,
                    farRundtFødsel: 0,
                    toTette: 0,
                },
            },
        },
    },
};

export const MorOgMedmorBeggeHarRett: Story = {
    args: {
        ...MorOgFarBeggeHarRett.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåMedmor: 'Helga Utvikler',
            type: Situasjon.MOR_OG_MEDMOR,
        },
    },
};

export const MorOgMedmorKunMorHarRett: Story = {
    args: {
        ...MorOgFarKunMorHarRett.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåMedmor: 'Helga Utvikler',
            type: Situasjon.MOR_OG_MEDMOR,
        },
    },
};

export const MorOgMedmorKunMedmorHarRettMorErUfør: Story = {
    args: {
        ...MorOgFarKunFarHarRettMorErUfør.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåMedmor: 'Helga Utvikler',
            type: Situasjon.MOR_OG_MEDMOR,
        },
    },
};

export const MorOgMedmorKunMedmorHarRettMorIngenAvDisse: Story = {
    args: {
        ...MorOgFarKunFarHarRettMorIngenAvDisse.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåMedmor: 'Helga Utvikler',
            type: Situasjon.MOR_OG_MEDMOR,
        },
    },
};

export const BareMorSøkerOgHarRett: Story = {
    args: {
        ...MorOgFarBeggeHarRett.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            type: Situasjon.MOR,
        },
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: undefined,
        },
        stønadskontoer: MorOgFarKunMorHarRett.args?.stønadskontoer,
    },
};

export const BareFarSøkerOgHarRett: Story = {
    args: {
        ...MorOgFarBeggeHarRett.args,
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            type: Situasjon.FAR,
        },
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: undefined,
        },
        stønadskontoer: MorOgFarKunMorHarRett.args?.stønadskontoer,
    },
};

export const FarOgFarBeggeHarRett: Story = {
    args: {
        ...MorOgFarBeggeHarRett.args,
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMedfar: 'Anders Utvikler',
            type: Situasjon.FAR_OG_FAR,
        },
    },
};

export const FarOgFarKunFarHarRett: Story = {
    args: {
        ...FarOgFarBeggeHarRett.args,
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: false,
        },
        stønadskontoer: {
            '80': {
                kontoer: {
                    FORELDREPENGER: 250,
                },
                minsteretter: {
                    generellMinsterett: 40,
                    farRundtFødsel: 0,
                    toTette: 0,
                },
            },
            '100': {
                kontoer: {
                    FORELDREPENGER: 200,
                },
                minsteretter: {
                    generellMinsterett: 40,
                    farRundtFødsel: 0,
                    toTette: 0,
                },
            },
        },
    },
};

export const FarOgFarKunMedfarHarRett: Story = {
    args: {
        ...FarOgFarBeggeHarRett.args,
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
                    farRundtFødsel: 0,
                    toTette: 0,
                },
            },
            '100': {
                kontoer: {
                    FORELDREPENGER: 200,
                },
                minsteretter: {
                    generellMinsterett: 75,
                    farRundtFødsel: 0,
                    toTette: 0,
                },
            },
        },
    },
};

export const MorOgMedmorKunMorHarRettOmsorgsovertakelseIHelgen: Story = {
    args: {
        ...MorOgFarKunMorHarRett.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåMedmor: 'Helga Utvikler',
            type: Situasjon.MOR_OG_MEDMOR,
        },
        omBarnet: {
            erFødsel: false,
            overtakelsesdato: '2024-05-12',
            fødselsdato: '2020-04-11',
            antallBarn: '1',
        },
    },
};
