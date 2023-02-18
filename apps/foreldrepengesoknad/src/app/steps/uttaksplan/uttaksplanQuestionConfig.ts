import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { getKanPeriodenRundtFødselJusteres } from 'uttaksplan/components/automatisk-justering-form/automatiskJusteringUtils';
import { Periode } from 'uttaksplan/types/Periode';
import { UttaksplanFormData, UttaksplanFormField } from './UttaksplanFormConfig';

export interface UttaksplanQuestionPayload extends UttaksplanFormData {
    termindato: Date | undefined;
    perioderMedUttakRundtFødsel: Periode[];
}
const includeAutomatiskJusteringSpørsmål = (
    perioderMedUttakRundtFødsel: Periode[],
    termindato: Date | undefined
): boolean => {
    if (perioderMedUttakRundtFødsel.length !== 1 || termindato === undefined) {
        return false;
    }

    return getKanPeriodenRundtFødselJusteres(perioderMedUttakRundtFødsel[0], termindato);
};

const UttaksplanFormConfig: QuestionConfig<UttaksplanQuestionPayload, UttaksplanFormField> = {
    [UttaksplanFormField.ønskerAutomatiskJustering]: {
        isIncluded: ({ perioderMedUttakRundtFødsel, termindato }) =>
            includeAutomatiskJusteringSpørsmål(perioderMedUttakRundtFødsel, termindato),
        isAnswered: ({ ønskerAutomatiskJustering }) => ønskerAutomatiskJustering !== YesOrNo.UNANSWERED,
    },
};

const uttaksplanQuestionsConfig = Questions<UttaksplanQuestionPayload, UttaksplanFormField>(UttaksplanFormConfig);

export default uttaksplanQuestionsConfig;
