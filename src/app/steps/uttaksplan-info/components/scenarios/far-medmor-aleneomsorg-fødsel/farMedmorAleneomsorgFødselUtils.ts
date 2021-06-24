import { YesOrNo } from '@navikt/sif-common-formik/lib';
import {
    FarMedmorAleneomsorgFødselFormData,
    FarMedmorAleneomsorgFødselFormField,
} from './farMedmorAleneomsorgFødselFormConfig';

const initialFarMedmorAleneomsorgFødselValues: FarMedmorAleneomsorgFødselFormData = {
    [FarMedmorAleneomsorgFødselFormField.dekningsgrad]: '',
    [FarMedmorAleneomsorgFødselFormField.startPåOmsorgsovertakelse]: YesOrNo.UNANSWERED,
    [FarMedmorAleneomsorgFødselFormField.startdatoUttak]: '',
};

export const getInitialFarMedmorAleneomsorgFødselValues = (): FarMedmorAleneomsorgFødselFormData => {
    return initialFarMedmorAleneomsorgFødselValues;
};
