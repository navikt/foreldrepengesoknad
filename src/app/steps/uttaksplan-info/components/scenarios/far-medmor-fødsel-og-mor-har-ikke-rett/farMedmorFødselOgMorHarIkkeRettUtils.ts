import { FarMedmorFødselOgMorHarIkkeRettUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import {
    FarMedmorFødselOgMorHarIkkeRettFormData,
    FarMedmorFødselOgMorHarIkkeRettFormField,
} from './farMedmorFødselOgMorHarIkkeRettFormConfig';

const initialFarMedmorFødselOgMorHarIkkeRettValues: FarMedmorFødselOgMorHarIkkeRettFormData = {
    [FarMedmorFødselOgMorHarIkkeRettFormField.dekningsgrad]: '',
    [FarMedmorFødselOgMorHarIkkeRettFormField.permisjonStartdato]: '',
};

export const getInitialFarMedmorFødselOgMorHarIkkeRettValues = (
    lagretUttaksplanInfo?: FarMedmorFødselOgMorHarIkkeRettUttaksplanInfo
): FarMedmorFødselOgMorHarIkkeRettFormData => {
    if (lagretUttaksplanInfo) {
        return {
            ...lagretUttaksplanInfo,
            [FarMedmorFødselOgMorHarIkkeRettFormField.dekningsgrad]: lagretUttaksplanInfo.dekningsgrad.toString(),
        };
    }

    return initialFarMedmorFødselOgMorHarIkkeRettValues;
};
