import { hasValue } from '@navikt/fp-common';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { isValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { PeriodeFørFødselFormData, PeriodeFørFødselFormField } from './periodeFørFødselFormConfig';

const PeriodeFørFødselFormConfig: QuestionConfig<PeriodeFørFødselFormData, PeriodeFørFødselFormField> = {
    [PeriodeFørFødselFormField.fom]: {
        isAnswered: ({ fom }) => hasValue(fom),
        isIncluded: ({ skalIkkeHaUttakFørTermin }) => !skalIkkeHaUttakFørTermin,
    },
    [PeriodeFørFødselFormField.tom]: {
        isAnswered: ({ tom }) => hasValue(tom),
        isIncluded: ({ skalIkkeHaUttakFørTermin }) => !skalIkkeHaUttakFørTermin,
    },
    [PeriodeFørFødselFormField.skalIkkeHaUttakFørTermin]: {
        isAnswered: () => true,
        isIncluded: () => true,
        visibilityFilter: ({ fom, tom, skalIkkeHaUttakFørTermin }) =>
            skalIkkeHaUttakFørTermin ? true : isValidTidsperiode({ fom, tom }),
    },
};

export const periodeFørFødselFormQuestionsConfig = Questions<PeriodeFørFødselFormData, PeriodeFørFødselFormField>(
    PeriodeFørFødselFormConfig
);
