import { hasValue } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
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
    [InntektsinformasjonFormField.oppdragForNæreVennerEllerFamilie]: {
        isIncluded: ({ hattInntektSomFrilans }) => hattInntektSomFrilans === YesOrNo.YES,
        isAnswered: ({ oppdragForNæreVennerEllerFamilie }) => oppdragForNæreVennerEllerFamilie !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ jobberFremdelesSomFrilanser }) => jobberFremdelesSomFrilanser !== YesOrNo.UNANSWERED,
    },
    [InntektsinformasjonFormField.inntektSomFosterforelder]: {
        isIncluded: ({ hattInntektSomFrilans }) => hattInntektSomFrilans === YesOrNo.YES,
        isAnswered: ({ inntektSomFosterforelder }) => inntektSomFosterforelder !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ oppdragForNæreVennerEllerFamilie }) =>
            oppdragForNæreVennerEllerFamilie !== YesOrNo.UNANSWERED,
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
    InntektsinformasjonFormConfig
);

export default inntektsinforMasjonQuestionsConfig;
