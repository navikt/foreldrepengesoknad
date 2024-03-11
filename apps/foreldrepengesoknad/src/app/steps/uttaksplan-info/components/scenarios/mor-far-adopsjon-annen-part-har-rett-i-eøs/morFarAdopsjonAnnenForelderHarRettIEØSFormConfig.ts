import { getTypedFormComponents } from '@navikt/fp-formik';

import AdopsjonStartdatoValg from '../mor-far-adopsjon/adopsjonStartdatoValg';

export enum MorFarAdopsjonAnnenForelderHarRettIEØSFormField {
    startdatoAdopsjonValg = 'startdatoAdopsjonValg',
    annenStartdatoAdopsjon = 'annenStartdatoAdopsjon',
}

export interface MorFarAdopsjonAnnenForelderHarRettIEØSFormData {
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.startdatoAdopsjonValg]: AdopsjonStartdatoValg | undefined;
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.annenStartdatoAdopsjon]: string | undefined;
}

export const MorFarAdopsjonAnnenForelderHarRettIEØSFormComponents = getTypedFormComponents<
    MorFarAdopsjonAnnenForelderHarRettIEØSFormField,
    MorFarAdopsjonAnnenForelderHarRettIEØSFormData
>();
