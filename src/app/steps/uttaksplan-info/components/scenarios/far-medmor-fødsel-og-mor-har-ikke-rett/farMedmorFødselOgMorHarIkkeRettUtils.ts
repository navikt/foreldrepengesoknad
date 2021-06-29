import { FarMedmorFødselOgMorHarIkkeRettUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import {
    FarMedmorFødselOgMorHarIkkeRettFormData,
    FarMedmorFødselOgMorHarIkkeRettFormField,
} from './farMedmorFødselOgMorHarIkkeRettFormConfig';

const initialFarMedmorFødselOgMorHarIkkeRettValues: FarMedmorFødselOgMorHarIkkeRettFormData = {
    [FarMedmorFødselOgMorHarIkkeRettFormField.dekningsgrad]: '',
    [FarMedmorFødselOgMorHarIkkeRettFormField.permisjonStartdato]: '',
};

export const mapFarMedmorFødselOgMorHarIkkeRettFormToState = (
    values: Partial<FarMedmorFødselOgMorHarIkkeRettFormData>
): FarMedmorFødselOgMorHarIkkeRettUttaksplanInfo => {
    return {
        dekningsgrad:
            values.dekningsgrad! === Dekningsgrad.HUNDRE_PROSENT
                ? Dekningsgrad.HUNDRE_PROSENT
                : Dekningsgrad.ÅTTI_PROSENT,
        permisjonStartdato: values.permisjonStartdato!,
    };
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
