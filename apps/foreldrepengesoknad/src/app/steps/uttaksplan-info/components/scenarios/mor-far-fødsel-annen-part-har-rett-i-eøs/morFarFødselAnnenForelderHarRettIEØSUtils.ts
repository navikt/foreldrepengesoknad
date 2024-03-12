import { dateToISOString } from '@navikt/fp-formik';

import { MorFarFødselAnnenForelderHarRettIEØSUttaksplanInfo } from 'app/context/types/UttaksplanInfo';

import {
    MorFarFødselAnnenForelderHarRettIEØSFormData,
    MorFarFødselAnnenForelderHarRettIEØSFormField,
} from './morFarFødselAnnenForelderHarRettIEØSFormConfig';

const initialMorFarFødselAnnenForelderHarRettIEØSValues: MorFarFødselAnnenForelderHarRettIEØSFormData = {
    [MorFarFødselAnnenForelderHarRettIEØSFormField.permisjonStartdato]: '',
    [MorFarFødselAnnenForelderHarRettIEØSFormField.skalIkkeHaUttakFørTermin]: undefined,
};
export const mapMorFarFødselAnnenForelderHarRettIEØSFormToState = (
    values: Partial<MorFarFødselAnnenForelderHarRettIEØSFormData>,
): MorFarFødselAnnenForelderHarRettIEØSUttaksplanInfo => {
    return {
        permisjonStartdato: values.permisjonStartdato!,
        skalIkkeHaUttakFørTermin: values.skalIkkeHaUttakFørTermin,
    };
};
export const getInitialMorFarFødselAnnenForelderHarRettIEØSValues = (
    defaultPermisjonStartdato: Date,
    lagretUttaksplanInfo: MorFarFødselAnnenForelderHarRettIEØSUttaksplanInfo | undefined,
): MorFarFødselAnnenForelderHarRettIEØSFormData => {
    if (lagretUttaksplanInfo) {
        return {
            ...lagretUttaksplanInfo,
        };
    }
    return {
        ...initialMorFarFødselAnnenForelderHarRettIEØSValues,
        [MorFarFødselAnnenForelderHarRettIEØSFormField.permisjonStartdato]: dateToISOString(defaultPermisjonStartdato),
    };
};
