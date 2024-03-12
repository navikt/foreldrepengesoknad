import { YesOrNo, getTypedFormComponents } from '@navikt/fp-formik';

import AdopsjonStartdatoValg from './adopsjonStartdatoValg';

export enum MorFarAdopsjonFormField {
    harAnnenForelderSøktFP = 'harAnnenForelderSøktFP',
    startdatoAdopsjonValg = 'startdatoAdopsjonValg',
    annenStartdatoAdopsjon = 'annenStartdatoAdopsjon',
    annenForeldersSisteDag = 'annenForeldersSisteDag',
    søkersFørsteDag = 'søkersFørsteDag',
    antallUkerFellesperiode = 'antallUkerFellesperiode',
    antallDagerFellesperiode = 'antallDagerFellesperiode',
    fellesperiodeukerMor = 'fellesperiodeukerMor',
}

export interface MorFarAdopsjonFormData {
    [MorFarAdopsjonFormField.harAnnenForelderSøktFP]: YesOrNo;
    [MorFarAdopsjonFormField.startdatoAdopsjonValg]: AdopsjonStartdatoValg | undefined;
    [MorFarAdopsjonFormField.annenStartdatoAdopsjon]: string;
    [MorFarAdopsjonFormField.annenForeldersSisteDag]: string;
    [MorFarAdopsjonFormField.søkersFørsteDag]: string;
    [MorFarAdopsjonFormField.antallUkerFellesperiode]: string;
    [MorFarAdopsjonFormField.antallDagerFellesperiode]: string;
    [MorFarAdopsjonFormField.fellesperiodeukerMor]: number | undefined;
}

export const MorFarAdopsjonFormComponents = getTypedFormComponents<MorFarAdopsjonFormField, MorFarAdopsjonFormData>();
