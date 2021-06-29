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
        dekningsgrad:
            values.dekningsgrad! === Dekningsgrad.HUNDRE_PROSENT
                ? Dekningsgrad.HUNDRE_PROSENT
                : Dekningsgrad.ÅTTI_PROSENT,
        permisjonStartdato: values.permisjonStartdato!,
        skalIkkeHaUttakFørTermin: values.skalIkkeHaUttakFørTermin!,
        fellesperiodeukerMor: values.fellesperiodeukerMor,
    };
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
