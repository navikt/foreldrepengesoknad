import { QuestionConfig, Questions } from '../../../formik-wrappers';
import { isValidTidsperiodeString } from '../../../utils/getUttaksdagerSomErFridager';
import { PeriodeFørFødselFormData, PeriodeFørFødselFormField } from './periodeFørFødselFormConfig';

const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

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
            skalIkkeHaUttakFørTermin ? true : isValidTidsperiodeString({ fom, tom }),
    },
};

export const periodeFørFødselFormQuestionsConfig = Questions<PeriodeFørFødselFormData, PeriodeFørFødselFormField>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    PeriodeFørFødselFormConfig,
);
