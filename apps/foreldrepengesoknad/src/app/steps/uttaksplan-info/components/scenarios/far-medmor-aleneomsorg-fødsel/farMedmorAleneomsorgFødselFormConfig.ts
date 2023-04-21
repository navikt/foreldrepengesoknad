import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum FarMedmorAleneomsorgFødselFormField {
    dekningsgrad = 'dekningsgrad',
    startPåOmsorgsovertakelse = 'startPåOmsorgsovertakelse',
    startdatoUttak = 'startdatoUttak',
}

export interface FarMedmorAleneomsorgFødselFormData {
    [FarMedmorAleneomsorgFødselFormField.dekningsgrad]: string;
    [FarMedmorAleneomsorgFødselFormField.startPåOmsorgsovertakelse]: string;
    [FarMedmorAleneomsorgFødselFormField.startdatoUttak]: string;
}

export const FarMedmorAleneomsorgFødselFormComponents = getTypedFormComponents<
    FarMedmorAleneomsorgFødselFormField,
    FarMedmorAleneomsorgFødselFormData
>();
