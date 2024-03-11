import { getTypedFormComponents } from '@navikt/fp-formik';

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
