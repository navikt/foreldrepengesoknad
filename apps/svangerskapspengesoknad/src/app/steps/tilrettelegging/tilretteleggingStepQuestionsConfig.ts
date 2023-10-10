import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import {
    DelivisTilretteleggingPeriodeType,
    TilretteleggingFormData,
    TilretteleggingFormField,
} from './tilretteleggingStepFormConfig';
import { hasValue } from 'app/utils/validationUtils';
import { Arbeidsforholdstype, TilOgMedDatoType, TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';

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
                hasValue(tilretteleggingType) && tilretteleggingType === TilretteleggingstypeOptions.DELVIS,
            isAnswered: ({ delvisTilretteleggingPeriodeType }) => hasValue(delvisTilretteleggingPeriodeType),
        },

        [TilretteleggingFormField.enPeriodeMedTilretteleggingFom]: {
            isIncluded: ({ tilretteleggingType, delvisTilretteleggingPeriodeType }) =>
                (tilretteleggingType === TilretteleggingstypeOptions.DELVIS &&
                    delvisTilretteleggingPeriodeType ===
                        DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN) ||
                tilretteleggingType === TilretteleggingstypeOptions.INGEN,
            isAnswered: ({ enPeriodeMedTilretteleggingFom }) => hasValue(enPeriodeMedTilretteleggingFom),
        },

        [TilretteleggingFormField.enPeriodeMedTilretteleggingStillingsprosent]: {
            isIncluded: ({ tilretteleggingType, delvisTilretteleggingPeriodeType }) =>
                tilretteleggingType === TilretteleggingstypeOptions.DELVIS &&
                delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN,
            isAnswered: ({ enPeriodeMedTilretteleggingStillingsprosent }) =>
                hasValue(enPeriodeMedTilretteleggingStillingsprosent),
        },

        [TilretteleggingFormField.enPeriodeMedTilretteleggingTomType]: {
            isIncluded: ({ tilretteleggingType, delvisTilretteleggingPeriodeType }) =>
                tilretteleggingType === TilretteleggingstypeOptions.INGEN ||
                (tilretteleggingType === TilretteleggingstypeOptions.DELVIS &&
                    delvisTilretteleggingPeriodeType ===
                        DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN),
            isAnswered: ({ enPeriodeMedTilretteleggingTomType }) => hasValue(enPeriodeMedTilretteleggingTomType),
        },
        [TilretteleggingFormField.enPeriodeMedTilretteleggingTom]: {
            isIncluded: ({
                tilretteleggingType,
                delvisTilretteleggingPeriodeType,
                enPeriodeMedTilretteleggingTomType,
            }) =>
                (tilretteleggingType === TilretteleggingstypeOptions.INGEN ||
                    (tilretteleggingType === TilretteleggingstypeOptions.DELVIS &&
                        delvisTilretteleggingPeriodeType ===
                            DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN)) &&
                enPeriodeMedTilretteleggingTomType === TilOgMedDatoType.VALGFRI_DATO,
            isAnswered: ({ enPeriodeMedTilretteleggingTom }) => hasValue(enPeriodeMedTilretteleggingTom),
        },
        [TilretteleggingFormField.tilretteleggingstiltak]: {
            isIncluded: ({ arbeidsType }) =>
                arbeidsType === Arbeidsforholdstype.FRILANSER || arbeidsType === Arbeidsforholdstype.SELVSTENDIG,
            isAnswered: ({ tilretteleggingstiltak }) => hasValue(tilretteleggingstiltak),
        },
        [TilretteleggingFormField.risikofaktorer]: {
            isIncluded: ({ arbeidsType }) =>
                arbeidsType === Arbeidsforholdstype.FRILANSER || arbeidsType === Arbeidsforholdstype.SELVSTENDIG,
            isAnswered: ({ risikofaktorer }) => hasValue(risikofaktorer),
        },
    };

const tilretteleggingQuestionsConfig = Questions<TilretteleggingFormQuestionsPayload, TilretteleggingFormField>(
    TilretteleggingFormConfig,
);

export default tilretteleggingQuestionsConfig;
