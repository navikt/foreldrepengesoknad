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

export const getInitialFarMedmorFødselBeggeHarRettValues = (): FarMedmorFødselBeggeHarRettFormData => {
    return initialFarMedmorFødselBeggeHarRettValues;
};
