import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';

export enum AutomatiskJusteringFormField {
    ønskerAutomatiskJustering = 'ønskerAutomatiskJustering',
}

export interface AutomatiskJusteringFormData {
    [AutomatiskJusteringFormField.ønskerAutomatiskJustering]: YesOrNo;
}

export const AutomatiskJusteringFormComponents = getTypedFormComponents<
    AutomatiskJusteringFormField,
    AutomatiskJusteringFormData,
    string
>();
