import { hasValue } from '@navikt/fp-common';
import { QuestionConfig, Questions, YesOrNo } from '@navikt/fp-formik';

import { InntektsinformasjonFormData, InntektsinformasjonFormField } from './inntektsinformasjonFormConfig';

const InntektsinformasjonFormConfig: QuestionConfig<InntektsinformasjonFormData, InntektsinformasjonFormField> = {
    [InntektsinformasjonFormField.hattInntektSomFrilans]: {
        isIncluded: () => true,
        isAnswered: ({ hattInntektSomFrilans }) => hattInntektSomFrilans !== YesOrNo.UNANSWERED,
    },
    [InntektsinformasjonFormField.frilansOppstartsDato]: {
        isIncluded: ({ hattInntektSomFrilans }) => hattInntektSomFrilans === YesOrNo.YES,
        isAnswered: ({ frilansOppstartsDato }) => hasValue(frilansOppstartsDato),
        visibilityFilter: ({ hattInntektSomFrilans }) => hattInntektSomFrilans === YesOrNo.YES,
    },
    [InntektsinformasjonFormField.jobberFremdelesSomFrilanser]: {
        isIncluded: ({ hattInntektSomFrilans }) => hattInntektSomFrilans === YesOrNo.YES,
        isAnswered: ({ jobberFremdelesSomFrilanser }) => jobberFremdelesSomFrilanser !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ frilansOppstartsDato }) => hasValue(frilansOppstartsDato),
    },
    [InntektsinformasjonFormField.hattInntektSomNæringsdrivende]: {
        isIncluded: () => true,
        isAnswered: ({ hattInntektSomNæringsdrivende }) => hattInntektSomNæringsdrivende !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ hattInntektSomFrilans }) => hattInntektSomFrilans !== YesOrNo.UNANSWERED,
    },
    [InntektsinformasjonFormField.hattAndreInntekter]: {
        isIncluded: () => true,
        isAnswered: ({ hattAndreInntekter }) => hattAndreInntekter !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ hattInntektSomNæringsdrivende }) => hattInntektSomNæringsdrivende !== YesOrNo.UNANSWERED,
    },
};

const inntektsinforMasjonQuestionsConfig = Questions<InntektsinformasjonFormData, InntektsinformasjonFormField>(
    InntektsinformasjonFormConfig,
);

export default inntektsinforMasjonQuestionsConfig;
