import { FarMedmorFørstegangssøknadMedAnnenPartUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { FarMedmorFørstegangssøknadMedAnnenPartFormData } from './farMedmorFørstegangssøknadMedAnnenPartFormConfig';

export const getFarMedmorFørstegangssøknadMedAnnenPartInitialValues = (
    state: FarMedmorFørstegangssøknadMedAnnenPartUttaksplanInfo | undefined
): FarMedmorFørstegangssøknadMedAnnenPartFormData => {
    if (!state) {
        return {
            permisjonStartdato: '',
        };
    }

    return {
        permisjonStartdato: state.permisjonStartdato,
    };
};
