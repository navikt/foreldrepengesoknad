import { Attachment } from '@navikt/fp-common';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum ManglendeVedleggFormField {
    vedlegg = 'vedlegg',
}

export interface ManglendeVedleggFormData {
    [ManglendeVedleggFormField.vedlegg]: Attachment[][];
}

export const ManglendeVedleggFormComponents = getTypedFormComponents<
    ManglendeVedleggFormField,
    ManglendeVedleggFormData
>();
