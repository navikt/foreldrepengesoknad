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
        permisjonStartdato: values.permisjonStartdato!,
    };
};

export const getInitialFarMedmorFødselOgMorHarIkkeRettValues = (
    dekningsgrad: Dekningsgrad,
    lagretUttaksplanInfo: FarMedmorFødselOgMorHarIkkeRettUttaksplanInfo | undefined
): FarMedmorFødselOgMorHarIkkeRettFormData => {
    if (lagretUttaksplanInfo) {
        return {
            ...lagretUttaksplanInfo,
            [FarMedmorFødselOgMorHarIkkeRettFormField.dekningsgrad]: dekningsgrad,
        };
    }

    return initialFarMedmorFødselOgMorHarIkkeRettValues;
};
