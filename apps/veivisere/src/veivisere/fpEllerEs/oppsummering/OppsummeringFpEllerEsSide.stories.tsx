import { Meta, StoryObj } from '@storybook/react';
import { FpEllerEsRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

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

const meta = {
    title: 'fpEllerEs/OppsummeringFpEllerEsSide',
    component: OppsummeringFpEllerEsSide,
    render: (props) => {
        initAmplitude();
        return (
            <MemoryRouter initialEntries={[FpEllerEsRoutes.SITUASJON]}>
                <OppsummeringFpEllerEsSide {...props} />
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof OppsummeringFpEllerEsSide>;
export default meta;

type Story = StoryObj<typeof meta>;

export const MorHarTjentMerEnn200000OgHarRettTilFp: Story = {
    args: {
        satser,
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
        satser,
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
        satser,
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
        satser,
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
        satser,
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
        satser,
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
        satser,
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
