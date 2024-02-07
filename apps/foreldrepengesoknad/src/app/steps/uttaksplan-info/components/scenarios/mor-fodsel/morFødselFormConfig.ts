import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum MorFødselFormField {
    permisjonStartdato = 'permisjonStartdato',
    skalIkkeHaUttakFørTermin = 'skalIkkeHaUttakFørTermin',
    fellesperiodeukerMor = 'fellesperiodeukerMor',
}

export interface MorFødselFormData {
    [MorFødselFormField.permisjonStartdato]: string;
    [MorFødselFormField.skalIkkeHaUttakFørTermin]: boolean;
    [MorFødselFormField.fellesperiodeukerMor]: number | undefined;
}

export const MorFødselFormComponents = getTypedFormComponents<MorFødselFormField, MorFødselFormData>();
