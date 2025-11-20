import { Meta, StoryObj } from '@storybook/react-vite';
import { FpEllerEsRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { DEFAULT_SATSER } from '@navikt/fp-constants';

import { OppsummeringFpEllerEsSide } from './OppsummeringFpEllerEsSide';

const meta = {
    title: 'fpEllerEs/OppsummeringFpEllerEsSide',
    component: OppsummeringFpEllerEsSide,
    render: (props) => {
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
        satser: DEFAULT_SATSER,
        fpEllerEsSituasjon: {
            borDuINorge: true,
            erIArbeid: true,
            harHattAndreInntekter: true,
            harHattInntekt: true,
            lønnPerMåned: '20000',
            situasjon: 'mor',
            jobberDuINorge: true,
        },
    },
};
export const MorHarTjentMindreEnn200000OgHarRettTilFpOgEs: Story = {
    args: {
        satser: DEFAULT_SATSER,
        fpEllerEsSituasjon: {
            borDuINorge: true,
            erIArbeid: true,
            harHattAndreInntekter: true,
            harHattInntekt: true,
            lønnPerMåned: '10000',
            situasjon: 'mor',
            jobberDuINorge: true,
        },
    },
};
export const FarKanHaRettTilFp: Story = {
    args: {
        satser: DEFAULT_SATSER,
        fpEllerEsSituasjon: {
            borDuINorge: true,
            erIArbeid: true,
            harHattAndreInntekter: false,
            harHattInntekt: true,
            lønnPerMåned: '10000',
            situasjon: 'far',
            jobberDuINorge: true,
        },
    },
};
export const FarKanHaRettTilEs: Story = {
    args: {
        satser: DEFAULT_SATSER,
        fpEllerEsSituasjon: {
            borDuINorge: true,
            erIArbeid: true,
            harHattAndreInntekter: false,
            harHattInntekt: true,
            lønnPerMåned: '1000',
            situasjon: 'far',
            jobberDuINorge: true,
        },
    },
};
export const MorHarRettTilEs: Story = {
    args: {
        satser: DEFAULT_SATSER,
        fpEllerEsSituasjon: {
            borDuINorge: true,
            erIArbeid: false,
            harHattAndreInntekter: false,
            harHattInntekt: true,
            lønnPerMåned: '1000',
            situasjon: 'mor',
            jobberDuINorge: true,
        },
    },
};

export const MorHarRettBorIkkeINorgeMenJobberINorge: Story = {
    args: {
        satser: DEFAULT_SATSER,
        fpEllerEsSituasjon: {
            borDuINorge: false,
            erIArbeid: true,
            harHattAndreInntekter: false,
            harHattInntekt: true,
            lønnPerMåned: '10000',
            situasjon: 'mor',
            jobberDuINorge: true,
        },
    },
};

export const FarHarIkkeRett: Story = {
    args: {
        satser: DEFAULT_SATSER,
        fpEllerEsSituasjon: {
            borDuINorge: false,
            erIArbeid: false,
            harHattAndreInntekter: false,
            harHattInntekt: true,
            lønnPerMåned: '0',
            situasjon: 'far',
            jobberDuINorge: false,
        },
    },
};
export const MorHarIkkeRettJobberIkkeINorgeMenIUtlandet: Story = {
    args: {
        satser: DEFAULT_SATSER,
        fpEllerEsSituasjon: {
            borDuINorge: false,
            erIArbeid: true,
            harHattAndreInntekter: false,
            harHattInntekt: true,
            lønnPerMåned: '10000',
            situasjon: 'mor',
            jobberDuINorge: false,
        },
    },
};
