import { FarMedmorFødselBeggeHarRettUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import {
    FarMedmorFødselBeggeHarRettFormData,
    FarMedmorFødselBeggeHarRettFormField,
} from './farMedmorFødselBeggeHarRettFormConfig';
import { Dekningsgrad } from '@navikt/fp-common';

const initialFarMedmorFødselBeggeHarRettValues: FarMedmorFødselBeggeHarRettFormData = {
    [FarMedmorFødselBeggeHarRettFormField.dekningsgrad]: '',
    [FarMedmorFødselBeggeHarRettFormField.morsSisteDag]: '',
    [FarMedmorFødselBeggeHarRettFormField.farMedmorsFørsteDag]: '',
    [FarMedmorFødselBeggeHarRettFormField.antallUkerFellesperiode]: '0',
    [FarMedmorFødselBeggeHarRettFormField.antallDagerFellesperiode]: '0',
};

export const mapFarMedmorFødselBeggeHarRettToState = (
    values: Partial<FarMedmorFødselBeggeHarRettFormData>,
): FarMedmorFødselBeggeHarRettUttaksplanInfo => {
    return {
        antallDagerFellesperiode:
            values.antallDagerFellesperiode === undefined || values.antallDagerFellesperiode.trim().length === 0
                ? '0'
                : values.antallDagerFellesperiode,
        antallUkerFellesperiode:
            values.antallUkerFellesperiode === undefined || values.antallUkerFellesperiode.trim().length === 0
                ? '0'
                : values.antallUkerFellesperiode,
        farMedmorsFørsteDag: values.farMedmorsFørsteDag!,
        morsSisteDag: values.morsSisteDag!,
    };
};

export const getInitialFarMedmorFødselBeggeHarRettValues = (
    state: FarMedmorFødselBeggeHarRettUttaksplanInfo | undefined,
    dekningsgrad: Dekningsgrad,
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
