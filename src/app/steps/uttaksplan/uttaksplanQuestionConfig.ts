import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { Forelder } from 'app/types/Forelder';
import dayjs from 'dayjs';
import { Uttaksperiode } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { UttaksplanFormData, UttaksplanFormField } from './UttaksplanFormConfig';

export interface UttaksplanQuestionPayload extends UttaksplanFormData {
    termindato: Date | undefined;
    perioderRundtFødsel: Uttaksperiode[];
}
const includeAutomatiskJusteringSpørsmål = (
    perioderRundtFødsel: Uttaksperiode[],
    termindato: Date | undefined
): boolean => {
    if (perioderRundtFødsel.length === 0 || perioderRundtFødsel.length > 1 || termindato === undefined) {
        console.log(false);
        return false;
    }

    const periodeRundtFødsel = perioderRundtFødsel[0] as Uttaksperiode;
    return (
        periodeRundtFødsel.forelder === Forelder.farMedmor &&
        periodeRundtFødsel.konto === StønadskontoType.Fedrekvote &&
        dayjs(periodeRundtFødsel.tidsperiode.fom).isSame(termindato, 'day') &&
        periodeRundtFødsel.ønskerSamtidigUttak === true
    );
};

const UttaksplanFormConfig: QuestionConfig<UttaksplanQuestionPayload, UttaksplanFormField> = {
    [UttaksplanFormField.ønskerAutomatiskJustering]: {
        isIncluded: ({ perioderRundtFødsel, termindato }) =>
            includeAutomatiskJusteringSpørsmål(perioderRundtFødsel, termindato),
        isAnswered: ({ ønskerAutomatiskJustering }) => ønskerAutomatiskJustering !== YesOrNo.UNANSWERED,
    },
};

const uttaksplanQuestionsConfig = Questions<UttaksplanQuestionPayload, UttaksplanFormField>(UttaksplanFormConfig);

export default uttaksplanQuestionsConfig;
