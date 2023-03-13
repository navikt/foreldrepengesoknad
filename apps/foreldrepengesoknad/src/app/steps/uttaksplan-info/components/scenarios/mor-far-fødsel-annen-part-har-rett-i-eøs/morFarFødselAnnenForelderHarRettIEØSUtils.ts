import { dateToISOString } from '@navikt/sif-common-formik/lib';
import { MorFarFødselAnnenForelderHarRettIEØSUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import {
    MorFarFødselAnnenForelderHarRettIEØSFormField,
    MorFarFødselAnnenForelderHarRettIEØSFormData,
} from './morFarFødselAnnenForelderHarRettIEØSFormConfig';

const initialMorFarFødselAnnenForelderHarRettIEØSValues: MorFarFødselAnnenForelderHarRettIEØSFormData = {
    [MorFarFødselAnnenForelderHarRettIEØSFormField.dekningsgrad]: '',
    [MorFarFødselAnnenForelderHarRettIEØSFormField.permisjonStartdato]: '',
    [MorFarFødselAnnenForelderHarRettIEØSFormField.skalIkkeHaUttakFørTermin]: undefined,
};
export const mapMorFarFødselAnnenForelderHarRettIEØSFormToState = (
    values: Partial<MorFarFødselAnnenForelderHarRettIEØSFormData>
): MorFarFødselAnnenForelderHarRettIEØSUttaksplanInfo => {
    return {
        dekningsgrad: values.dekningsgrad!,
        permisjonStartdato: values.permisjonStartdato!,
        skalIkkeHaUttakFørTermin: values.skalIkkeHaUttakFørTermin,
    };
};
export const getInitialMorFarFødselAnnenForelderHarRettIEØSValues = (
    defaultPermisjonStartdato: Date,
    lagretUttaksplanInfo: MorFarFødselAnnenForelderHarRettIEØSUttaksplanInfo | undefined,
    dekningsgrad: Dekningsgrad
): MorFarFødselAnnenForelderHarRettIEØSFormData => {
    if (lagretUttaksplanInfo) {
        return {
            ...lagretUttaksplanInfo,
            [MorFarFødselAnnenForelderHarRettIEØSFormField.dekningsgrad]: dekningsgrad,
        };
    }
    return {
        ...initialMorFarFødselAnnenForelderHarRettIEØSValues,
        [MorFarFødselAnnenForelderHarRettIEØSFormField.permisjonStartdato]: dateToISOString(defaultPermisjonStartdato),
    };
};
