import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { TilOgMedDatoType, Tilretteleggingstype } from 'app/types/Tilrettelegging';

export enum DelivisTilretteleggingPeriodeType {
    'SAMMME_PERIODE_FREM_TIL_TERMIN' = 'SAMMME_PERIODE_FREM_TIL_TERMIN',
    'VARIERTE_PERIODER' = 'VARIERTE_PERIODER',
}

export enum TilretteleggingFormField {
    behovForTilretteleggingFom = 'behovForTilretteleggingFom',
    tilretteleggingType = 'tilretteleggingType',
    delvisTilretteleggingPeriodeType = 'delvisTilretteleggingPeriodeType',
    enPeriodeMedTilretteleggingFom = 'enPeriodeMedTilretteleggingFom',
    enPeriodeMedTilretteleggingStillingsprosent = 'enPeriodeMedTilretteleggingStillingsprosent',
    enPeriodeMedTilretteleggingTomType = 'enPeriodeMedTilretteleggingTomType',
    enPeriodeMedTilretteleggingTom = 'enPeriodeMedTilretteleggingTom',
    tilretteleggingstiltak = 'tilretteleggingstiltak',
    risikofaktorer = 'risikofaktorer',
}

export interface TilretteleggingFormData {
    [TilretteleggingFormField.behovForTilretteleggingFom]: string;
    [TilretteleggingFormField.tilretteleggingType]: Tilretteleggingstype;
    [TilretteleggingFormField.delvisTilretteleggingPeriodeType]: DelivisTilretteleggingPeriodeType | undefined;
    [TilretteleggingFormField.enPeriodeMedTilretteleggingFom]: string | undefined;
    [TilretteleggingFormField.enPeriodeMedTilretteleggingStillingsprosent]: string | undefined;
    [TilretteleggingFormField.enPeriodeMedTilretteleggingTomType]: TilOgMedDatoType | undefined;
    [TilretteleggingFormField.enPeriodeMedTilretteleggingTom]: string | undefined;
    [TilretteleggingFormField.tilretteleggingstiltak]: string | undefined;
    [TilretteleggingFormField.risikofaktorer]: string | undefined;
}

export const TilretteleggingFormComponents = getTypedFormComponents<
    TilretteleggingFormField,
    TilretteleggingFormData
>();
