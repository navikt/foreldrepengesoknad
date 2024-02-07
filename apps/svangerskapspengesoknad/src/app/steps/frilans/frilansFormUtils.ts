import { Frilans } from 'app/types/Frilans';
import { FrilansFormData, FrilansFormField } from './frilansFormConfig';
import { QuestionVisibility, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { convertBooleanOrUndefinedToYesOrNo } from '@navikt/fp-common/src/common/utils/formUtils';

export const initialFrilansFormValues: FrilansFormData = {
    [FrilansFormField.frilansFom]: '',
    [FrilansFormField.jobberFremdelesSomFrilanser]: YesOrNo.UNANSWERED,
};

export const getInitialFrilansFormValues = (frilans: Frilans | undefined): FrilansFormData => {
    if (frilans === undefined) {
        return initialFrilansFormValues;
    }
    return {
        ...initialFrilansFormValues,
        frilansFom: frilans.oppstart,
        jobberFremdelesSomFrilanser: convertBooleanOrUndefinedToYesOrNo(frilans.jobberFremdelesSomFrilans),
    };
};

export const cleanupFrilansFormData = (
    values: FrilansFormData,
    visibility: QuestionVisibility<FrilansFormField>,
): FrilansFormData => {
    const cleanedData: FrilansFormData = {
        frilansFom: visibility.isVisible(FrilansFormField.frilansFom)
            ? values.frilansFom
            : initialFrilansFormValues.frilansFom,
        jobberFremdelesSomFrilanser: visibility.isVisible(FrilansFormField.jobberFremdelesSomFrilanser)
            ? values.jobberFremdelesSomFrilanser
            : initialFrilansFormValues.jobberFremdelesSomFrilanser,
    };

    return cleanedData;
};
