import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from '@navikt/fp-common';
import {
    MorFarAnnenForelderHarRettIEØSFormData,
    MorFarAnnenForelderHarRettIEØSFormField,
} from './morFarAnnenForelderHarRettIEØSFormConfig';
interface MorFarAnnenForelderHarRettIEØSQuestionsPayload extends MorFarAnnenForelderHarRettIEØSFormData {
    erFarEllerMedmor: boolean;
    erFødsel: boolean;
}
const MorFarAnnenForelderHarRettIEØSFormConfig: QuestionConfig<
    MorFarAnnenForelderHarRettIEØSQuestionsPayload,
    MorFarAnnenForelderHarRettIEØSFormField
> = {
    [MorFarAnnenForelderHarRettIEØSFormField.dekningsgrad]: {
        isAnswered: ({ dekningsgrad }) => hasValue(dekningsgrad),
        isIncluded: () => true,
    },
    [MorFarAnnenForelderHarRettIEØSFormField.startdatoAdopsjonValg]: {
        isAnswered: ({ startdatoAdopsjonValg }) => hasValue(startdatoAdopsjonValg),
        isIncluded: ({ erFødsel, dekningsgrad }) => !erFødsel && hasValue(dekningsgrad),
    },
    [MorFarAnnenForelderHarRettIEØSFormField.søkersFørsteDagAdopsjon]: {
        isAnswered: ({ søkersFørsteDag }) => hasValue(søkersFørsteDag),
        isIncluded: ({ erFødsel, dekningsgrad, startdatoAdopsjonValg }) =>
            !erFødsel && hasValue(dekningsgrad) && hasValue(startdatoAdopsjonValg),
    },
};
export const morFarAnnenForelderHarRettIEØSQuestionsConfig = Questions<
    MorFarAnnenForelderHarRettIEØSQuestionsPayload,
    MorFarAnnenForelderHarRettIEØSFormField
>(MorFarAnnenForelderHarRettIEØSFormConfig);
