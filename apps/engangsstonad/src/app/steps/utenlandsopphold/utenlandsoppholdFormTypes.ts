import { BostedUtland } from './bostedUtlandListAndDialog/types';
import { YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export const enum UtenlandsoppholdFieldNames {
    harBoddUtenforNorgeSiste12Mnd = 'harBoddUtenforNorgeSiste12Mnd',
    utenlandsoppholdSiste12Mnd = 'utenlandsoppholdSiste12Mnd',
    skalBoUtenforNorgeNeste12Mnd = 'skalBoUtenforNorgeNeste12Mnd',
    utenlandsoppholdNeste12Mnd = 'utenlandsoppholdNeste12Mnd',
}

export interface UtenlandsoppholdFormData {
    [UtenlandsoppholdFieldNames.harBoddUtenforNorgeSiste12Mnd]: YesOrNo;
    [UtenlandsoppholdFieldNames.utenlandsoppholdSiste12Mnd]: BostedUtland[];
    [UtenlandsoppholdFieldNames.skalBoUtenforNorgeNeste12Mnd]: YesOrNo;
    [UtenlandsoppholdFieldNames.utenlandsoppholdNeste12Mnd]: BostedUtland[];
}

export const initialUtenlandsoppholdFormData: UtenlandsoppholdFormData = {
    [UtenlandsoppholdFieldNames.harBoddUtenforNorgeSiste12Mnd]: YesOrNo.UNANSWERED,
    [UtenlandsoppholdFieldNames.utenlandsoppholdSiste12Mnd]: [],
    [UtenlandsoppholdFieldNames.skalBoUtenforNorgeNeste12Mnd]: YesOrNo.UNANSWERED,
    [UtenlandsoppholdFieldNames.utenlandsoppholdNeste12Mnd]: [],
};

export const UtenlandsoppholdFormComponents = getTypedFormComponents<
    UtenlandsoppholdFieldNames,
    UtenlandsoppholdFormData
>();
