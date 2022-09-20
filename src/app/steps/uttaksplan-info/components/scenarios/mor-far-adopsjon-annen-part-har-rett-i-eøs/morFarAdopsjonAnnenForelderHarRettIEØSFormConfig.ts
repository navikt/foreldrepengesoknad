import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import AdopsjonStartdatoValg from '../mor-far-adopsjon/adopsjonStartdatoValg';

export enum MorFarAdopsjonAnnenForelderHarRettIEØSFormField {
    dekningsgrad = 'dekningsgrad',
    startdatoAdopsjonValg = 'startdatoAdopsjonValg',
    søkersFørsteDagAdopsjon = 'søkersFørsteDag',
}

export interface MorFarAdopsjonAnnenForelderHarRettIEØSFormData {
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.dekningsgrad]: string;
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.startdatoAdopsjonValg]: AdopsjonStartdatoValg | undefined;
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.søkersFørsteDagAdopsjon]: string;
}

export const MorFarAdopsjonAnnenForelderHarRettIEØSFormComponents = getTypedFormComponents<
    MorFarAdopsjonAnnenForelderHarRettIEØSFormField,
    MorFarAdopsjonAnnenForelderHarRettIEØSFormData,
    string
>();
