import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import { Attachment } from 'app/types/Attachment';

export enum ManglendeVedleggFormField {
    terminbekreftelseDato = 'terminbekreftelseDato',
    vedlegg = 'vedlegg',
}

export interface ManglendeVedleggFormData {
    [ManglendeVedleggFormField.terminbekreftelseDato]: string;
    [ManglendeVedleggFormField.vedlegg]: Attachment[];
}

export const ManglendeVedleggFormComponents = getTypedFormComponents<
    ManglendeVedleggFormField,
    ManglendeVedleggFormData,
    string
>();
