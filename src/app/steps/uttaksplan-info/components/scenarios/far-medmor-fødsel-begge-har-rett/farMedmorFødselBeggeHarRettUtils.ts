import { FarMedmorFødselBeggeHarRettUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import {
    FarMedmorFødselBeggeHarRettFormData,
    FarMedmorFødselBeggeHarRettFormField,
} from './farMedmorFødselBeggeHarRettFormConfig';

const initialFarMedmorFødselBeggeHarRettValues: FarMedmorFødselBeggeHarRettFormData = {
    [FarMedmorFødselBeggeHarRettFormField.dekningsgrad]: '',
    [FarMedmorFødselBeggeHarRettFormField.morsSisteDag]: '',
    [FarMedmorFødselBeggeHarRettFormField.farMedmorsFørsteDag]: '',
    [FarMedmorFødselBeggeHarRettFormField.antallUkerFellesperiode]: '0',
    [FarMedmorFødselBeggeHarRettFormField.antallDagerFellesperiode]: '0',
};

export const mapFarMedmorFødselBeggeHarRettToState = (
    values: Partial<FarMedmorFødselBeggeHarRettFormData>
): FarMedmorFødselBeggeHarRettUttaksplanInfo => {
    return {
        antallDagerFellesperiode: values.antallDagerFellesperiode!,
        antallUkerFellesperiode: values.antallUkerFellesperiode!,
        farMedmorsFørsteDag: values.farMedmorsFørsteDag!,
        morsSisteDag: values.morsSisteDag!,
    };
};

export const getInitialFarMedmorFødselBeggeHarRettValues = (
    state: FarMedmorFødselBeggeHarRettUttaksplanInfo | undefined,
    dekningsgrad: Dekningsgrad
): FarMedmorFødselBeggeHarRettFormData => {
    if (!state) {
        return initialFarMedmorFødselBeggeHarRettValues;
    }

    return {
        ...initialFarMedmorFødselBeggeHarRettValues,
        antallDagerFellesperiode: state.antallDagerFellesperiode,
        antallUkerFellesperiode: state.antallUkerFellesperiode,
        morsSisteDag: state.morsSisteDag,
        farMedmorsFørsteDag: state.farMedmorsFørsteDag,
        dekningsgrad,
    };
};
