import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from '@navikt/fp-common';
import {
    MorFarAdopsjonAnnenForelderHarRettIEØSFormData,
    MorFarAdopsjonAnnenForelderHarRettIEØSFormField,
} from './morFarAdopsjonAnnenForelderHarRettIEØSFormConfig';
import AdopsjonStartdatoValg from '../mor-far-adopsjon/adopsjonStartdatoValg';
export interface MorFarAdopsjonAnnenForelderHarRettIEØSQuestionsPayload
    extends MorFarAdopsjonAnnenForelderHarRettIEØSFormData {
    erFarEllerMedmor: boolean;
}
const MorFarAdopsjonAnnenForelderHarRettIEØSFormConfig: QuestionConfig<
    MorFarAdopsjonAnnenForelderHarRettIEØSQuestionsPayload,
    MorFarAdopsjonAnnenForelderHarRettIEØSFormField
> = {
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.startdatoAdopsjonValg]: {
        isAnswered: ({ startdatoAdopsjonValg }) => hasValue(startdatoAdopsjonValg),
        isIncluded: () => true,
    },
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.annenStartdatoAdopsjon]: {
        isAnswered: ({ annenStartdatoAdopsjon }) => hasValue(annenStartdatoAdopsjon),
        isIncluded: ({ startdatoAdopsjonValg }) => startdatoAdopsjonValg === AdopsjonStartdatoValg.ANNEN,
    },
};
export const morFarAdopsjonAnnenForelderHarRettIEØSQuestionsConfig = Questions<
    MorFarAdopsjonAnnenForelderHarRettIEØSQuestionsPayload,
    MorFarAdopsjonAnnenForelderHarRettIEØSFormField
>(MorFarAdopsjonAnnenForelderHarRettIEØSFormConfig);
