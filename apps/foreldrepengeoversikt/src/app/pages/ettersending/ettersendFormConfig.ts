import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { Attachment } from 'app/types/Attachment';
import { Skjemanummer } from 'app/types/Skjemanummer';

export enum EttersendingFormField {
    type = 'type',
    vedlegg = 'vedlegg',
}

export interface EttersendingFormData {
    [EttersendingFormField.type]: Skjemanummer | 'default';
    [EttersendingFormField.vedlegg]: Attachment[];
}

export const EttersendingFormComponents = getTypedFormComponents<EttersendingFormField, EttersendingFormData>();
