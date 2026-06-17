import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { action } from 'storybook/actions';

import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

import { ArbeidsforholdOgInntektPanel } from './ArbeidsforholdOgInntektPanel';
import { type AndreInntektskilder, AnnenInntektType } from './types/AndreInntektskilder';

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

const DEFAULT_FRILANSOPPDRAG = [
    {
        arbeidsgiverId: '999999999',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Frilans Oppdrag AS',
        fom: '2024-01-15T00:00:00.000Z',
        stillingsprosent: 0,
    },
] satisfies EksternArbeidsforholdDto_fpoversikt[];

const DEFAULT_SELVSTENDIG_NÆRING = [
    {
        arbeidsgiverId: '998877665',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Kari Konsulent',
        fom: '2024-01-01T00:00:00.000Z',
        stillingsprosent: 100,
    },
] satisfies EksternArbeidsforholdDto_fpoversikt[];

const DEFAULT_ANDRE_INNTEKTSKILDER = [
    {
        type: AnnenInntektType.JOBB_I_UTLANDET,
        land: 'DK',
        arbeidsgiverNavn: 'Københavns Kommune',
        pågående: false,
        fom: '2024-01-01T00:00:00.000Z',
        tom: '2024-03-31T00:00:00.000Z',
    },
] satisfies AndreInntektskilder[];

const meta = {
    component: ArbeidsforholdOgInntektPanel,
    render: (args) => {
        const [andreInntektskilder, setAndreInntektskilder] = useState(args.andreInntektskilder);

        return (
            <ArbeidsforholdOgInntektPanel
                {...args}
                andreInntektskilder={andreInntektskilder}
                saveAndreInntektskilder={(values) => {
                    setAndreInntektskilder(values);
                    args.saveAndreInntektskilder(values);
                }}
            />
        );
    },
} satisfies Meta<typeof ArbeidsforholdOgInntektPanel>;
export default meta;

type Story = StoryObj<typeof meta>;

export const ForSvangerskapspenger: Story = {
    args: {
        aktiveArbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
        frilansoppdrag: [],
        selvstendigNæring: [],
        andreInntektskilder: [],
        saveOnNext: action('button-click'),
        saveAndreInntektskilder: action('button-click'),
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

export const ForForeldrepengerMedFrilansoppdrag: Story = {
    args: {
        ...ForForeldrepenger.args,
        frilansoppdrag: DEFAULT_FRILANSOPPDRAG,
    },
};

export const ForForeldrepengerMedSelvstendigNæring: Story = {
    args: {
        ...ForForeldrepenger.args,
        selvstendigNæring: DEFAULT_SELVSTENDIG_NÆRING,
    },
};

export const ForForeldrepengerMedAndreInntekter: Story = {
    args: {
        ...ForForeldrepenger.args,
        andreInntektskilder: DEFAULT_ANDRE_INNTEKTSKILDER,
    },
};
