import { hasValue } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { EgenNæringModalFormData, EgenNæringModalFormField } from './egenNæringModalFormConfig';

const EgenNæringModalFormConfig: QuestionConfig<EgenNæringModalFormData, EgenNæringModalFormField> = {
    [EgenNæringModalFormField.type]: {
        isIncluded: () => true,
        isAnswered: ({ type }) => hasValue(type),
    },
    [EgenNæringModalFormField.navnPåNæringen]: {
        isIncluded: () => true,
        isAnswered: ({ navnPåNæringen }) => hasValue(navnPåNæringen),
        visibilityFilter: ({ type }) => hasValue(type),
    },
    [EgenNæringModalFormField.registrertINorge]: {
        isIncluded: () => true,
        isAnswered: ({ registrertINorge }) => registrertINorge !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ navnPåNæringen }) => hasValue(navnPåNæringen),
    },
    [EgenNæringModalFormField.orgnr]: {
        isIncluded: ({ registrertINorge }) => registrertINorge === YesOrNo.YES,
        isAnswered: ({ orgnr }) => hasValue(orgnr),
        visibilityFilter: ({ registrertINorge }) => registrertINorge === YesOrNo.YES,
    },
    [EgenNæringModalFormField.land]: {
        isIncluded: ({ registrertINorge }) => registrertINorge === YesOrNo.NO,
        isAnswered: ({ land }) => hasValue(land),
        visibilityFilter: ({ registrertINorge }) => registrertINorge === YesOrNo.NO,
    },
    [EgenNæringModalFormField.fom]: {
        isIncluded: () => true,
        isAnswered: ({ fom }) => hasValue(fom),
        visibilityFilter: ({ orgnr, land }) => hasValue(orgnr) || hasValue(land),
    },
    [EgenNæringModalFormField.pågående]: {
        isIncluded: () => true,
        isAnswered: ({ pågående }) => pågående !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ fom }) => hasValue(fom),
    },
    [EgenNæringModalFormField.tom]: {
        isIncluded: ({ pågående }) => pågående === YesOrNo.NO,
        isAnswered: ({ tom }) => hasValue(tom),
        visibilityFilter: ({ pågående }) => pågående === YesOrNo.NO,
    },
};

const egenNæringModalQuestionsConfig = Questions<EgenNæringModalFormData, EgenNæringModalFormField>(
    EgenNæringModalFormConfig
);

export default egenNæringModalQuestionsConfig;
