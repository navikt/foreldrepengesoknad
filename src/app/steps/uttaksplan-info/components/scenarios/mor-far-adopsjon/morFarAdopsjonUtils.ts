import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { MorFarAdopsjonUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { finnEnum } from './adopsjonStartdatoValg';
import { MorFarAdopsjonFormData, MorFarAdopsjonFormField } from './morFarAdopsjonFormConfig';

const initialMorFarAdopsjonValues: MorFarAdopsjonFormData = {
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

export const mapMorFarAdopsjonFormToState = (values: Partial<MorFarAdopsjonFormData>): MorFarAdopsjonUttaksplanInfo => {
    return {
        dekningsgrad:
            values.dekningsgrad! === Dekningsgrad.HUNDRE_PROSENT
                ? Dekningsgrad.HUNDRE_PROSENT
                : Dekningsgrad.ÅTTI_PROSENT,
        harAnnenForelderSøktFP: values.harAnnenForelderSøktFP!,
        startdatoAdopsjonValg: values.startdatoAdopsjonValg!,
        annenStartdatoAdopsjon: values.annenStartdatoAdopsjon!,
        morsSisteDag: values.morsSisteDag!,
        farMedmorsFørsteDag: values.farMedmorsFørsteDag!,
        antallUkerFellesperiode: values.antallUkerFellesperiode!,
        antallDagerFellesperiode: values.antallDagerFellesperiode!,
        fellesperiodeukerMor: values.fellesperiodeukerMor,
    };
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

    return initialMorFarAdopsjonValues;
};
