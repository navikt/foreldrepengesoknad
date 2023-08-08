import { Frilans } from 'app/types/Frilans';
import { FrilansSubformData, FrilansSubformField } from './frilansSubformConfig';
import { YesOrNo, dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { convertBooleanOrUndefinedToYesOrNo } from '@navikt/fp-common/src/common/utils/formUtils';

export const initialFrilansSubformValues: FrilansSubformData = {
    [FrilansSubformField.frilansFom]: '',
    [FrilansSubformField.frilansTom]: '',
    [FrilansSubformField.jobberFremdelesSomFrilanser]: YesOrNo.UNANSWERED,
};

export const getInitialFrilansSubformValues = (frilans: Frilans | undefined): FrilansSubformData => {
    if (frilans === undefined) {
        return initialFrilansSubformValues;
    }
    return {
        ...initialFrilansSubformValues,
        frilansFom: dateToISOString(frilans.oppstart),
        frilansTom: dateToISOString(frilans.sluttDato),
        jobberFremdelesSomFrilanser: convertBooleanOrUndefinedToYesOrNo(frilans.jobberFremdelesSomFrilans),
    };
};
