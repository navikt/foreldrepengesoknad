import { YesOrNo } from '@navikt/sif-common-formik/lib';

export const validateYesOrNoIsAnswered = (answer: YesOrNo): string | undefined => {
    if (answer === YesOrNo.UNANSWERED || answer === undefined) {
        return 'Feltet er påkrevd';
    }
    return undefined;
};
