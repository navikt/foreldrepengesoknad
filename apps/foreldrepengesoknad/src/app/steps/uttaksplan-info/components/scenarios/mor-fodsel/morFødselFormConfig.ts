import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';

export enum MorFødselFormField {
    dekningsgrad = 'dekningsgrad',
    permisjonStartdato = 'permisjonStartdato',
    skalIkkeHaUttakFørTermin = 'skalIkkeHaUttakFørTermin',
    fellesperiodeukerMor = 'fellesperiodeukerMor',
}

export interface MorFødselFormData {
    [MorFødselFormField.dekningsgrad]: string;
    [MorFødselFormField.permisjonStartdato]: string;
    [MorFødselFormField.skalIkkeHaUttakFørTermin]: boolean;
    [MorFødselFormField.fellesperiodeukerMor]: number | undefined;
}

export const MorFødselFormComponents = getTypedFormComponents<MorFødselFormField, MorFødselFormData, string>();
