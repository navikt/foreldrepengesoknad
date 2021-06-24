import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { MorFarAdopsjonUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { finnEnum } from './adopsjonStartdatoValg';
import { MorFarAdopsjonFormData, MorFarAdopsjonFormField } from './morFarAdopsjonFormConfig';

const initialMorFødselValues: MorFarAdopsjonFormData = {
    [MorFarAdopsjonFormField.harAnnenForelderSøktFP]: YesOrNo.UNANSWERED,
    [MorFarAdopsjonFormField.dekningsgrad]: '',
    [MorFarAdopsjonFormField.startdatoAdopsjonValg]: undefined,
    [MorFarAdopsjonFormField.annenStartdatoAdopsjon]: '',
    [MorFarAdopsjonFormField.morsSisteDag]: '',
    [MorFarAdopsjonFormField.farMedmorsFørsteDag]: '',
    [MorFarAdopsjonFormField.antallUkerFellesperiode]: '0',
    [MorFarAdopsjonFormField.antallDagerFellesperiode]: '0',
    [MorFarAdopsjonFormField.fellesperiodeukerMor]: undefined,
};

export const getInitialMorFarAdopsjonValues = (
    lagretUttaksplanInfo?: MorFarAdopsjonUttaksplanInfo
): MorFarAdopsjonFormData => {
    if (lagretUttaksplanInfo) {
        return {
            ...lagretUttaksplanInfo,
            [MorFarAdopsjonFormField.dekningsgrad]: lagretUttaksplanInfo.dekningsgrad.toString(),
            [MorFarAdopsjonFormField.startdatoAdopsjonValg]: finnEnum(lagretUttaksplanInfo.startdatoAdopsjonValg),
            [MorFarAdopsjonFormField.harAnnenForelderSøktFP]: lagretUttaksplanInfo.harAnnenForelderSøktFP
                ? YesOrNo.YES
                : YesOrNo.NO,
        };
    }

    return initialMorFødselValues;
};
