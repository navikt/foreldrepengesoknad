import { YesOrNo, getTypedFormComponents } from '@navikt/fp-formik';

export enum UttaksplanFormField {
    ønskerAutomatiskJustering = 'ønskerAutomatiskJustering',
}

export interface UttaksplanFormData {
    [UttaksplanFormField.ønskerAutomatiskJustering]: YesOrNo;
}

export const UttaksplanFormComponents = getTypedFormComponents<UttaksplanFormField, UttaksplanFormData>();
