import { MorFarAnnenForelderHarRettIEØSUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { finnEnum } from '../mor-far-adopsjon/adopsjonStartdatoValg';
import {
    MorFarAnnenForelderHarRettIEØSFormField,
    MorFarAnnenForelderHarRettIEØSFormData,
} from './morFarAnnenForelderHarRettIEØSFormConfig';

const initialMorFarAnnenForelderHarRettIEØSValues: MorFarAnnenForelderHarRettIEØSFormData = {
    [MorFarAnnenForelderHarRettIEØSFormField.dekningsgrad]: '',
    [MorFarAnnenForelderHarRettIEØSFormField.startdatoAdopsjonValg]: undefined,
    [MorFarAnnenForelderHarRettIEØSFormField.søkersFørsteDagAdopsjon]: '',
};
export const mapMorFarAnnenForelderHarRettIEØSFormToState = (
    values: Partial<MorFarAnnenForelderHarRettIEØSFormData>
): MorFarAnnenForelderHarRettIEØSUttaksplanInfo => {
    return {
        dekningsgrad: values.dekningsgrad!,
        startdatoAdopsjonValg: values.startdatoAdopsjonValg!,
        søkersFørsteDag: values.søkersFørsteDag!,
    };
};
export const getInitialMorFarAnnenForelderHarRettIEØSValues = (
    lagretUttaksplanInfo: MorFarAnnenForelderHarRettIEØSUttaksplanInfo | undefined,
    dekningsgrad: Dekningsgrad
): MorFarAnnenForelderHarRettIEØSFormData => {
    if (lagretUttaksplanInfo) {
        return {
            ...lagretUttaksplanInfo,
            [MorFarAnnenForelderHarRettIEØSFormField.dekningsgrad]: dekningsgrad,
            [MorFarAnnenForelderHarRettIEØSFormField.startdatoAdopsjonValg]: finnEnum(
                lagretUttaksplanInfo.startdatoAdopsjonValg
            ),
        };
    }
    return initialMorFarAnnenForelderHarRettIEØSValues;
};
