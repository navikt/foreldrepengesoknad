import { MorFarAdopsjonAnnenForelderHarRettIEØSUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { finnEnum } from '../mor-far-adopsjon/adopsjonStartdatoValg';
import {
    MorFarAdopsjonAnnenForelderHarRettIEØSFormField,
    MorFarAdopsjonAnnenForelderHarRettIEØSFormData,
} from './morFarAdopsjonAnnenForelderHarRettIEØSFormConfig';

const initialMorFarAdopsjonAnnenForelderHarRettIEØSValues: MorFarAdopsjonAnnenForelderHarRettIEØSFormData = {
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.dekningsgrad]: '',
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.startdatoAdopsjonValg]: undefined,
    [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.søkersFørsteDagAdopsjon]: '',
};
export const mapMorFarAdopsjonAnnenForelderHarRettIEØSFormToState = (
    values: Partial<MorFarAdopsjonAnnenForelderHarRettIEØSFormData>
): MorFarAdopsjonAnnenForelderHarRettIEØSUttaksplanInfo => {
    return {
        dekningsgrad: values.dekningsgrad!,
        startdatoAdopsjonValg: values.startdatoAdopsjonValg!,
        søkersFørsteDag: values.søkersFørsteDag!,
    };
};
export const getInitialMorFarAdopsjonAnnenForelderHarRettIEØSValues = (
    lagretUttaksplanInfo: MorFarAdopsjonAnnenForelderHarRettIEØSUttaksplanInfo | undefined,
    dekningsgrad: Dekningsgrad
): MorFarAdopsjonAnnenForelderHarRettIEØSFormData => {
    if (lagretUttaksplanInfo) {
        return {
            ...lagretUttaksplanInfo,
            [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.dekningsgrad]: dekningsgrad,
            [MorFarAdopsjonAnnenForelderHarRettIEØSFormField.startdatoAdopsjonValg]: finnEnum(
                lagretUttaksplanInfo.startdatoAdopsjonValg
            ),
        };
    }
    return initialMorFarAdopsjonAnnenForelderHarRettIEØSValues;
};
