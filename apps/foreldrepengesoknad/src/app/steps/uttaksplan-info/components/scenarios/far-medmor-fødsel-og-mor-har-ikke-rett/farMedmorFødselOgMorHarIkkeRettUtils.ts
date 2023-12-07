import { FarMedmorFødselOgMorHarIkkeRettUttaksplanInfo } from 'app/context/types/UttaksplanInfo';

import {
    FarMedmorFødselOgMorHarIkkeRettFormData,
    FarMedmorFødselOgMorHarIkkeRettFormField,
} from './farMedmorFødselOgMorHarIkkeRettFormConfig';
import { Dekningsgrad } from '@navikt/fp-common';

const initialFarMedmorFødselOgMorHarIkkeRettValues: FarMedmorFødselOgMorHarIkkeRettFormData = {
    [FarMedmorFødselOgMorHarIkkeRettFormField.dekningsgrad]: '',
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
    dekningsgrad?: Dekningsgrad,
): FarMedmorFødselOgMorHarIkkeRettFormData => {
    if (lagretUttaksplanInfo) {
        return {
            ...lagretUttaksplanInfo,
            [FarMedmorFødselOgMorHarIkkeRettFormField.dekningsgrad]: dekningsgrad!,
        };
    }

    return initialFarMedmorFødselOgMorHarIkkeRettValues;
};
