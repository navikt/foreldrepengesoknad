import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';

import { HvemPlanleggerType, UttakPeriode_fpoversikt } from '@navikt/fp-types';

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
    uttaksplan: UttakPeriode_fpoversikt[];
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
            termindato: '2025-05-09',
            antallBarn: '1',
        },
        fordeling: {
            antallDagerSøker1: 0,
        },
        hvorLangPeriode: {
            dekningsgrad: '100',
        },
        arbeidssituasjon: {
            status: Arbeidsstatus.JOBBER,
            jobberAnnenPart: true,
        },
        stønadskontoer: {
            '80': {
                kontoer: [
                    { konto: 'MØDREKVOTE', dager: 95 },
                    { konto: 'FEDREKVOTE', dager: 95 },
                    { konto: 'FELLESPERIODE', dager: 101 },
                    { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
                ],
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: [
                    { konto: 'MØDREKVOTE', dager: 75 },
                    { konto: 'FEDREKVOTE', dager: 75 },
                    { konto: 'FELLESPERIODE', dager: 80 },
                    { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
                ],
                minsteretter: MINSTERETTER,
            },
        },
        uttaksplan: [
            {
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2025-04-18',
                tom: '2025-05-08',
            },
            {
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                fom: '2025-05-09',
                tom: '2025-08-21',
            },
            {
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                fom: '2025-08-22',
                tom: '2025-12-11',
            },
            {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                fom: '2025-12-12',
                tom: '2026-03-26',
            },
        ],
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
                    { konto: 'FORELDREPENGER', dager: 291 },
                    { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
                ],
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: [
                    { konto: 'FORELDREPENGER', dager: 230 },
                    { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
                ],
                minsteretter: MINSTERETTER,
            },
        },
        uttaksplan: [
            {
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2025-04-18',
                tom: '2025-05-08',
            },
            {
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER',
                fom: '2025-05-09',
                tom: '2026-03-26',
            },
        ],
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
                    { konto: 'FORELDREPENGER', dager: 166 },
                    { konto: 'AKTIVITETSFRI_KVOTE', dager: 95 },
                ],
                minsteretter: {
                    farRundtFødsel: 10,
                    toTette: 0,
                },
            },
            '100': {
                kontoer: [
                    { konto: 'FORELDREPENGER', dager: 125 },
                    { konto: 'AKTIVITETSFRI_KVOTE', dager: 75 },
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
                    { konto: 'FORELDREPENGER', dager: 211 },
                    { konto: 'AKTIVITETSFRI_KVOTE', dager: 50 },
                ],
                minsteretter: {
                    farRundtFødsel: 10,
                    toTette: 0,
                },
            },
            '100': {
                kontoer: [
                    { konto: 'FORELDREPENGER', dager: 150 },
                    { konto: 'AKTIVITETSFRI_KVOTE', dager: 50 },
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
                kontoer: [{ konto: 'FORELDREPENGER', dager: 291 }],
                minsteretter: MINSTERETTER,
            },
            '100': {
                kontoer: [{ konto: 'FORELDREPENGER', dager: 230 }],
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
