import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from '@navikt/fp-common';
import {
    MorFarFødselAnnenForelderHarRettIEØSFormData,
    MorFarFødselAnnenForelderHarRettIEØSFormField,
} from './morFarFødselAnnenForelderHarRettIEØSFormConfig';
interface MorFarFødselAnnenForelderHarRettIEØSQuestionsPayload extends MorFarFødselAnnenForelderHarRettIEØSFormData {
    erFarEllerMedmor: boolean;
}
const MorFarFødselAnnenForelderHarRettIEØSFormConfig: QuestionConfig<
    MorFarFødselAnnenForelderHarRettIEØSQuestionsPayload,
    MorFarFødselAnnenForelderHarRettIEØSFormField
> = {
    [MorFarFødselAnnenForelderHarRettIEØSFormField.dekningsgrad]: {
        isAnswered: ({ dekningsgrad }) => hasValue(dekningsgrad),
        isIncluded: () => true,
    },
    [MorFarFødselAnnenForelderHarRettIEØSFormField.permisjonStartdato]: {
        isAnswered: ({ permisjonStartdato }) => hasValue(permisjonStartdato),
        isIncluded: ({ dekningsgrad }) => hasValue(dekningsgrad),
    },
};
export const morFarFødselAnnenForelderHarRettIEØSQuestionsConfig = Questions<
    MorFarFødselAnnenForelderHarRettIEØSQuestionsPayload,
    MorFarFødselAnnenForelderHarRettIEØSFormField
>(MorFarFødselAnnenForelderHarRettIEØSFormConfig);
