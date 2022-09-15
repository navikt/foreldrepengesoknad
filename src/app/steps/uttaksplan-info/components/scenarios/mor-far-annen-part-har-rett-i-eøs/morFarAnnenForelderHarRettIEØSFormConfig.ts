import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import AdopsjonStartdatoValg from '../mor-far-adopsjon/adopsjonStartdatoValg';

export enum MorFarAnnenForelderHarRettIEØSFormField {
    dekningsgrad = 'dekningsgrad',
    startdatoAdopsjonValg = 'startdatoAdopsjonValg',
    søkersFørsteDagAdopsjon = 'søkersFørsteDag',
}

export interface MorFarAnnenForelderHarRettIEØSFormData {
    [MorFarAnnenForelderHarRettIEØSFormField.dekningsgrad]: string;
    [MorFarAnnenForelderHarRettIEØSFormField.startdatoAdopsjonValg]: AdopsjonStartdatoValg | undefined;
    [MorFarAnnenForelderHarRettIEØSFormField.søkersFørsteDagAdopsjon]: string;
}

export const MorFarAnnenForelderHarRettIEØSFormComponents = getTypedFormComponents<
    MorFarAnnenForelderHarRettIEØSFormField,
    MorFarAnnenForelderHarRettIEØSFormData,
    string
>();
