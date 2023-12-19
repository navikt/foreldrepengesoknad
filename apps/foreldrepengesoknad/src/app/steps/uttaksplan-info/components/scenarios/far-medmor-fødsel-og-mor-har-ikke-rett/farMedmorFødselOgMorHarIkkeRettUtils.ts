import { FarMedmorFødselOgMorHarIkkeRettUttaksplanInfo } from 'app/context/types/UttaksplanInfo';

import {
    FarMedmorFødselOgMorHarIkkeRettFormData,
    FarMedmorFødselOgMorHarIkkeRettFormField,
} from './farMedmorFødselOgMorHarIkkeRettFormConfig';

const initialFarMedmorFødselOgMorHarIkkeRettValues: FarMedmorFødselOgMorHarIkkeRettFormData = {
    [FarMedmorFødselOgMorHarIkkeRettFormField.permisjonStartdato]: '',
};

export const mapFarMedmorFødselOgMorHarIkkeRettFormToState = (
    values: Partial<FarMedmorFødselOgMorHarIkkeRettFormData>,
): FarMedmorFødselOgMorHarIkkeRettUttaksplanInfo => {
    return {
        permisjonStartdato: values.permisjonStartdato!,
    };
};

export const getInitialFarMedmorFødselOgMorHarIkkeRettValues = (
    lagretUttaksplanInfo: FarMedmorFødselOgMorHarIkkeRettUttaksplanInfo | undefined,
): FarMedmorFødselOgMorHarIkkeRettFormData => {
    if (lagretUttaksplanInfo) {
        return {
            ...lagretUttaksplanInfo,
        };
    }

    return initialFarMedmorFødselOgMorHarIkkeRettValues;
};
