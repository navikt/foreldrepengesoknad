import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from '@navikt/fp-common';
import {
    MorFarAdopsjonAnnenForelderHarRettIEØSFormData,
    MorFarAdopsjonAnnenForelderHarRettIEØSFormField,
} from './morFarAdopsjonAnnenForelderHarRettIEØSFormConfig';
import AdopsjonStartdatoValg from '../mor-far-adopsjon/adopsjonStartdatoValg';
interface MorFarAdopsjonAnnenForelderHarRettIEØSQuestionsPayload
    extends MorFarAdopsjonAnnenForelderHarRettIEØSFormData {
    erFarEllerMedmor: boolean;
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
        isIncluded: ({ dekningsgrad }) => hasValue(dekningsgrad),
    },
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.annenStartdatoAdopsjon]: {
        isAnswered: ({ annenStartdatoAdopsjon }) => hasValue(annenStartdatoAdopsjon),
        isIncluded: ({ dekningsgrad, startdatoAdopsjonValg }) =>
            startdatoAdopsjonValg === AdopsjonStartdatoValg.ANNEN && hasValue(dekningsgrad),
    },
};
export const morFarAdopsjonAnnenForelderHarRettIEØSQuestionsConfig = Questions<
    MorFarAdopsjonAnnenForelderHarRettIEØSQuestionsPayload,
    MorFarAdopsjonAnnenForelderHarRettIEØSFormField
>(MorFarAdopsjonAnnenForelderHarRettIEØSFormConfig);
