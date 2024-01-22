import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

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
