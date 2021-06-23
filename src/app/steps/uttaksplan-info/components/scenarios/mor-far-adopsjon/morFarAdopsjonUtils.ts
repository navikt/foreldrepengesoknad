import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { MorFarAdopsjonFormData, MorFarAdopsjonFormField } from './morFarAdopsjonFormConfig';

const initialMorFødselValues: MorFarAdopsjonFormData = {
    [MorFarAdopsjonFormField.harAnnenForelderSøktFP]: YesOrNo.UNANSWERED,
};

export const getInitialMorFarAdopsjonValues = (): MorFarAdopsjonFormData => {
    return initialMorFødselValues;
};
