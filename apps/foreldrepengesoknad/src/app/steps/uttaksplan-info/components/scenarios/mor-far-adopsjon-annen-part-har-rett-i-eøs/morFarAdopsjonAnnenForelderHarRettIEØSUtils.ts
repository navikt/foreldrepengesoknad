import { MorFarAdopsjonAnnenForelderHarRettIEØSUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { finnEnum } from '../mor-far-adopsjon/adopsjonStartdatoValg';
import {
    MorFarAdopsjonAnnenForelderHarRettIEØSFormField,
    MorFarAdopsjonAnnenForelderHarRettIEØSFormData,
} from './morFarAdopsjonAnnenForelderHarRettIEØSFormConfig';

const initialMorFarAdopsjonAnnenForelderHarRettIEØSValues: MorFarAdopsjonAnnenForelderHarRettIEØSFormData = {
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.startdatoAdopsjonValg]: undefined,
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.annenStartdatoAdopsjon]: '',
};
export const mapMorFarAdopsjonAnnenForelderHarRettIEØSFormToState = (
    values: Partial<MorFarAdopsjonAnnenForelderHarRettIEØSFormData>,
): MorFarAdopsjonAnnenForelderHarRettIEØSUttaksplanInfo => {
    return {
        startdatoAdopsjonValg: values.startdatoAdopsjonValg!,
        annenStartdatoAdopsjon: values.annenStartdatoAdopsjon!,
    };
};
export const getInitialMorFarAdopsjonAnnenForelderHarRettIEØSValues = (
    lagretUttaksplanInfo: MorFarAdopsjonAnnenForelderHarRettIEØSUttaksplanInfo | undefined,
): MorFarAdopsjonAnnenForelderHarRettIEØSFormData => {
    if (lagretUttaksplanInfo) {
        return {
            ...lagretUttaksplanInfo,
            [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.startdatoAdopsjonValg]: finnEnum(
                lagretUttaksplanInfo.startdatoAdopsjonValg,
            ),
        };
    }
    return initialMorFarAdopsjonAnnenForelderHarRettIEØSValues;
};
