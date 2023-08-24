import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { hasValue } from 'app/utils/validationUtils';
import {
    DelvisTilretteleggingSubformData,
    DelvisTilretteleggingSubformField,
} from './delvisTilretteleggingSubformConfig';
import { Tilretteleggingstype } from 'app/types/Tilrettelegging';

const DelvisTilretteleggingSubformConfig: QuestionConfig<
    DelvisTilretteleggingSubformData,
    DelvisTilretteleggingSubformField
> = {
    [DelvisTilretteleggingSubformField.type]: {
        isIncluded: () => true,
        isAnswered: ({ type }) => hasValue(type),
    },
    [DelvisTilretteleggingSubformField.fom]: {
        isIncluded: () => true,
        isAnswered: ({ fom }) => hasValue(fom),
    },
    [DelvisTilretteleggingSubformField.stillingsprosent]: {
        isIncluded: ({ type }) => type === Tilretteleggingstype.DELVIS,
        isAnswered: ({ stillingsprosent }) => hasValue(stillingsprosent),
    },
};

export const delvisTilretteleggingSubformQuestionsConfig = Questions<
    DelvisTilretteleggingSubformData,
    DelvisTilretteleggingSubformField
>(DelvisTilretteleggingSubformConfig);
