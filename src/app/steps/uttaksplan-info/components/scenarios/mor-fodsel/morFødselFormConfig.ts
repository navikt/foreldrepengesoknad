import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';

export enum MorFødselFormField {
    dekningsgrad = 'dekningsgrad',
    permisjonStartdato = 'permisjonStartdato',
    skalIkkeHaUttakFørTermin = 'skalIkkeHaUttakFørTermin',
}

export interface MorFødselFormData {
    [MorFødselFormField.dekningsgrad]: string;
    [MorFødselFormField.permisjonStartdato]: string;
    [MorFødselFormField.skalIkkeHaUttakFørTermin]: boolean;
}

export const MorFødselFormComponents = getTypedFormComponents<MorFødselFormField, MorFødselFormData, string>();
