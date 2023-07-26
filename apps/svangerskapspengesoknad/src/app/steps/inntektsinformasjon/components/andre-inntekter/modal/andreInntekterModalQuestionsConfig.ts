import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { AndreInntekterFormData, AndreInntekterFormField } from './andreInntekterModalFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { AnnenInntektType } from 'app/types/AnnenInntekt';
import { hasValue } from 'app/utils/validationUtils';

const AndreInntekterModalFormConfig: QuestionConfig<AndreInntekterFormData, AndreInntekterFormField> = {
    [AndreInntekterFormField.type]: {
        isIncluded: () => true,
        isAnswered: ({ type }) => hasValue(type),
    },
    [AndreInntekterFormField.land]: {
        isIncluded: ({ type }) => type === AnnenInntektType.JOBB_I_UTLANDET,
        isAnswered: ({ land }) => hasValue(land),
        visibilityFilter: ({ type }) => type === AnnenInntektType.JOBB_I_UTLANDET,
    },
    [AndreInntekterFormField.navnPåArbeidsgiver]: {
        isIncluded: ({ type }) => type === AnnenInntektType.JOBB_I_UTLANDET,
        isAnswered: ({ navnPåArbeidsgiver }) => hasValue(navnPåArbeidsgiver),
        visibilityFilter: ({ land }) => hasValue(land),
    },
    [AndreInntekterFormField.fom]: {
        isIncluded: () => true,
        isAnswered: ({ fom }) => hasValue(fom),
        visibilityFilter: ({ type, navnPåArbeidsgiver, land }) =>
            (type === AnnenInntektType.JOBB_I_UTLANDET && hasValue(navnPåArbeidsgiver) && hasValue(land)) ||
            (type !== AnnenInntektType.JOBB_I_UTLANDET && hasValue(type)),
    },
    [AndreInntekterFormField.pågående]: {
        isIncluded: () => true,
        isAnswered: ({ pågående }) => pågående !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ fom }) => hasValue(fom),
    },
    [AndreInntekterFormField.tom]: {
        isIncluded: ({ pågående }) => pågående === YesOrNo.NO,
        isAnswered: ({ tom }) => hasValue(tom),
        visibilityFilter: ({ pågående }) => pågående === YesOrNo.NO,
    },
    //TODO: Denne skal ikke vises hvis ytelse = svangerskapspenger
    [AndreInntekterFormField.dokumentasjon]: {
        isIncluded: ({ type }) => type !== AnnenInntektType.JOBB_I_UTLANDET,
        isAnswered: () => true,
        visibilityFilter: ({ pågående, tom }) => pågående === YesOrNo.YES || (pågående === YesOrNo.NO && hasValue(tom)),
    },
};

const andreInntekterModalQuestionsConfig = Questions<AndreInntekterFormData, AndreInntekterFormField>(
    AndreInntekterModalFormConfig
);

export default andreInntekterModalQuestionsConfig;
