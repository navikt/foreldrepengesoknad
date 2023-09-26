import { Attachment } from '@navikt/fp-common/src/common/types/Attachment';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum SkjemaFormField {
    vedlegg = 'vedlegg',
    risikofaktorerFrilanser = 'risikofaktorerFrilans',
    risikofaktorerNæring = 'risikofaktorerNæring',
}

export interface SkjemaFormData {
    [SkjemaFormField.vedlegg]: Attachment[][];
    [SkjemaFormField.risikofaktorerFrilanser]: string | undefined;
    [SkjemaFormField.risikofaktorerNæring]: string | undefined;
}

export const initialSkjemaFormData: SkjemaFormData = {
    [SkjemaFormField.vedlegg]: [],
    [SkjemaFormField.risikofaktorerFrilanser]: undefined,
    [SkjemaFormField.risikofaktorerNæring]: undefined,
};

export const SkjemaFormComponents = getTypedFormComponents<SkjemaFormField, SkjemaFormData>();
