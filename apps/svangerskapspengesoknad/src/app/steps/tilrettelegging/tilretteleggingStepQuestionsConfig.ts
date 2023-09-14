import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import {
    DelivisTilretteleggingPeriodeType,
    TilretteleggingFormData,
    TilretteleggingFormField,
} from './tilretteleggingStepFormConfig';
import { hasValue } from 'app/utils/validationUtils';
import { Arbeidsforholdstype, Tilretteleggingstype } from 'app/types/Tilrettelegging';

export interface TilretteleggingFormQuestionsPayload extends TilretteleggingFormData {
    arbeidsType: Arbeidsforholdstype;
}

export const TilretteleggingFormConfig: QuestionConfig<TilretteleggingFormQuestionsPayload, TilretteleggingFormField> =
    {
        [TilretteleggingFormField.behovForTilretteleggingFom]: {
            isIncluded: () => true,
            isAnswered: ({ behovForTilretteleggingFom }) => behovForTilretteleggingFom !== YesOrNo.UNANSWERED,
        },
        [TilretteleggingFormField.tilretteleggingType]: {
            isIncluded: () => true,
            isAnswered: ({ tilretteleggingType }) => hasValue(tilretteleggingType),
        },
        [TilretteleggingFormField.delvisTilretteleggingPeriodeType]: {
            isIncluded: ({ tilretteleggingType }) =>
                hasValue(tilretteleggingType) && tilretteleggingType === Tilretteleggingstype.DELVIS,
            isAnswered: ({ delvisTilretteleggingPeriodeType }) => hasValue(delvisTilretteleggingPeriodeType),
        },

        [TilretteleggingFormField.sammePeriodeFremTilTerminFom]: {
            isIncluded: ({ tilretteleggingType, delvisTilretteleggingPeriodeType }) =>
                (tilretteleggingType === Tilretteleggingstype.DELVIS &&
                    delvisTilretteleggingPeriodeType ===
                        DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN) ||
                tilretteleggingType === Tilretteleggingstype.INGEN,
            isAnswered: ({ sammePeriodeFremTilTerminFom }) => hasValue(sammePeriodeFremTilTerminFom),
        },

        [TilretteleggingFormField.sammePeriodeFremTilTerminStillingsprosent]: {
            isIncluded: ({ tilretteleggingType, delvisTilretteleggingPeriodeType }) =>
                tilretteleggingType === Tilretteleggingstype.DELVIS &&
                delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN,
            isAnswered: ({ sammePeriodeFremTilTerminStillingsprosent }) =>
                hasValue(sammePeriodeFremTilTerminStillingsprosent),
        },
        [TilretteleggingFormField.variertePerioder]: {
            isIncluded: ({ tilretteleggingType, delvisTilretteleggingPeriodeType }) =>
                tilretteleggingType === Tilretteleggingstype.DELVIS &&
                delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER,
            isAnswered: ({ variertePerioder }) => hasValue(variertePerioder),
        },
        [TilretteleggingFormField.tilretteleggingstiltak]: {
            isIncluded: ({ arbeidsType }) =>
                arbeidsType === Arbeidsforholdstype.FRILANSER || arbeidsType === Arbeidsforholdstype.SELVSTENDIG,
            isAnswered: ({ tilretteleggingstiltak }) => hasValue(tilretteleggingstiltak),
        },
    };

const tilretteleggingQuestionsConfig = Questions<TilretteleggingFormQuestionsPayload, TilretteleggingFormField>(
    TilretteleggingFormConfig
);

export default tilretteleggingQuestionsConfig;
