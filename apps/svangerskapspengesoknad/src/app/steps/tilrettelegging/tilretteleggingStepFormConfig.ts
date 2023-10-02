import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { Tilretteleggingstype } from 'app/types/Tilrettelegging';

export enum DelivisTilretteleggingPeriodeType {
    'SAMMME_PERIODE_FREM_TIL_TERMIN' = 'SAMMME_PERIODE_FREM_TIL_TERMIN',
    'VARIERTE_PERIODER' = 'VARIERTE_PERIODER',
}

export enum TilretteleggingFormField {
    behovForTilretteleggingFom = 'behovForTilretteleggingFom',
    tilretteleggingType = 'tilretteleggingType',
    delvisTilretteleggingPeriodeType = 'delvisTilretteleggingPeriodeType',
    sammePeriodeFremTilTerminFom = 'sammePeriodeFremTilTerminFom',
    sammePeriodeFremTilTerminStillingsprosent = 'sammePeriodeFremTilTerminStillingsprosent',
    tilretteleggingstiltak = 'tilretteleggingstiltak',
    risikofaktorer = 'risikofaktorer',
}

export interface TilretteleggingFormData {
    [TilretteleggingFormField.behovForTilretteleggingFom]: string;
    [TilretteleggingFormField.tilretteleggingType]: Tilretteleggingstype;
    [TilretteleggingFormField.delvisTilretteleggingPeriodeType]: DelivisTilretteleggingPeriodeType | undefined;
    [TilretteleggingFormField.sammePeriodeFremTilTerminFom]: string | undefined;
    [TilretteleggingFormField.sammePeriodeFremTilTerminStillingsprosent]: string | undefined;
    [TilretteleggingFormField.tilretteleggingstiltak]: string | undefined;
    [TilretteleggingFormField.risikofaktorer]: string | undefined;
}

export const TilretteleggingFormComponents = getTypedFormComponents<
    TilretteleggingFormField,
    TilretteleggingFormData
>();
