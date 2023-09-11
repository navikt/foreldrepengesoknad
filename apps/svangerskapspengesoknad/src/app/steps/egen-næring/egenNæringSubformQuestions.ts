import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from 'app/utils/validationUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { EgenNæringSubformData, EgenNæringSubformField } from './egenNæringSubformConfig';
import { ISOStringToDate } from '@navikt/fp-common';
import { erVirksomhetRegnetSomNyoppstartet } from './egenNæringSubformUtils';

const EgenNæringSubformConfig: QuestionConfig<EgenNæringSubformData, EgenNæringSubformField> = {
    [EgenNæringSubformField.egenNæringType]: {
        isIncluded: () => true,
        isAnswered: ({ egenNæringType }) => egenNæringType !== undefined,
    },
    [EgenNæringSubformField.egenNæringNavn]: {
        isIncluded: () => true,
        isAnswered: ({ egenNæringNavn }) => hasValue(egenNæringNavn),
    },
    [EgenNæringSubformField.egenNæringRegistrertINorge]: {
        isIncluded: () => true,
        isAnswered: ({ egenNæringRegistrertINorge }) => egenNæringRegistrertINorge !== YesOrNo.UNANSWERED,
    },
    [EgenNæringSubformField.egenNæringOrgnr]: {
        isIncluded: ({ egenNæringRegistrertINorge }) => egenNæringRegistrertINorge === YesOrNo.YES,
        isAnswered: () => true,
    },
    [EgenNæringSubformField.egenNæringLand]: {
        isIncluded: ({ egenNæringRegistrertINorge }) => egenNæringRegistrertINorge === YesOrNo.NO,
        isAnswered: ({ egenNæringLand }) => hasValue(egenNæringLand),
    },
    [EgenNæringSubformField.egenNæringFom]: {
        isIncluded: () => true,
        isAnswered: ({ egenNæringFom }) => hasValue(egenNæringFom),
    },
    [EgenNæringSubformField.egenNæringPågående]: {
        isIncluded: () => true,
        isAnswered: ({ egenNæringPågående }) => egenNæringPågående !== YesOrNo.UNANSWERED,
    },
    [EgenNæringSubformField.egenNæringTom]: {
        isIncluded: ({ egenNæringPågående }) => egenNæringPågående === YesOrNo.NO,
        isAnswered: ({ egenNæringTom }) => hasValue(egenNæringTom),
        visibilityFilter: ({ egenNæringPågående }) => egenNæringPågående === YesOrNo.NO,
    },
    [EgenNæringSubformField.egenNæringResultat]: {
        isIncluded: ({ egenNæringFom }) => erVirksomhetRegnetSomNyoppstartet(ISOStringToDate(egenNæringFom)),
        isAnswered: ({ egenNæringResultat }) => hasValue(egenNæringResultat),
    },
    [EgenNæringSubformField.egenNæringBlittYrkesaktivDe3SisteÅrene]: {
        isIncluded: ({ egenNæringFom }) => erVirksomhetRegnetSomNyoppstartet(ISOStringToDate(egenNæringFom)),
        isAnswered: ({ egenNæringBlittYrkesaktivDe3SisteÅrene }) =>
            egenNæringBlittYrkesaktivDe3SisteÅrene !== YesOrNo.UNANSWERED,
    },
    [EgenNæringSubformField.egenNæringYrkesAktivDato]: {
        isIncluded: ({ egenNæringFom, egenNæringBlittYrkesaktivDe3SisteÅrene }) =>
            erVirksomhetRegnetSomNyoppstartet(ISOStringToDate(egenNæringFom)) &&
            egenNæringBlittYrkesaktivDe3SisteÅrene === YesOrNo.YES,
        isAnswered: ({ egenNæringYrkesAktivDato }) => hasValue(egenNæringYrkesAktivDato),
    },
};

export const egenNæringSubformQuestionsConfig = Questions<EgenNæringSubformData, EgenNæringSubformField>(
    EgenNæringSubformConfig
);
