import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';

export enum ManglendeVedleggFormField {
    terminbekreftelseDato = 'terminbekreftelseDato',
}

export interface ManglendeVedleggFormData {
    [ManglendeVedleggFormField.terminbekreftelseDato]: string;
}

export const ManglendeVedleggFormComponents = getTypedFormComponents<
    ManglendeVedleggFormField,
    ManglendeVedleggFormData,
    string
>();
