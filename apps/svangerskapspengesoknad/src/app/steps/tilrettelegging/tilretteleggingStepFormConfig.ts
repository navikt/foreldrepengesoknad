import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { Tilretteleggingstype } from 'app/types/Tilrettelegging';

export enum TilretteleggingPeriodeType {
    'EN' = 'en',
    'VARIERT' = 'VARIERT',
}

export enum TilretteleggingFormField {
    tilrettelagtArbeidFom = 'tilrettelagtArbeidFom',
    tilrettelagtArbeidType = 'tilrettelagtArbeidType',
    tilretteleggingPeriodetype = 'tilretteleggingPeriodetype',
    tilretteleggingsFom = 'tilretteleggingsFom',
    tilretteleggingsTom = 'tilretteleggingsTom',
    stillingsprosent = 'stillingsprosent',
}

export interface TilretteleggingFormData {
    [TilretteleggingFormField.tilrettelagtArbeidFom]: string;
    [TilretteleggingFormField.tilrettelagtArbeidType]: Tilretteleggingstype;
    [TilretteleggingFormField.tilretteleggingPeriodetype]: TilretteleggingPeriodeType;
    // [TilretteleggingFormField.tilretteleggingsFom]: string[];
    // [TilretteleggingFormField.tilretteleggingsTom]: string[];
    [TilretteleggingFormField.stillingsprosent]: string;
}

export const TilretteleggingFormComponents = getTypedFormComponents<
    TilretteleggingFormField,
    TilretteleggingFormData
>();
