import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';

export enum FarMedmorFødselBeggeHarRettFormField {
    dekningsgrad = 'dekningsgrad',
    morsSisteDag = 'morsSisteDag',
    farMedmorsFørsteDag = 'farMedmorsFørsteDag',
    antallUkerFellesperiode = 'antallUkerFellesperiode',
    antallDagerFellesperiode = 'antallDagerFellesperiode',
}

export interface FarMedmorFødselBeggeHarRettFormData {
    [FarMedmorFødselBeggeHarRettFormField.dekningsgrad]: string;
    [FarMedmorFødselBeggeHarRettFormField.morsSisteDag]: string;
    [FarMedmorFødselBeggeHarRettFormField.farMedmorsFørsteDag]: string;
    [FarMedmorFødselBeggeHarRettFormField.antallUkerFellesperiode]: string;
    [FarMedmorFødselBeggeHarRettFormField.antallDagerFellesperiode]: string;
}

export const FarMedmorFødselBeggeHarRettFormComponents = getTypedFormComponents<
    FarMedmorFødselBeggeHarRettFormField,
    FarMedmorFødselBeggeHarRettFormData,
    string
>();
