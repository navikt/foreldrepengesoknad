import { getTypedFormComponents } from '@navikt/fp-formik';

export enum FarMedmorFødselOgMorHarIkkeRettFormField {
    permisjonStartdato = 'permisjonStartdato',
}

export interface FarMedmorFødselOgMorHarIkkeRettFormData {
    [FarMedmorFødselOgMorHarIkkeRettFormField.permisjonStartdato]: string;
}

export const FarMedmorFødselOgMorHarIkkeRettFormComponents = getTypedFormComponents<
    FarMedmorFødselOgMorHarIkkeRettFormField,
    FarMedmorFødselOgMorHarIkkeRettFormData
>();
