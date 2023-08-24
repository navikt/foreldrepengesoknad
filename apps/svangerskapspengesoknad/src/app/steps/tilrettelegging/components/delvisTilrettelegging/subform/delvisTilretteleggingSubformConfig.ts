import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { Tilretteleggingstype } from 'app/types/Tilrettelegging';

export enum DelvisTilretteleggingSubformField {
    type = 'type',
    fom = 'fom',
    stillingsprosent = 'stillingsprosent',
}

export interface DelvisTilretteleggingSubformData {
    [DelvisTilretteleggingSubformField.type]: Tilretteleggingstype;
    [DelvisTilretteleggingSubformField.fom]: string;
    [DelvisTilretteleggingSubformField.stillingsprosent]: string;
}

export const DelvisTilretteleggingSubformComponents = getTypedFormComponents<
    DelvisTilretteleggingSubformField,
    DelvisTilretteleggingSubformData
>();
