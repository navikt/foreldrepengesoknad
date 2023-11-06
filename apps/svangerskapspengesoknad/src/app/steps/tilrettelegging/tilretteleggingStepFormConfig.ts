import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { TilOgMedDatoType, TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';

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
    enPeriodeMedTilretteleggingTilbakeIJobbDato = 'enPeriodeMedTilretteleggingTilbakeIJobbDato',
    tilretteleggingstiltak = 'tilretteleggingstiltak',
    risikofaktorer = 'risikofaktorer',
}

export interface TilretteleggingFormData {
    [TilretteleggingFormField.behovForTilretteleggingFom]: string;
    [TilretteleggingFormField.tilretteleggingType]: TilretteleggingstypeOptions;
    [TilretteleggingFormField.delvisTilretteleggingPeriodeType]: DelivisTilretteleggingPeriodeType | undefined;
    [TilretteleggingFormField.enPeriodeMedTilretteleggingFom]: string | undefined;
    [TilretteleggingFormField.enPeriodeMedTilretteleggingStillingsprosent]: string | undefined;
    [TilretteleggingFormField.enPeriodeMedTilretteleggingTomType]: TilOgMedDatoType | undefined;
    [TilretteleggingFormField.enPeriodeMedTilretteleggingTilbakeIJobbDato]: string | undefined;
    [TilretteleggingFormField.tilretteleggingstiltak]: string | undefined;
    [TilretteleggingFormField.risikofaktorer]: string | undefined;
}

export const TilretteleggingFormComponents = getTypedFormComponents<
    TilretteleggingFormField,
    TilretteleggingFormData
>();
