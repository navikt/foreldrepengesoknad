import { YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum UttaksplanFormField {
    ønskerAutomatiskJustering = 'ønskerAutomatiskJustering',
}

export interface UttaksplanFormData {
    [UttaksplanFormField.ønskerAutomatiskJustering]: YesOrNo;
}

export const UttaksplanFormComponents = getTypedFormComponents<UttaksplanFormField, UttaksplanFormData>();
