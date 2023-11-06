import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { Attachment } from 'app/types/Attachment';

export enum SkjemaFormField {
    vedlegg = 'vedlegg',
}

export interface SkjemaFormData {
    [SkjemaFormField.vedlegg]: Attachment[];
}

export const initialSkjemaFormData: SkjemaFormData = {
    [SkjemaFormField.vedlegg]: [],
};

export const SkjemaFormComponents = getTypedFormComponents<SkjemaFormField, SkjemaFormData>();
