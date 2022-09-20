import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from '@navikt/fp-common';
import {
    MorFarAdopsjonAnnenForelderHarRettIEØSFormData,
    MorFarAdopsjonAnnenForelderHarRettIEØSFormField,
} from './morFarAdopsjonAnnenForelderHarRettIEØSFormConfig';
interface MorFarAdopsjonAnnenForelderHarRettIEØSQuestionsPayload
    extends MorFarAdopsjonAnnenForelderHarRettIEØSFormData {
    erFarEllerMedmor: boolean;
    erFødsel: boolean;
}
const MorFarAdopsjonAnnenForelderHarRettIEØSFormConfig: QuestionConfig<
    MorFarAdopsjonAnnenForelderHarRettIEØSQuestionsPayload,
    MorFarAdopsjonAnnenForelderHarRettIEØSFormField
> = {
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.dekningsgrad]: {
        isAnswered: ({ dekningsgrad }) => hasValue(dekningsgrad),
        isIncluded: () => true,
    },
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.startdatoAdopsjonValg]: {
        isAnswered: ({ startdatoAdopsjonValg }) => hasValue(startdatoAdopsjonValg),
        isIncluded: ({ erFødsel, dekningsgrad }) => !erFødsel && hasValue(dekningsgrad),
    },
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.søkersFørsteDagAdopsjon]: {
        isAnswered: ({ søkersFørsteDag }) => hasValue(søkersFørsteDag),
        isIncluded: ({ erFødsel, dekningsgrad, startdatoAdopsjonValg }) =>
            !erFødsel && hasValue(dekningsgrad) && hasValue(startdatoAdopsjonValg),
    },
};
export const morFarAdopsjonAnnenForelderHarRettIEØSQuestionsConfig = Questions<
    MorFarAdopsjonAnnenForelderHarRettIEØSQuestionsPayload,
    MorFarAdopsjonAnnenForelderHarRettIEØSFormField
>(MorFarAdopsjonAnnenForelderHarRettIEØSFormConfig);
