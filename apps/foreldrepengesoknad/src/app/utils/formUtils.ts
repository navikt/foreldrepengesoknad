import { YesOrNo } from '@navikt/sif-common-formik/lib';

export const convertBooleanOrUndefinedToYesOrNo = (value: boolean | undefined): YesOrNo => {
    if (value === true) {
        return YesOrNo.YES;
    }

    if (value === false) {
        return YesOrNo.NO;
    }

    return YesOrNo.UNANSWERED;
};

export const convertYesOrNoOrUndefinedToBoolean = (value: YesOrNo | undefined) => {
    if (value === YesOrNo.YES) {
        return true;
    }

    if (value === YesOrNo.UNANSWERED) {
        return undefined;
    }

    return false;
};
