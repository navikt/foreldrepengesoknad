import { Attachment } from '@navikt/fp-common/src/common/types/Attachment';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum SkjemaFormField {
    vedlegg = 'vedlegg',
}

export interface SkjemaFormData {
    [SkjemaFormField.vedlegg]: Attachment[][];
}

export const initialSkjemaFormData: SkjemaFormData = {
    [SkjemaFormField.vedlegg]: [],
};

export const SkjemaFormComponents = getTypedFormComponents<SkjemaFormField, SkjemaFormData>();
