import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum FarMedmorFørstegangssøknadMedAnnenPartFormField {
    permisjonStartdato = 'permisjonStartdato',
}

export interface FarMedmorFørstegangssøknadMedAnnenPartFormData {
    [FarMedmorFørstegangssøknadMedAnnenPartFormField.permisjonStartdato]: string;
}

export const FarMedmorFørstegangssøknadMedAnnenPartFormComponents = getTypedFormComponents<
    FarMedmorFørstegangssøknadMedAnnenPartFormField,
    FarMedmorFørstegangssøknadMedAnnenPartFormData
>();
