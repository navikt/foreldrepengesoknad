import { MorFarAdopsjonAnnenForelderHarRettIEØSUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { finnEnum } from '../mor-far-adopsjon/adopsjonStartdatoValg';
import {
    MorFarAdopsjonAnnenForelderHarRettIEØSFormField,
    MorFarAdopsjonAnnenForelderHarRettIEØSFormData,
} from './morFarAdopsjonAnnenForelderHarRettIEØSFormConfig';
import { Dekningsgrad } from '@navikt/fp-common';

const initialMorFarAdopsjonAnnenForelderHarRettIEØSValues: MorFarAdopsjonAnnenForelderHarRettIEØSFormData = {
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.dekningsgrad]: '',
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.startdatoAdopsjonValg]: undefined,
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.annenStartdatoAdopsjon]: '',
};
export const mapMorFarAdopsjonAnnenForelderHarRettIEØSFormToState = (
    values: Partial<MorFarAdopsjonAnnenForelderHarRettIEØSFormData>,
): MorFarAdopsjonAnnenForelderHarRettIEØSUttaksplanInfo => {
    return {
        dekningsgrad: values.dekningsgrad!,
        startdatoAdopsjonValg: values.startdatoAdopsjonValg!,
        annenStartdatoAdopsjon: values.annenStartdatoAdopsjon!,
    };
};
export const getInitialMorFarAdopsjonAnnenForelderHarRettIEØSValues = (
    lagretUttaksplanInfo: MorFarAdopsjonAnnenForelderHarRettIEØSUttaksplanInfo | undefined,
    dekningsgrad?: Dekningsgrad,
): MorFarAdopsjonAnnenForelderHarRettIEØSFormData => {
    if (lagretUttaksplanInfo) {
        return {
            ...lagretUttaksplanInfo,
            [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.dekningsgrad]: dekningsgrad!,
            [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.startdatoAdopsjonValg]: finnEnum(
                lagretUttaksplanInfo.startdatoAdopsjonValg,
            ),
        };
    }
    return initialMorFarAdopsjonAnnenForelderHarRettIEØSValues;
};
