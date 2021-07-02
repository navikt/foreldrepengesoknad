import { dateToISOString } from '@navikt/sif-common-formik/lib';
import { MorFødselUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { MorFødselFormData, MorFødselFormField } from './morFødselFormConfig';

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
    dekningsgrad: Dekningsgrad
): MorFødselFormData => {
    if (lagretUttaksplanInfo) {
        return {
            ...lagretUttaksplanInfo,
            [MorFødselFormField.dekningsgrad]: dekningsgrad,
        };
    }

    return {
        ...initialMorFødselValues,
        [MorFødselFormField.permisjonStartdato]: dateToISOString(defaultPermisjonStartdato),
    };
};
