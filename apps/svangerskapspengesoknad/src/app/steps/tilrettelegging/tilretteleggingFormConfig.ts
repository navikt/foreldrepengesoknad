import { Attachment } from '@navikt/fp-common/src/common/types/Attachment';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum TilretteleggingFormField {
    tilrettelagtArbeidFom = 'tilrettelagtArbeidFom',
    tilretteleggingsType = 'tilretteleggingsType',
    vedlegg = 'vedlegg',
}

export interface TilretteleggingFormData {
    [TilretteleggingFormField.tilrettelagtArbeidFom]: string;
    [TilretteleggingFormField.tilretteleggingsType]: string;
    [TilretteleggingFormField.vedlegg]: Attachment[];
}

export const TilretteleggingFormComponents = getTypedFormComponents<
    TilretteleggingFormField,
    TilretteleggingFormData
>();
