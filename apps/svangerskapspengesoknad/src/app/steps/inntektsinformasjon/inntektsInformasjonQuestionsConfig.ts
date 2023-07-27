import { ISOStringToDate } from '@navikt/fp-common';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { InntektsinformasjonFormData, InntektsinformasjonFormField } from './inntektsinformasjonFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { erVirksomhetRegnetSomNyoppstartet } from './inntektsinformasjonFormUtils';
import { hasValue } from 'app/utils/validationUtils';

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
    [InntektsinformasjonFormField.egenNæringType]: {
        isIncluded: () => true,
        isAnswered: ({ egenNæringType }) => egenNæringType !== undefined,
    },
    [InntektsinformasjonFormField.egenNæringNavn]: {
        isIncluded: () => true,
        isAnswered: ({ egenNæringNavn }) => hasValue(egenNæringNavn),
    },
    [InntektsinformasjonFormField.egenNæringRegistrertINorge]: {
        isIncluded: () => true,
        isAnswered: ({ egenNæringRegistrertINorge }) => egenNæringRegistrertINorge !== YesOrNo.UNANSWERED,
    },
    [InntektsinformasjonFormField.egenNæringOrgnr]: {
        isIncluded: ({ egenNæringRegistrertINorge }) => egenNæringRegistrertINorge === YesOrNo.YES,
        isAnswered: () => true,
    },
    [InntektsinformasjonFormField.egenNæringLand]: {
        isIncluded: ({ egenNæringRegistrertINorge }) => egenNæringRegistrertINorge === YesOrNo.NO,
        isAnswered: ({ egenNæringLand }) => hasValue(egenNæringLand),
    },
    [InntektsinformasjonFormField.egenNæringFom]: {
        isIncluded: () => true,
        isAnswered: ({ egenNæringFom }) => hasValue(egenNæringFom),
    },
    [InntektsinformasjonFormField.egenNæringPågående]: {
        isIncluded: () => true,
        isAnswered: ({ egenNæringPågående }) => egenNæringPågående !== YesOrNo.UNANSWERED,
    },
    [InntektsinformasjonFormField.egenNæringTom]: {
        isIncluded: ({ egenNæringPågående }) => egenNæringPågående === YesOrNo.NO,
        isAnswered: ({ egenNæringTom }) => hasValue(egenNæringTom),
        visibilityFilter: ({ egenNæringPågående }) => egenNæringPågående === YesOrNo.NO,
    },
    [InntektsinformasjonFormField.egenNæringResultat]: {
        isIncluded: ({ egenNæringFom }) => erVirksomhetRegnetSomNyoppstartet(ISOStringToDate(egenNæringFom)),
        isAnswered: ({ egenNæringResultat }) => hasValue(egenNæringResultat),
    },
    [InntektsinformasjonFormField.egenNæringBlittYrkesaktivDe3SisteÅrene]: {
        isIncluded: ({ egenNæringFom }) => erVirksomhetRegnetSomNyoppstartet(ISOStringToDate(egenNæringFom)),
        isAnswered: ({ egenNæringBlittYrkesaktivDe3SisteÅrene }) =>
            egenNæringBlittYrkesaktivDe3SisteÅrene !== YesOrNo.UNANSWERED,
    },
    [InntektsinformasjonFormField.egenNæringYrkesAktivDato]: {
        isIncluded: ({ egenNæringFom, egenNæringBlittYrkesaktivDe3SisteÅrene }) =>
            erVirksomhetRegnetSomNyoppstartet(ISOStringToDate(egenNæringFom)) &&
            egenNæringBlittYrkesaktivDe3SisteÅrene === YesOrNo.YES,
        isAnswered: ({ egenNæringYrkesAktivDato }) => hasValue(egenNæringYrkesAktivDato),
    },

    [InntektsinformasjonFormField.arbeidIUtlandetLand]: {
        isIncluded: () => true,
        isAnswered: ({ arbeidIUtlandetLand }) => hasValue(arbeidIUtlandetLand),
    },
    [InntektsinformasjonFormField.arbeidIUtlandetNavnArbeidsgiver]: {
        isIncluded: () => true,
        isAnswered: ({ arbeidIUtlandetNavnArbeidsgiver }) => hasValue(arbeidIUtlandetNavnArbeidsgiver),
    },
    [InntektsinformasjonFormField.arbeidIUtlandetFom]: {
        isIncluded: () => true,
        isAnswered: ({ arbeidIUtlandetFom }) => hasValue(arbeidIUtlandetFom),
    },
    [InntektsinformasjonFormField.arbeidIUtlandetPågående]: {
        isIncluded: () => true,
        isAnswered: ({ arbeidIUtlandetPågående }) => arbeidIUtlandetPågående !== YesOrNo.UNANSWERED,
    },
    [InntektsinformasjonFormField.arbeidIUtlandetTom]: {
        isIncluded: ({ arbeidIUtlandetPågående }) => arbeidIUtlandetPågående === YesOrNo.NO,
        isAnswered: ({ arbeidIUtlandetTom }) => hasValue(arbeidIUtlandetTom),
    },
};

const inntektsinforMasjonQuestionsConfig = Questions<InntektsinformasjonFormData, InntektsinformasjonFormField>(
    InntektsinformasjonFormConfig
);

export default inntektsinforMasjonQuestionsConfig;
