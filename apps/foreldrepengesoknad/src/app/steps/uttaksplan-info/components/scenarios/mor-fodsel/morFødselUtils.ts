import { MorFødselUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { MorFødselFormData, MorFødselFormField } from './morFødselFormConfig';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { Dekningsgrad } from '@navikt/fp-common';

const initialMorFødselValues: MorFødselFormData = {
    [MorFødselFormField.dekningsgrad]: '',
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
    dekningsgrad?: Dekningsgrad,
): MorFødselFormData => {
    if (lagretUttaksplanInfo) {
        return {
            ...lagretUttaksplanInfo,
            [MorFødselFormField.dekningsgrad]: dekningsgrad!,
        };
    }

    return {
        ...initialMorFødselValues,
        [MorFødselFormField.permisjonStartdato]: dateToISOString(defaultPermisjonStartdato),
    };
};
