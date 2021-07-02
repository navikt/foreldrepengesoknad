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
    familiehendelsesdato: string
): FarMedmorAleneomsorgFødselUttaksplanInfo => {
    return {
        fellesperiodeukerMor: undefined,
        startdatoUttak:
            values.startPåOmsorgsovertakelse === YesOrNo.YES ? familiehendelsesdato : values.startdatoUttak!,
    };
};

export const getInitialFarMedmorAleneomsorgFødselValues = (
    lagretUttaksplanInfo: FarMedmorAleneomsorgFødselUttaksplanInfo | undefined,
    familiehendelsesdato: string,
    dekningsgrad: Dekningsgrad
): FarMedmorAleneomsorgFødselFormData => {
    if (lagretUttaksplanInfo) {
        const startetPåOmsorgsovertakelse = dayjs(lagretUttaksplanInfo.startdatoUttak).isSame(
            dayjs(familiehendelsesdato)
        );

        return {
            dekningsgrad,
            startPåOmsorgsovertakelse: startetPåOmsorgsovertakelse ? YesOrNo.YES : YesOrNo.NO,
            startdatoUttak: startetPåOmsorgsovertakelse ? '' : lagretUttaksplanInfo.startdatoUttak,
        };
    }

    return initialFarMedmorAleneomsorgFødselValues;
};
