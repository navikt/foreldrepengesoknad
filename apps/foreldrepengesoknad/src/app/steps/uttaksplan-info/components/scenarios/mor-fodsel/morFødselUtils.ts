import { dateToISOString } from '@navikt/fp-formik';

import { MorFødselUttaksplanInfo } from 'app/context/types/UttaksplanInfo';

import { MorFødselFormData, MorFødselFormField } from './morFødselFormConfig';

const initialMorFødselValues: MorFødselFormData = {
    [MorFødselFormField.permisjonStartdato]: '',
    [MorFødselFormField.skalIkkeHaUttakFørTermin]: false,
    [MorFødselFormField.fellesperiodeukerMor]: undefined,
};

export const mapMorFødselFormToState = (values: Partial<MorFødselFormData>): MorFødselUttaksplanInfo => {
    return {
        permisjonStartdato: values.permisjonStartdato!,
        skalIkkeHaUttakFørTermin: values.skalIkkeHaUttakFørTermin!,
        fellesperiodeukerMor: values.fellesperiodeukerMor,
    };
};

export const getInitialMorFødselValues = (
    defaultPermisjonStartdato: Date,
    lagretUttaksplanInfo: MorFødselUttaksplanInfo | undefined,
): MorFødselFormData => {
    if (lagretUttaksplanInfo) {
        return {
            ...lagretUttaksplanInfo,
        };
    }

    return {
        ...initialMorFødselValues,
        [MorFødselFormField.permisjonStartdato]: dateToISOString(defaultPermisjonStartdato),
    };
};
