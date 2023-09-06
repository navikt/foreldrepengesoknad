import { Attachment } from '@navikt/fp-common/src/common/types/Attachment';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum SkjemaFormField {
    vedlegg = 'vedlegg',
    risikofaktorerFrilanser = 'risikofaktorerFrilans',
    risikofaktorerNæring = 'risikofaktorerNæring',
}

export interface SkjemaFormData {
    [SkjemaFormField.vedlegg]: Attachment[][];
    [SkjemaFormField.risikofaktorerFrilanser]: string;
    [SkjemaFormField.risikofaktorerNæring]: string;
}

export const initialSkjemaFormData: SkjemaFormData = {
    [SkjemaFormField.vedlegg]: [],
    [SkjemaFormField.risikofaktorerFrilanser]: '',
    [SkjemaFormField.risikofaktorerNæring]: '',
};

export const SkjemaFormComponents = getTypedFormComponents<SkjemaFormField, SkjemaFormData>();
