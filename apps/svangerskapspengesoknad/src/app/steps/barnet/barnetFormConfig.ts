import { YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum BarnetFormField {
    erBarnetFødt = 'erBarnetFødt',
    termindato = 'termindato',
    fødselsdato = 'fødselsdato',
}

export interface BarnetFormData {
    [BarnetFormField.erBarnetFødt]: YesOrNo;
    [BarnetFormField.termindato]: string;
    [BarnetFormField.fødselsdato]: string | undefined;
}

export const BarnetFormComponents = getTypedFormComponents<BarnetFormField, BarnetFormData>();
