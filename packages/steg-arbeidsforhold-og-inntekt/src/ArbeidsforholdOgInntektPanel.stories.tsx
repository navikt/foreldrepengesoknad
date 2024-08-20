import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';

import { Arbeidsforhold } from '@navikt/fp-types';

import ArbeidsforholdOgInntektPanel from './ArbeidsforholdOgInntektPanel';

const DEFAULT_ARBEIDSFORHOLD = [
    {
        id: '1669400414-9409-3313-0700-3334116100409',
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2014-05-22T00:00:00.000Z',
        stillingsprosent: 32.63,
        tom: '2019-05-31T00:00:00.000Z',
    },
    {
        id: '149599873-5769-19110-21897-6184606004018',
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2018-04-09T00:00:00.000Z',
        stillingsprosent: 0,
        tom: '2018-09-09T00:00:00.000Z',
    },
    {
        id: '86832061-1118-9701-6179-20647729409710',
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2018-06-25T00:00:00.000Z',
        stillingsprosent: 80,
        tom: '2018-08-05T00:00:00.000Z',
    },
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
}

const Template: StoryFn<Props> = ({
    arbeidsforhold = DEFAULT_ARBEIDSFORHOLD,
    saveOnNext = action('button-click'),
    cancelApplication = action('button-click'),
    goToPreviousStep = action('button-click'),
    onStepChange = action('button-click'),
}) => {
    return (
        <ArbeidsforholdOgInntektPanel
            arbeidsforhold={arbeidsforhold}
            termindato="2024-02-18"
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
            stønadstype="Svangerskapspenger"
        />
    );
};
export const Default = Template.bind({});
