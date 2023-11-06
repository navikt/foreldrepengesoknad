import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from 'app/utils/validationUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { EgenNæringFormData, EgenNæringFormField } from './egenNæringFormConfig';
import { ISOStringToDate } from '@navikt/fp-common';
import { erVirksomhetRegnetSomNyoppstartet } from './egenNæringFormUtils';

export const visVarigEndringInput = (
    egenNæringFom: string,
    egenNæringHattVarigEndringDeSiste4Årene: YesOrNo,
): boolean => {
    return (
        hasValue(egenNæringFom) &&
        !erVirksomhetRegnetSomNyoppstartet(ISOStringToDate(egenNæringFom)) &&
        hasValue(egenNæringHattVarigEndringDeSiste4Årene) &&
        egenNæringHattVarigEndringDeSiste4Årene === YesOrNo.YES
    );
};

const EgenNæringSubformConfig: QuestionConfig<EgenNæringFormData, EgenNæringFormField> = {
    [EgenNæringFormField.egenNæringType]: {
        isIncluded: () => true,
        isAnswered: ({ egenNæringType }) => egenNæringType !== undefined,
    },
    [EgenNæringFormField.egenNæringNavn]: {
        isIncluded: () => true,
        isAnswered: ({ egenNæringNavn }) => hasValue(egenNæringNavn),
    },
    [EgenNæringFormField.egenNæringRegistrertINorge]: {
        isIncluded: () => true,
        isAnswered: ({ egenNæringRegistrertINorge }) => egenNæringRegistrertINorge !== YesOrNo.UNANSWERED,
    },
    [EgenNæringFormField.egenNæringOrgnr]: {
        isIncluded: ({ egenNæringRegistrertINorge }) => egenNæringRegistrertINorge === YesOrNo.YES,
        isAnswered: () => true,
    },
    [EgenNæringFormField.egenNæringLand]: {
        isIncluded: ({ egenNæringRegistrertINorge }) => egenNæringRegistrertINorge === YesOrNo.NO,
        isAnswered: ({ egenNæringLand }) => hasValue(egenNæringLand),
    },
    [EgenNæringFormField.egenNæringFom]: {
        isIncluded: () => true,
        isAnswered: ({ egenNæringFom }) => hasValue(egenNæringFom),
    },
    [EgenNæringFormField.egenNæringPågående]: {
        isIncluded: () => true,
        isAnswered: ({ egenNæringPågående }) => egenNæringPågående !== YesOrNo.UNANSWERED,
    },
    [EgenNæringFormField.egenNæringTom]: {
        isIncluded: ({ egenNæringPågående }) => egenNæringPågående === YesOrNo.NO,
        isAnswered: ({ egenNæringTom }) => hasValue(egenNæringTom),
        visibilityFilter: ({ egenNæringPågående }) => egenNæringPågående === YesOrNo.NO,
    },
    [EgenNæringFormField.egenNæringResultat]: {
        isIncluded: ({ egenNæringFom }) => erVirksomhetRegnetSomNyoppstartet(ISOStringToDate(egenNæringFom)),
        isAnswered: ({ egenNæringResultat }) => hasValue(egenNæringResultat),
    },
    [EgenNæringFormField.egenNæringBlittYrkesaktivDe3SisteÅrene]: {
        isIncluded: ({ egenNæringFom }) => erVirksomhetRegnetSomNyoppstartet(ISOStringToDate(egenNæringFom)),
        isAnswered: ({ egenNæringBlittYrkesaktivDe3SisteÅrene }) =>
            egenNæringBlittYrkesaktivDe3SisteÅrene !== YesOrNo.UNANSWERED,
    },
    [EgenNæringFormField.egenNæringYrkesAktivDato]: {
        isIncluded: ({ egenNæringFom, egenNæringBlittYrkesaktivDe3SisteÅrene }) =>
            erVirksomhetRegnetSomNyoppstartet(ISOStringToDate(egenNæringFom)) &&
            egenNæringBlittYrkesaktivDe3SisteÅrene === YesOrNo.YES,
        isAnswered: ({ egenNæringYrkesAktivDato }) => hasValue(egenNæringYrkesAktivDato),
    },
    [EgenNæringFormField.egenNæringHattVarigEndringDeSiste4Årene]: {
        isIncluded: ({ egenNæringFom }) =>
            hasValue(egenNæringFom) && !erVirksomhetRegnetSomNyoppstartet(ISOStringToDate(egenNæringFom)),
        isAnswered: ({ egenNæringHattVarigEndringDeSiste4Årene }) => hasValue(egenNæringHattVarigEndringDeSiste4Årene),
    },
    [EgenNæringFormField.egenNæringVarigEndringDato]: {
        isIncluded: ({ egenNæringFom, egenNæringHattVarigEndringDeSiste4Årene }) =>
            visVarigEndringInput(egenNæringFom, egenNæringHattVarigEndringDeSiste4Årene),
        isAnswered: ({ egenNæringVarigEndringDato }) => hasValue(egenNæringVarigEndringDato),
    },
    [EgenNæringFormField.egenNæringVarigEndringBeskrivelse]: {
        isIncluded: ({ egenNæringFom, egenNæringHattVarigEndringDeSiste4Årene }) =>
            visVarigEndringInput(egenNæringFom, egenNæringHattVarigEndringDeSiste4Årene),
        isAnswered: ({ egenNæringVarigEndringBeskrivelse }) => hasValue(egenNæringVarigEndringBeskrivelse),
    },
    [EgenNæringFormField.egenNæringVarigEndringInntektEtterEndring]: {
        isIncluded: ({ egenNæringFom, egenNæringHattVarigEndringDeSiste4Årene }) =>
            visVarigEndringInput(egenNæringFom, egenNæringHattVarigEndringDeSiste4Årene),
        isAnswered: ({ egenNæringVarigEndringInntektEtterEndring }) =>
            hasValue(egenNæringVarigEndringInntektEtterEndring),
    },
};

export const egenNæringFormQuestionsConfig = Questions<EgenNæringFormData, EgenNæringFormField>(
    EgenNæringSubformConfig,
);
