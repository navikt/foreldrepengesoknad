import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';

import { AppName, Arbeidsforhold } from '@navikt/fp-types';

import ArbeidsforholdOgInntektPanel from './ArbeidsforholdOgInntektPanel';

const DEFAULT_ARBEIDSFORHOLD = [
    {
        id: '186699244-06994-0884-1562-860234771205',
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2019-06-01T00:00:00.000Z',
        stillingsprosent: 85.09,
    },
    {
        id: '263929546-6215-9868-5127-161910165730101',
        arbeidsgiverId: '990322244',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Omsorgspartner Vestfold AS',
        fom: '2017-04-05T00:00:00.000Z',
        stillingsprosent: 100,
    },
    {
        id: '0132715641-23932-19917-03900-809964087910',
        arbeidsgiverId: '995090910',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Re Kommune',
        fom: '2018-06-01T00:00:00.000Z',
        stillingsprosent: 0,
    },
];

const defaultExport = {
    title: 'ArbeidsforholdOgInntektPanel',
    component: ArbeidsforholdOgInntektPanel,
};

export default defaultExport;

interface Props {
    arbeidsforhold: Arbeidsforhold[];
    saveOnNext: () => void;
    cancelApplication: () => void;
    goToPreviousStep: () => void;
    onStepChange: () => void;
    stønadstype: AppName;
}

const Template: StoryFn<Props> = ({
    arbeidsforhold = DEFAULT_ARBEIDSFORHOLD,
    saveOnNext = action('button-click'),
    cancelApplication = action('button-click'),
    goToPreviousStep = action('button-click'),
    onStepChange = action('button-click'),
    stønadstype,
}) => {
    return (
        <ArbeidsforholdOgInntektPanel
            aktiveArbeidsforhold={arbeidsforhold}
            saveOnNext={saveOnNext}
            onStepChange={onStepChange}
            cancelApplication={cancelApplication}
            goToPreviousStep={goToPreviousStep}
            stepConfig={[
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
            ]}
            stønadstype={stønadstype}
        />
    );
};
export const ForSvangerskapspenger = Template.bind({});
ForSvangerskapspenger.args = {
    stønadstype: 'Svangerskapspenger',
};

export const ForForeldrepenger = Template.bind({});
ForForeldrepenger.args = {
    stønadstype: 'Foreldrepenger',
};

export const HarIngenArbeidsforhold = Template.bind({});
HarIngenArbeidsforhold.args = {
    stønadstype: 'Foreldrepenger',
    arbeidsforhold: [],
};
