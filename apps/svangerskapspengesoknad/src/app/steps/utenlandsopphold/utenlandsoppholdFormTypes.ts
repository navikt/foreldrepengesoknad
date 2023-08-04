import { YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum UtenlandsoppholdField {
    harBoddINorgeSiste12Mnd = 'harBoddINorgeSiste12Mnd',
    utenlandsoppholdSiste12Mnd = 'utenlandsoppholdSiste12Mnd',
    skalBoINorgeNeste12Mnd = 'skalBoINorgeNeste12Mnd',
    utenlandsoppholdNeste12Mnd = 'utenlandsoppholdNeste12Mnd',
}

export interface UtenlandsoppholdFormData {
    [UtenlandsoppholdField.harBoddINorgeSiste12Mnd]: YesOrNo;
    [UtenlandsoppholdField.skalBoINorgeNeste12Mnd]: YesOrNo;
}

export const initialUtenlandsoppholdFormData: UtenlandsoppholdFormData = {
    [UtenlandsoppholdField.harBoddINorgeSiste12Mnd]: YesOrNo.UNANSWERED,
    [UtenlandsoppholdField.skalBoINorgeNeste12Mnd]: YesOrNo.UNANSWERED,
};

export const UtenlandsoppholdFormComponents = getTypedFormComponents<UtenlandsoppholdField, UtenlandsoppholdFormData>();
