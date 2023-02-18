import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { FarMedmorAleneomsorgFødselUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import dayjs from 'dayjs';
import {
    FarMedmorAleneomsorgFødselFormData,
    FarMedmorAleneomsorgFødselFormField,
} from './farMedmorAleneomsorgFødselFormConfig';

const initialFarMedmorAleneomsorgFødselValues: FarMedmorAleneomsorgFødselFormData = {
    [FarMedmorAleneomsorgFødselFormField.dekningsgrad]: '',
    [FarMedmorAleneomsorgFødselFormField.startPåOmsorgsovertakelse]: YesOrNo.UNANSWERED,
    [FarMedmorAleneomsorgFødselFormField.startdatoUttak]: '',
};

export const mapFarMedmorAleneomsorgFødselFormToState = (
    values: Partial<FarMedmorAleneomsorgFødselFormData>,
    datoForAleneomsorg: string
): FarMedmorAleneomsorgFødselUttaksplanInfo => {
    return {
        fellesperiodeukerMor: undefined,
        startdatoUttak: values.startPåOmsorgsovertakelse === YesOrNo.YES ? datoForAleneomsorg : values.startdatoUttak!,
    };
};

export const getInitialFarMedmorAleneomsorgFødselValues = (
    lagretUttaksplanInfo: FarMedmorAleneomsorgFødselUttaksplanInfo | undefined,
    datoForAleneomsorg: string,
    dekningsgrad: Dekningsgrad
): FarMedmorAleneomsorgFødselFormData => {
    if (lagretUttaksplanInfo) {
        const startetPåOmsorgsovertakelse = dayjs(lagretUttaksplanInfo.startdatoUttak).isSame(
            dayjs(datoForAleneomsorg),
            'day'
        );

        return {
            dekningsgrad,
            startPåOmsorgsovertakelse: startetPåOmsorgsovertakelse ? YesOrNo.YES : YesOrNo.NO,
            startdatoUttak: startetPåOmsorgsovertakelse ? '' : lagretUttaksplanInfo.startdatoUttak,
        };
    }

    return initialFarMedmorAleneomsorgFødselValues;
};
