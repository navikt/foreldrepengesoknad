import { hasValue } from '@navikt/fp-common';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { InntektsinformasjonFormData, InntektsinformasjonFormField } from './inntektsinformasjonFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

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
        visibilityFilter: ({ hattInntektSomFrilans }) => hattInntektSomFrilans === YesOrNo.YES,
    },
    [InntektsinformasjonFormField.frilansSluttDato]: {
        isIncluded: ({ jobberFremdelesSomFrilanser }) => jobberFremdelesSomFrilanser === YesOrNo.NO,
        isAnswered: ({ frilansSluttDato }) => hasValue(frilansSluttDato),
        visibilityFilter: ({ hattInntektSomFrilans }) => hattInntektSomFrilans === YesOrNo.YES,
    },
    [InntektsinformasjonFormField.hattInntektSomNæringsdrivende]: {
        isIncluded: () => true,
        isAnswered: ({ hattInntektSomNæringsdrivende }) => hattInntektSomNæringsdrivende !== YesOrNo.UNANSWERED,
    },
    [InntektsinformasjonFormField.hattAndreInntekter]: {
        isIncluded: () => true,
        isAnswered: ({ hattAndreInntekter }) => hattAndreInntekter !== YesOrNo.UNANSWERED,
    },
};

const inntektsinforMasjonQuestionsConfig = Questions<InntektsinformasjonFormData, InntektsinformasjonFormField>(
    InntektsinformasjonFormConfig
);

export default inntektsinforMasjonQuestionsConfig;
