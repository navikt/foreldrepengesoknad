import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';

import { StønadskontoType } from '@navikt/fp-constants';
import { HvemPlanleggerType, SaksperiodeNy } from '@navikt/fp-types';

import { TilpassPlanenSteg } from './TilpassPlanenSteg';

const MINSTERETTER = {
    farRundtFødsel: 10,
    toTette: 0,
};

type StoryArgs = {
    hvemPlanlegger: HvemPlanlegger;
    hvorLangPeriode: HvorLangPeriode;
    fordeling?: Fordeling;
    omBarnet: OmBarnet;
    arbeidssituasjon: Arbeidssituasjon;
    gåTilNesteSide?: (action: Action) => void;
    uttaksplan: SaksperiodeNy[][];
    originalUttaksplan: SaksperiodeNy[];
} & ComponentProps<typeof TilpassPlanenSteg>;

const meta = {
    title: 'steg/TilpassPlanenSteg',
    component: TilpassPlanenSteg,
    render: ({
        gåTilNesteSide = action('button-click'),
        hvemPlanlegger,
        fordeling,
        hvorLangPeriode,
        omBarnet,
        arbeidssituasjon,
        stønadskontoer,
        uttaksplan,
        originalUttaksplan,
    }) => {
        return (
            <MemoryRouter initialEntries={[PlanleggerRoutes.PLANEN_DERES]}>
                <PlanleggerDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.FORDELING]: fordeling,
                        [ContextDataType.HVOR_LANG_PERIODE]: hvorLangPeriode,
                        [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                        [ContextDataType.OM_BARNET]: omBarnet,
                        [ContextDataType.ARBEIDSSITUASJON]: arbeidssituasjon,
                        [ContextDataType.UTTAKSPLAN]: uttaksplan,
                        [ContextDataType.ORIGINAL_UTTAKSPLAN]: originalUttaksplan,
                    }}
                >
                    <TilpassPlanenSteg stønadskontoer={stønadskontoer} />
                </PlanleggerDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const MorOgFarBeggeHarRett: Story = {
    args: {
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåFar: 'Espen Utvikler',
            type: HvemPlanleggerType.MOR_OG_FAR,
        },
        omBarnet: {
            erFødsel: true,
            erBarnetFødt: false,
            termindato: '2024-07-01',
            antallBarn: '1',
        },
        fordeling: {
            antallDagerSøker1: 0,
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
                kontoer: [
                    { konto: StønadskontoType.Mødrekvote, dager: 95 },
                    { konto: StønadskontoType.Fedrekvote, dager: 95 },
                    { konto: StønadskontoType.Fellesperiode, dager: 101 },
                    { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
                ],
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: [
                    { konto: StønadskontoType.Mødrekvote, dager: 75 },
                    { konto: StønadskontoType.Fedrekvote, dager: 75 },
                    { konto: StønadskontoType.Fellesperiode, dager: 80 },
                    { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
                ],
                minsteretter: MINSTERETTER,
            },
        },
        uttaksplan: [[]],
        originalUttaksplan: [],
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
            '80': {
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 291 },
                    { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
                ],
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 230 },
                    { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
                ],
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const MorOgFarKunFarHarRettMorUfør: Story = {
    args: {
        ...MorOgFarBeggeHarRett.args,
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.UFØR,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '80': {
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 166 },
                    { konto: StønadskontoType.AktivitetsfriKvote, dager: 95 },
                ],
                minsteretter: {
                    farRundtFødsel: 10,
                    toTette: 0,
                },
            },
            '100': {
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 125 },
                    { konto: StønadskontoType.AktivitetsfriKvote, dager: 75 },
                ],
                minsteretter: {
                    farRundtFødsel: 10,
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
            status: Arbeidsstatus.INGEN,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '80': {
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 211 },
                    { konto: StønadskontoType.AktivitetsfriKvote, dager: 50 },
                ],
                minsteretter: {
                    farRundtFødsel: 10,
                    toTette: 0,
                },
            },
            '100': {
                kontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 150 },
                    { konto: StønadskontoType.AktivitetsfriKvote, dager: 50 },
                ],
                minsteretter: {
                    farRundtFødsel: 10,
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
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
        },
    },
};

export const MorOgMedmorKunMorHarRett: Story = {
    args: {
        ...MorOgFarKunMorHarRett.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåMedmor: 'Helga Utvikler',
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
        },
    },
};

export const MorOgMedmorKunMedmorHarRettMorUfør: Story = {
    args: {
        ...MorOgFarKunFarHarRettMorUfør.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåMedmor: 'Helga Utvikler',
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
        },
    },
};

export const MorOgMedmorKunMedmorHarRettMorIngenAvDisse: Story = {
    args: {
        ...MorOgFarKunFarHarRettMorIngenAvDisse.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            navnPåMedmor: 'Helga Utvikler',
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
        },
    },
};

export const BareMorSøkerOgHarRett: Story = {
    args: {
        ...MorOgFarBeggeHarRett.args,
        hvemPlanlegger: {
            navnPåMor: 'Olga Utvikler',
            type: HvemPlanleggerType.MOR,
        },
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: undefined,
        },
    },
};

export const BareFarSøkerOgHarRett: Story = {
    args: {
        ...MorOgFarBeggeHarRett.args,
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            type: HvemPlanleggerType.FAR,
        },
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: undefined,
        },
        stønadskontoer: {
            '80': {
                kontoer: [{ konto: StønadskontoType.Foreldrepenger, dager: 291 }],
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: [{ konto: StønadskontoType.Foreldrepenger, dager: 230 }],
                minsteretter: MINSTERETTER,
            },
        },
    },
};

export const FarOgFarBeggeHarRett: Story = {
    args: {
        ...MorOgFarBeggeHarRett.args,
        hvemPlanlegger: {
            navnPåFar: 'Espen Utvikler',
            navnPåMedfar: 'Anders Utvikler',
            type: HvemPlanleggerType.FAR_OG_FAR,
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
    },
};

export const FarOgFarKunMedfarHarRett: Story = {
    args: {
        ...FarOgFarBeggeHarRett.args,
        fordeling: undefined,
        arbeidssituasjon: {
            status: Arbeidsstatus.INGEN,
            jobberAnnenPart: true,
        },
    },
};

export const BarnetErFødtDagenEtterTermindato: Story = {
    args: {
        ...MorOgFarBeggeHarRett.args,
        omBarnet: {
            erFødsel: true,
            erBarnetFødt: true,
            termindato: '2024-04-11',
            fødselsdato: '2024-04-12',
            antallBarn: '1',
        },
    },
};
