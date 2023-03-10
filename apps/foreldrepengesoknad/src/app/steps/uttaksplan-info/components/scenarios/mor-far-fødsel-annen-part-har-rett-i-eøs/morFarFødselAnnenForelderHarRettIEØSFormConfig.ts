import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';

export enum MorFarFødselAnnenForelderHarRettIEØSFormField {
    dekningsgrad = 'dekningsgrad',
    permisjonStartdato = 'permisjonStartdato',
    skalIkkeHaUttakFørTermin = 'skalIkkeHaUttakFørTermin',
}

export interface MorFarFødselAnnenForelderHarRettIEØSFormData {
    [MorFarFødselAnnenForelderHarRettIEØSFormField.dekningsgrad]: string;
    [MorFarFødselAnnenForelderHarRettIEØSFormField.permisjonStartdato]: string;
    [MorFarFødselAnnenForelderHarRettIEØSFormField.skalIkkeHaUttakFørTermin]: boolean | undefined;
}

export const MorFarFødselAnnenForelderHarRettIEØSFormComponents = getTypedFormComponents<
    MorFarFødselAnnenForelderHarRettIEØSFormField,
    MorFarFødselAnnenForelderHarRettIEØSFormData,
    string
>();
