import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { MorFarAdopsjonUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import { assertUnreachable } from 'app/utils/globalUtil';
import AdopsjonStartdatoValg, { finnEnum } from './adopsjonStartdatoValg';
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

export const getValgtStartdatoForAdopsjon = (adopsjonStartdatoValg: AdopsjonStartdatoValg) => {
    switch (adopsjonStartdatoValg) {
        case AdopsjonStartdatoValg.ANKOMST:
            return '';
        case AdopsjonStartdatoValg.OMSORGSOVERTAKELSE:
            return '';
        case AdopsjonStartdatoValg.ANNEN:
            return '';
        default:
            return assertUnreachable(adopsjonStartdatoValg, 'Startdato for adopsjon er ikke valgt');
    }
};

export const mapMorFarAdopsjonFormToState = (values: Partial<MorFarAdopsjonFormData>): MorFarAdopsjonUttaksplanInfo => {
    return {
        harAnnenForelderSøktFP: convertYesOrNoOrUndefinedToBoolean(values.harAnnenForelderSøktFP)!,
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
    lagretUttaksplanInfo: MorFarAdopsjonUttaksplanInfo | undefined,
    dekningsgrad: Dekningsgrad
): MorFarAdopsjonFormData => {
    if (lagretUttaksplanInfo) {
        return {
            ...lagretUttaksplanInfo,
            [MorFarAdopsjonFormField.dekningsgrad]: dekningsgrad,
            [MorFarAdopsjonFormField.startdatoAdopsjonValg]: finnEnum(lagretUttaksplanInfo.startdatoAdopsjonValg),
            [MorFarAdopsjonFormField.harAnnenForelderSøktFP]: lagretUttaksplanInfo.harAnnenForelderSøktFP
                ? YesOrNo.YES
                : YesOrNo.NO,
        };
    }

    return initialMorFarAdopsjonValues;
};
