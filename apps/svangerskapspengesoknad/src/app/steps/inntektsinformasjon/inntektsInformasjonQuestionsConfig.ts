import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { InntektsinformasjonFormData, InntektsinformasjonFormField } from './inntektsinformasjonFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { TilretteleggingBehov } from 'app/types/VelgSøknadsgrunnlag';

export interface InntektsinformasjonFormQuestionPayload extends InntektsinformasjonFormData {
    tilretteleggingsValg: TilretteleggingBehov[];
}

const InntektsinformasjonFormConfig: QuestionConfig<
    InntektsinformasjonFormQuestionPayload,
    InntektsinformasjonFormField
> = {
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
    [InntektsinformasjonFormField.tilrettelegging]: {
        isIncluded: ({ tilretteleggingsValg }) => tilretteleggingsValg.length > 0,
        isAnswered: ({ tilrettelegging }) => tilrettelegging.length > 0,
    },
};

const inntektsinforMasjonQuestionsConfig = Questions<
    InntektsinformasjonFormQuestionPayload,
    InntektsinformasjonFormField
>(InntektsinformasjonFormConfig);

export default inntektsinforMasjonQuestionsConfig;
