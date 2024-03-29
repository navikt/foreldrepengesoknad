import { getTypedFormComponents } from '@navikt/fp-formik';

export enum FarMedmorFødselBeggeHarRettFormField {
    morsSisteDag = 'morsSisteDag',
    farMedmorsFørsteDag = 'farMedmorsFørsteDag',
    antallUkerFellesperiode = 'antallUkerFellesperiode',
    antallDagerFellesperiode = 'antallDagerFellesperiode',
}

export interface FarMedmorFødselBeggeHarRettFormData {
    [FarMedmorFødselBeggeHarRettFormField.morsSisteDag]: string;
    [FarMedmorFødselBeggeHarRettFormField.farMedmorsFørsteDag]: string;
    [FarMedmorFødselBeggeHarRettFormField.antallUkerFellesperiode]: string;
    [FarMedmorFødselBeggeHarRettFormField.antallDagerFellesperiode]: string;
}

export const FarMedmorFødselBeggeHarRettFormComponents = getTypedFormComponents<
    FarMedmorFødselBeggeHarRettFormField,
    FarMedmorFødselBeggeHarRettFormData
>();
