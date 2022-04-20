import { YesOrNo } from '@navikt/sif-common-formik/lib';

export const mapBooleanToYesOrNo = (value: boolean | undefined): YesOrNo => {
    if (value !== undefined) {
        return value ? YesOrNo.YES : YesOrNo.NO;
    }

    return YesOrNo.UNANSWERED;
};
