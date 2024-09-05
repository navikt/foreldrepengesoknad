import { Meta, StoryObj } from '@storybook/react';
import { FpEllerEsRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Action } from 'vite-plugin-checker/dist/esm/types';

import { initAmplitude } from '@navikt/fp-metrics';

import { Situasjon } from '../situasjon/SituasjonSide';
import OppsummeringFpEllerEsSide from './OppsummeringFpEllerEsSide';

const satser = {
    engangstønad: [
        {
            fom: '01.01.2023',
            verdi: 92648,
        },
    ],
    grunnbeløp: [
        {
            fom: '01.05.2024',
            verdi: 124028,
        },
    ],
};

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof OppsummeringFpEllerEsSide>;

type Story = StoryObj<StoryArgs>;

const customRenderer = ({ fpEllerEsSituasjon }: StoryArgs) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[FpEllerEsRoutes.SITUASJON]}>
            <OppsummeringFpEllerEsSide fpEllerEsSituasjon={fpEllerEsSituasjon} satser={satser} />
        </MemoryRouter>
    );
};

const meta = {
    title: 'fpEllerEs/OppsummeringFpEllerEsSide',
    component: OppsummeringFpEllerEsSide,
    render: customRenderer,
} satisfies Meta<typeof OppsummeringFpEllerEsSide>;
export default meta;

export const MorHarTjentMerEnn200000OgHarRettTilFp: Story = {
    args: {
        fpEllerEsSituasjon: {
            borDuINorge: true,
            erIArbeid: true,
            harHattAndreInntekter: true,
            harHattInntekt: true,
            lønnPerMåned: '20000',
            situasjon: Situasjon.MOR,
            jobberDuINorge: true,
        },
    },
};
export const MorHarTjentMindreEnn200000OgHarRettTilFpOgEs: Story = {
    args: {
        fpEllerEsSituasjon: {
            borDuINorge: true,
            erIArbeid: true,
            harHattAndreInntekter: true,
            harHattInntekt: true,
            lønnPerMåned: '10000',
            situasjon: Situasjon.MOR,
            jobberDuINorge: true,
        },
    },
};
export const FarKanHaRettTilFp: Story = {
    args: {
        fpEllerEsSituasjon: {
            borDuINorge: true,
            erIArbeid: true,
            harHattAndreInntekter: false,
            harHattInntekt: true,
            lønnPerMåned: '10000',
            situasjon: Situasjon.FAR,
            jobberDuINorge: true,
        },
    },
};
export const MorHarRettTilEs: Story = {
    args: {
        fpEllerEsSituasjon: {
            borDuINorge: true,
            erIArbeid: false,
            harHattAndreInntekter: false,
            harHattInntekt: true,
            lønnPerMåned: '1000',
            situasjon: Situasjon.MOR,
            jobberDuINorge: true,
        },
    },
};

export const MorHarRettBorIkkeINorgeMenJobberINorge: Story = {
    args: {
        fpEllerEsSituasjon: {
            borDuINorge: false,
            erIArbeid: true,
            harHattAndreInntekter: false,
            harHattInntekt: true,
            lønnPerMåned: '10000',
            situasjon: Situasjon.MOR,
            jobberDuINorge: true,
        },
    },
};

export const FarHarIkkeRett: Story = {
    args: {
        fpEllerEsSituasjon: {
            borDuINorge: true,
            erIArbeid: false,
            harHattAndreInntekter: false,
            harHattInntekt: true,
            lønnPerMåned: '0',
            situasjon: Situasjon.FAR,
            jobberDuINorge: false,
        },
    },
};
export const MorHarIkkeRettJobberIkkeINorgeMenIUtlandet: Story = {
    args: {
        fpEllerEsSituasjon: {
            borDuINorge: false,
            erIArbeid: true,
            harHattAndreInntekter: false,
            harHattInntekt: true,
            lønnPerMåned: '10000',
            situasjon: Situasjon.MOR,
            jobberDuINorge: false,
        },
    },
};
