import {
    FarMedmorFødselBeggeHarRettFormData,
    FarMedmorFødselBeggeHarRettFormField,
} from './farMedmorFødselBeggeHarRettFormConfig';

const initialFarMedmorFødselBeggeHarRettValues: FarMedmorFødselBeggeHarRettFormData = {
    [FarMedmorFødselBeggeHarRettFormField.dekningsgrad]: '',
    [FarMedmorFødselBeggeHarRettFormField.morsSisteDag]: '',
    [FarMedmorFødselBeggeHarRettFormField.farMedmorsFørsteDag]: '',
    [FarMedmorFødselBeggeHarRettFormField.antallUkerFellesperiode]: '',
    [FarMedmorFødselBeggeHarRettFormField.antallDagerFellesperiode]: '',
};

export const getInitialFarMedmorFødselBeggeHarRettValues = (): FarMedmorFødselBeggeHarRettFormData => {
    return initialFarMedmorFødselBeggeHarRettValues;
};
