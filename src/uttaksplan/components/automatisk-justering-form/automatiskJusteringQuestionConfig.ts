import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { Forelder } from 'app/types/Forelder';
import dayjs from 'dayjs';
import { Uttaksperiode } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { AutomatiskJusteringFormData, AutomatiskJusteringFormField } from './AutomatiskJusteringFormConfig';

export interface AutomatiskJusteringQuestionPayload extends AutomatiskJusteringFormData {
    termindato: Date;
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

const AutomatiskJusteringFormConfig: QuestionConfig<AutomatiskJusteringQuestionPayload, AutomatiskJusteringFormField> =
    {
        [AutomatiskJusteringFormField.ønskerAutomatiskJustering]: {
            isIncluded: ({ perioderRundtFødsel, termindato }) =>
                includeAutomatiskJusteringSpørsmål(perioderRundtFødsel, termindato),
            isAnswered: ({ ønskerAutomatiskJustering }) => ønskerAutomatiskJustering !== YesOrNo.UNANSWERED,
        },
    };

const automatiskJusteringQuestionsConfig = Questions<AutomatiskJusteringQuestionPayload, AutomatiskJusteringFormField>(
    AutomatiskJusteringFormConfig
);

export default automatiskJusteringQuestionsConfig;
