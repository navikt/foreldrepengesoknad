import { UtenlandsoppholdFormData } from './utenlandsoppholdFormTypes';
import { YesOrNo } from '@navikt/sif-common-formik/lib';

export const utenlandsoppholdFormCleanup = (formValues: UtenlandsoppholdFormData): UtenlandsoppholdFormData => {
    const {
        harBoddUtenforNorgeSiste12Mnd,
        skalBoUtenforNorgeNeste12Mnd,
        utenlandsoppholdNeste12Mnd,
        utenlandsoppholdSiste12Mnd,
    } = formValues;

    return {
        harBoddUtenforNorgeSiste12Mnd,
        skalBoUtenforNorgeNeste12Mnd,
        utenlandsoppholdNeste12Mnd: skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES ? utenlandsoppholdNeste12Mnd : [],
        utenlandsoppholdSiste12Mnd: harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES ? utenlandsoppholdSiste12Mnd : [],
    };
};
