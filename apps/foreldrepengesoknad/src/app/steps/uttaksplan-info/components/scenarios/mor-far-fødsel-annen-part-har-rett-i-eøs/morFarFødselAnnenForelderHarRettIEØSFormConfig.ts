import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum MorFarFødselAnnenForelderHarRettIEØSFormField {
    permisjonStartdato = 'permisjonStartdato',
    skalIkkeHaUttakFørTermin = 'skalIkkeHaUttakFørTermin',
}

export interface MorFarFødselAnnenForelderHarRettIEØSFormData {
    [MorFarFødselAnnenForelderHarRettIEØSFormField.permisjonStartdato]: string;
    [MorFarFødselAnnenForelderHarRettIEØSFormField.skalIkkeHaUttakFørTermin]: boolean | undefined;
}

export const MorFarFødselAnnenForelderHarRettIEØSFormComponents = getTypedFormComponents<
    MorFarFødselAnnenForelderHarRettIEØSFormField,
    MorFarFødselAnnenForelderHarRettIEØSFormData
>();
