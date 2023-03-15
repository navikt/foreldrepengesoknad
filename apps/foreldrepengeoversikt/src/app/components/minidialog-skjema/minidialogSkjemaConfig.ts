import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { Attachment } from 'app/types/Attachment';

export enum MinidialogFormField {
    brukerØnskerÅUttaleSeg = 'brukerØnskerÅUttaleSeg',
    tilbakemelding = 'tilbakemelding',
    vedlegg = 'vedlegg',
}

export interface MinidialogFormData {
    [MinidialogFormField.brukerØnskerÅUttaleSeg]: YesOrNo;
    [MinidialogFormField.tilbakemelding]: string;
    [MinidialogFormField.vedlegg]: Attachment[];
}

export const MinidialogFormComponents = getTypedFormComponents<MinidialogFormField, MinidialogFormData>();
