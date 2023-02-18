import { BostedUtland } from './bostedUtlandListAndDialog/types';
import { YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik/lib';

export enum UtenlandsoppholdFieldNames {
    harBoddINorgeSiste12Mnd = 'harBoddINorgeSiste12Mnd',
    utenlandsoppholdSiste12Mnd = 'utenlandsoppholdSiste12Mnd',
    skalBoINorgeNeste12Mnd = 'skalBoINorgeNeste12Mnd',
    utenlandsoppholdNeste12Mnd = 'utenlandsoppholdNeste12Mnd',
}

export interface UtenlandsoppholdFormData {
    [UtenlandsoppholdFieldNames.harBoddINorgeSiste12Mnd]: YesOrNo;
    [UtenlandsoppholdFieldNames.utenlandsoppholdSiste12Mnd]: BostedUtland[];
    [UtenlandsoppholdFieldNames.skalBoINorgeNeste12Mnd]: YesOrNo;
    [UtenlandsoppholdFieldNames.utenlandsoppholdNeste12Mnd]: BostedUtland[];
}

export const initialUtenlandsoppholdFormData: UtenlandsoppholdFormData = {
    [UtenlandsoppholdFieldNames.harBoddINorgeSiste12Mnd]: YesOrNo.UNANSWERED,
    [UtenlandsoppholdFieldNames.utenlandsoppholdSiste12Mnd]: [],
    [UtenlandsoppholdFieldNames.skalBoINorgeNeste12Mnd]: YesOrNo.UNANSWERED,
    [UtenlandsoppholdFieldNames.utenlandsoppholdNeste12Mnd]: [],
};

export const UtenlandsoppholdFormComponents = getTypedFormComponents<
    UtenlandsoppholdFieldNames,
    UtenlandsoppholdFormData,
    string
>();
