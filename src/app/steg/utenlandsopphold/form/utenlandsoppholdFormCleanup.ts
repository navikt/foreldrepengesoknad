import { UtenlandsoppholdFormValues } from './utenlandsoppholdFormTypes';
import { YesOrNo } from '@navikt/sif-common-formik/lib';

const utenlandsoppholdFormCleanup = (formValues: UtenlandsoppholdFormValues): UtenlandsoppholdFormValues => {
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

export default utenlandsoppholdFormCleanup;
