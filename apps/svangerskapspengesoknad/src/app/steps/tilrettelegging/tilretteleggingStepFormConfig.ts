import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { Tilretteleggingstype, PeriodeMedVariasjon } from 'app/types/Tilrettelegging';

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
    variertePerioder = 'variertePerioder',
    tilretteleggingstiltak = 'tilretteleggingstiltak',
}

export interface TilretteleggingFormData {
    [TilretteleggingFormField.behovForTilretteleggingFom]: string;
    [TilretteleggingFormField.tilretteleggingType]: Tilretteleggingstype;
    [TilretteleggingFormField.delvisTilretteleggingPeriodeType]: DelivisTilretteleggingPeriodeType;
    [TilretteleggingFormField.sammePeriodeFremTilTerminFom]: string;
    [TilretteleggingFormField.sammePeriodeFremTilTerminStillingsprosent]: string;
    [TilretteleggingFormField.variertePerioder]: PeriodeMedVariasjon[];
    [TilretteleggingFormField.tilretteleggingstiltak]: string;
}

export const TilretteleggingFormComponents = getTypedFormComponents<
    TilretteleggingFormField | string,
    TilretteleggingFormData
>();
