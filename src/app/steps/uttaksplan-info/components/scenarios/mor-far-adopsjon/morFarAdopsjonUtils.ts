import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { MorFarAdopsjonFormData, MorFarAdopsjonFormField } from './morFarAdopsjonFormConfig';

const initialMorFødselValues: MorFarAdopsjonFormData = {
    [MorFarAdopsjonFormField.harAnnenForelderSøktFP]: YesOrNo.UNANSWERED,
    [MorFarAdopsjonFormField.dekningsgrad]: '',
    [MorFarAdopsjonFormField.startdatoAdopsjon]: '',
    [MorFarAdopsjonFormField.annenStartdatoAdopsjon]: '',
    [MorFarAdopsjonFormField.morsSisteDag]: '',
    [MorFarAdopsjonFormField.farMedmorsFørsteDag]: '',
    [MorFarAdopsjonFormField.antallUkerFellesperiode]: '',
    [MorFarAdopsjonFormField.antallDagerFellesperiode]: '',
    [MorFarAdopsjonFormField.fellesperiodeukerMor]: undefined,
};

export const getInitialMorFarAdopsjonValues = (): MorFarAdopsjonFormData => {
    return initialMorFødselValues;
};
