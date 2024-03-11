import { getTypedFormComponents } from '@navikt/fp-formik';

export enum FarMedmorAleneomsorgFødselFormField {
    startPåOmsorgsovertakelse = 'startPåOmsorgsovertakelse',
    startdatoUttak = 'startdatoUttak',
}

export interface FarMedmorAleneomsorgFødselFormData {
    [FarMedmorAleneomsorgFødselFormField.startPåOmsorgsovertakelse]: string;
    [FarMedmorAleneomsorgFødselFormField.startdatoUttak]: string;
}

export const FarMedmorAleneomsorgFødselFormComponents = getTypedFormComponents<
    FarMedmorAleneomsorgFødselFormField,
    FarMedmorAleneomsorgFødselFormData
>();
