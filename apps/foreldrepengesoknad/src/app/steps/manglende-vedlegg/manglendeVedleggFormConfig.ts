import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import { Attachment } from 'app/types/Attachment';

export enum ManglendeVedleggFormField {
    vedlegg = 'vedlegg',
}

export interface ManglendeVedleggFormData {
    [ManglendeVedleggFormField.vedlegg]: Attachment[][];
}

export const ManglendeVedleggFormComponents = getTypedFormComponents<
    ManglendeVedleggFormField,
    ManglendeVedleggFormData,
    string
>();
