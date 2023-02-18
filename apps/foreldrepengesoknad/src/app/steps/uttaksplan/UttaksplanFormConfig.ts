import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';

export enum UttaksplanFormField {
    ønskerAutomatiskJustering = 'ønskerAutomatiskJustering',
}

export interface UttaksplanFormData {
    [UttaksplanFormField.ønskerAutomatiskJustering]: YesOrNo;
}

export const UttaksplanFormComponents = getTypedFormComponents<UttaksplanFormField, UttaksplanFormData, string>();
