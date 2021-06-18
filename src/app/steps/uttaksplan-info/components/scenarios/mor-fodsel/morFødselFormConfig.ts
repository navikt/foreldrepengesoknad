import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';

export enum MorFødselFormField {
    dekningsgrad = 'dekningsgrad',
}

export interface MorFødselFormData {
    [MorFødselFormField.dekningsgrad]: string;
}

export const MorFødselFormComponents = getTypedFormComponents<MorFødselFormField, MorFødselFormData, string>();
