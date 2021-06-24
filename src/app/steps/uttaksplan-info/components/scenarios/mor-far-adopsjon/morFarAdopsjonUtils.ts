import { YesOrNo } from '@navikt/sif-common-formik/lib';
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

export const getInitialMorFarAdopsjonValues = (): MorFarAdopsjonFormData => {
    return initialMorFødselValues;
};
