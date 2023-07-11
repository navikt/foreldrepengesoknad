import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum TilretteleggingFormField {
    tilrettelagtArbeidFom = 'tilrettelagtArbeidFom',
    tilretteleggingsType = 'tilretteleggingsType',
}

export interface TilretteleggingFormData {
    [TilretteleggingFormField.tilrettelagtArbeidFom]: string;
    [TilretteleggingFormField.tilretteleggingsType]: string;
}

export const TilretteleggingFormComponents = getTypedFormComponents<
    TilretteleggingFormField,
    TilretteleggingFormData
>();
