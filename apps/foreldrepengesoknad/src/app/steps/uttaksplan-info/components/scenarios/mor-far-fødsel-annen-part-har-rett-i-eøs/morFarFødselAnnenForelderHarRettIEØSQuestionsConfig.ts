import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from '@navikt/fp-common';
import {
    MorFarFødselAnnenForelderHarRettIEØSFormData,
    MorFarFødselAnnenForelderHarRettIEØSFormField,
} from './morFarFødselAnnenForelderHarRettIEØSFormConfig';
export interface MorFarFødselAnnenForelderHarRettIEØSQuestionsPayload
    extends MorFarFødselAnnenForelderHarRettIEØSFormData {
    erFarEllerMedmor: boolean;
}

const MorFarFødselAnnenForelderHarRettIEØSFormConfig: QuestionConfig<
    MorFarFødselAnnenForelderHarRettIEØSQuestionsPayload,
    MorFarFødselAnnenForelderHarRettIEØSFormField
> = {
    [MorFarFødselAnnenForelderHarRettIEØSFormField.permisjonStartdato]: {
        isAnswered: ({ permisjonStartdato }) => hasValue(permisjonStartdato),
        isIncluded: () => true,
    },
};

export const morFarFødselAnnenForelderHarRettIEØSQuestionsConfig = Questions<
    MorFarFødselAnnenForelderHarRettIEØSQuestionsPayload,
    MorFarFødselAnnenForelderHarRettIEØSFormField
>(MorFarFødselAnnenForelderHarRettIEØSFormConfig);
