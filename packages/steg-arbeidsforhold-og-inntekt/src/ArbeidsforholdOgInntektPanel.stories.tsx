import { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

import { ArbeidsforholdOgInntektPanel } from './ArbeidsforholdOgInntektPanel';

const DEFAULT_ARBEIDSFORHOLD = [
    {
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2019-06-01T00:00:00.000Z',
        stillingsprosent: 85.09,
    },
    {
        arbeidsgiverId: '990322244',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Omsorgspartner Vestfold AS',
        fom: '2017-04-05T00:00:00.000Z',
        stillingsprosent: 100,
    },
    {
        arbeidsgiverId: '995090910',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Re Kommune',
        fom: '2018-06-01T00:00:00.000Z',
        stillingsprosent: 0,
    },
] satisfies EksternArbeidsforholdDto_fpoversikt[];

const meta = {
    component: ArbeidsforholdOgInntektPanel,
} satisfies Meta<typeof ArbeidsforholdOgInntektPanel>;
export default meta;

type Story = StoryObj<typeof meta>;

export const ForSvangerskapspenger: Story = {
    args: {
        aktiveArbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
        saveOnNext: action('button-click'),
        onAvsluttOgSlett: action('button-click'),
        goToPreviousStep: action('button-click'),
        onStepChange: action('button-click'),
        stepConfig: [
            {
                id: 'BARNET_PATH',
                label: 'Barnet',
                isSelected: false,
            },
            {
                id: 'ARBEIDSFORHOLD_OG_INNTEKT',
                label: 'Arbeidsforhold og inntekt',
                isSelected: true,
            },
        ],
        appOrigin: 'svangerskapspengesoknad',
    },
};

export const ForForeldrepenger: Story = {
    args: {
        ...ForSvangerskapspenger.args,
        appOrigin: 'foreldrepengesoknad',
    },
};

export const HarIngenArbeidsforhold: Story = {
    args: {
        ...ForSvangerskapspenger.args,
        appOrigin: 'foreldrepengesoknad',
        aktiveArbeidsforhold: [],
    },
};
