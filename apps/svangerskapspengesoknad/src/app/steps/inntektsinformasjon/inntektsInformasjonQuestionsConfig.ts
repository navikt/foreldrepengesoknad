import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { InntektsinformasjonFormData, InntektsinformasjonFormField } from './inntektsinformasjonFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

const InntektsinformasjonFormConfig: QuestionConfig<InntektsinformasjonFormData, InntektsinformasjonFormField> = {
    [InntektsinformasjonFormField.hattInntektSomFrilans]: {
        isIncluded: () => true,
        isAnswered: ({ hattInntektSomFrilans }) => hattInntektSomFrilans !== YesOrNo.UNANSWERED,
    },
    [InntektsinformasjonFormField.hattInntektSomNæringsdrivende]: {
        isIncluded: () => true,
        isAnswered: ({ hattInntektSomNæringsdrivende }) => hattInntektSomNæringsdrivende !== YesOrNo.UNANSWERED,
    },
    [InntektsinformasjonFormField.hattArbeidIUtlandet]: {
        isIncluded: () => true,
        isAnswered: ({ hattArbeidIUtlandet }) => hattArbeidIUtlandet !== YesOrNo.UNANSWERED,
    },
};

const inntektsinforMasjonQuestionsConfig = Questions<InntektsinformasjonFormData, InntektsinformasjonFormField>(
    InntektsinformasjonFormConfig
);

export default inntektsinforMasjonQuestionsConfig;
