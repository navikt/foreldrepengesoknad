import { dateToISOString } from '@navikt/sif-common-formik/lib';
import { MorFødselUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { MorFødselFormData, MorFødselFormField } from './morFødselFormConfig';

const initialMorFødselValues: MorFødselFormData = {
    [MorFødselFormField.dekningsgrad]: '',
    [MorFødselFormField.permisjonStartdato]: '',
    [MorFødselFormField.skalIkkeHaUttakFørTermin]: false,
    [MorFødselFormField.fellesperiodeukerMor]: undefined,
};

export const getInitialMorFødselValues = (
    defaultPermisjonStartdato: Date,
    lagretUttaksplanInfo?: MorFødselUttaksplanInfo
): MorFødselFormData => {
    if (lagretUttaksplanInfo) {
        return {
            ...lagretUttaksplanInfo,
            [MorFødselFormField.dekningsgrad]: lagretUttaksplanInfo.dekningsgrad.toString(),
        };
    }

    return {
        ...initialMorFødselValues,
        [MorFødselFormField.permisjonStartdato]: dateToISOString(defaultPermisjonStartdato),
    };
};
