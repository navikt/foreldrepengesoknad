import { FarMedmorAleneomsorgFødselUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import dayjs from 'dayjs';
import {
    FarMedmorAleneomsorgFødselFormData,
    FarMedmorAleneomsorgFødselFormField,
} from './farMedmorAleneomsorgFødselFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { Dekningsgrad } from '@navikt/fp-common';

const initialFarMedmorAleneomsorgFødselValues: FarMedmorAleneomsorgFødselFormData = {
    [FarMedmorAleneomsorgFødselFormField.dekningsgrad]: '',
    [FarMedmorAleneomsorgFødselFormField.startPåOmsorgsovertakelse]: YesOrNo.UNANSWERED,
    [FarMedmorAleneomsorgFødselFormField.startdatoUttak]: '',
};

export const mapFarMedmorAleneomsorgFødselFormToState = (
    values: Partial<FarMedmorAleneomsorgFødselFormData>,
    datoForAleneomsorg: string,
): FarMedmorAleneomsorgFødselUttaksplanInfo => {
    return {
        fellesperiodeukerMor: undefined,
        startdatoUttak: values.startPåOmsorgsovertakelse === YesOrNo.YES ? datoForAleneomsorg : values.startdatoUttak!,
    };
};

export const getInitialFarMedmorAleneomsorgFødselValues = (
    lagretUttaksplanInfo: FarMedmorAleneomsorgFødselUttaksplanInfo | undefined,
    datoForAleneomsorg: string,
    dekningsgrad?: Dekningsgrad,
): FarMedmorAleneomsorgFødselFormData => {
    if (lagretUttaksplanInfo && dekningsgrad) {
        const startetPåOmsorgsovertakelse = dayjs(lagretUttaksplanInfo.startdatoUttak).isSame(
            dayjs(datoForAleneomsorg),
            'day',
        );

        return {
            dekningsgrad,
            startPåOmsorgsovertakelse: startetPåOmsorgsovertakelse ? YesOrNo.YES : YesOrNo.NO,
            startdatoUttak: startetPåOmsorgsovertakelse ? '' : lagretUttaksplanInfo.startdatoUttak,
        };
    }

    return initialFarMedmorAleneomsorgFødselValues;
};
