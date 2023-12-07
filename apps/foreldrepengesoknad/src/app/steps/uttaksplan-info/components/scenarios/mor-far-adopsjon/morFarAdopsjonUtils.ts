import { MorFarAdopsjonUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { finnEnum } from './adopsjonStartdatoValg';
import { MorFarAdopsjonFormData, MorFarAdopsjonFormField } from './morFarAdopsjonFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { Dekningsgrad, convertYesOrNoOrUndefinedToBoolean } from '@navikt/fp-common';

const initialMorFarAdopsjonValues: MorFarAdopsjonFormData = {
    [MorFarAdopsjonFormField.harAnnenForelderSøktFP]: YesOrNo.UNANSWERED,
    [MorFarAdopsjonFormField.dekningsgrad]: '',
    [MorFarAdopsjonFormField.startdatoAdopsjonValg]: undefined,
    [MorFarAdopsjonFormField.annenStartdatoAdopsjon]: '',
    [MorFarAdopsjonFormField.annenForeldersSisteDag]: '',
    [MorFarAdopsjonFormField.søkersFørsteDag]: '',
    [MorFarAdopsjonFormField.antallUkerFellesperiode]: '0',
    [MorFarAdopsjonFormField.antallDagerFellesperiode]: '0',
    [MorFarAdopsjonFormField.fellesperiodeukerMor]: undefined,
};

export const mapMorFarAdopsjonFormToState = (values: Partial<MorFarAdopsjonFormData>): MorFarAdopsjonUttaksplanInfo => {
    return {
        harAnnenForelderSøktFP: convertYesOrNoOrUndefinedToBoolean(values.harAnnenForelderSøktFP)!,
        startdatoAdopsjonValg: values.startdatoAdopsjonValg!,
        annenStartdatoAdopsjon: values.annenStartdatoAdopsjon!,
        annenForeldersSisteDag: values.annenForeldersSisteDag!,
        søkersFørsteDag: values.søkersFørsteDag!,
        antallUkerFellesperiode: values.antallUkerFellesperiode!,
        antallDagerFellesperiode: values.antallDagerFellesperiode!,
        fellesperiodeukerMor: values.fellesperiodeukerMor,
    };
};

export const getInitialMorFarAdopsjonValues = (
    lagretUttaksplanInfo: MorFarAdopsjonUttaksplanInfo | undefined,
    dekningsgrad?: Dekningsgrad,
): MorFarAdopsjonFormData => {
    if (lagretUttaksplanInfo) {
        return {
            ...lagretUttaksplanInfo,
            [MorFarAdopsjonFormField.dekningsgrad]: dekningsgrad!,
            [MorFarAdopsjonFormField.startdatoAdopsjonValg]: finnEnum(lagretUttaksplanInfo.startdatoAdopsjonValg),
            [MorFarAdopsjonFormField.harAnnenForelderSøktFP]: lagretUttaksplanInfo.harAnnenForelderSøktFP
                ? YesOrNo.YES
                : YesOrNo.NO,
        };
    }

    return initialMorFarAdopsjonValues;
};
