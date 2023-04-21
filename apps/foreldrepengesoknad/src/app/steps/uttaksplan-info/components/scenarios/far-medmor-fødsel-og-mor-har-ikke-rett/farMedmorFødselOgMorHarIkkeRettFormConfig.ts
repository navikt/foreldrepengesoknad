import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum FarMedmorFødselOgMorHarIkkeRettFormField {
    dekningsgrad = 'dekningsgrad',
    permisjonStartdato = 'permisjonStartdato',
}

export interface FarMedmorFødselOgMorHarIkkeRettFormData {
    [FarMedmorFødselOgMorHarIkkeRettFormField.dekningsgrad]: string;
    [FarMedmorFødselOgMorHarIkkeRettFormField.permisjonStartdato]: string;
}

export const FarMedmorFødselOgMorHarIkkeRettFormComponents = getTypedFormComponents<
    FarMedmorFødselOgMorHarIkkeRettFormField,
    FarMedmorFødselOgMorHarIkkeRettFormData
>();
