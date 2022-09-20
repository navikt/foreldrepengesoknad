import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import AdopsjonStartdatoValg from '../mor-far-adopsjon/adopsjonStartdatoValg';

export enum MorFarAdopsjonAnnenForelderHarRettIEØSFormField {
    dekningsgrad = 'dekningsgrad',
    startdatoAdopsjonValg = 'startdatoAdopsjonValg',
    annenStartdatoAdopsjon = 'annenStartdatoAdopsjon',
}

export interface MorFarAdopsjonAnnenForelderHarRettIEØSFormData {
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.dekningsgrad]: string;
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.startdatoAdopsjonValg]: AdopsjonStartdatoValg | undefined;
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.annenStartdatoAdopsjon]: string | undefined;
}

export const MorFarAdopsjonAnnenForelderHarRettIEØSFormComponents = getTypedFormComponents<
    MorFarAdopsjonAnnenForelderHarRettIEØSFormField,
    MorFarAdopsjonAnnenForelderHarRettIEØSFormData,
    string
>();
