import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';

export enum MorFarAdopsjonFormField {
    harAnnenForelderSøktFP = 'harAnnenForelderSøktFP',
    dekningsgrad = 'dekningsgrad',
    startdatoAdopsjon = 'startdatoAdopsjon',
    annenStartdatoAdopsjon = 'annenStartdatoAdopsjon',
    morsSisteDag = 'morsSisteDag',
    farMedmorsFørsteDag = 'farMedmorsFørsteDag',
    antallUkerFellesperiode = 'antallUkerFellesperiode',
    antallDagerFellesperiode = 'antallDagerFellesperiode',
    fellesperiodeukerMor = 'fellesperiodeukerMor',
}

export interface MorFarAdopsjonFormData {
    [MorFarAdopsjonFormField.harAnnenForelderSøktFP]: YesOrNo;
    [MorFarAdopsjonFormField.dekningsgrad]: string;
    [MorFarAdopsjonFormField.startdatoAdopsjon]: string;
    [MorFarAdopsjonFormField.annenStartdatoAdopsjon]: string;
    [MorFarAdopsjonFormField.morsSisteDag]: string;
    [MorFarAdopsjonFormField.farMedmorsFørsteDag]: string;
    [MorFarAdopsjonFormField.antallUkerFellesperiode]: string;
    [MorFarAdopsjonFormField.antallDagerFellesperiode]: string;
    [MorFarAdopsjonFormField.fellesperiodeukerMor]: number | undefined;
}

export const MorFarAdopsjonFormComponents = getTypedFormComponents<
    MorFarAdopsjonFormField,
    MorFarAdopsjonFormData,
    string
>();
