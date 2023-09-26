import { Frilans } from 'app/types/Frilans';
import { FrilansFormData, FrilansFormField } from './frilansFormConfig';
import { QuestionVisibility, YesOrNo, dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import {
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
} from '@navikt/fp-common/src/common/utils/formUtils';
import { Søker } from 'app/types/Søker';
import { ISOStringToDate } from '@navikt/fp-common';

export const initialFrilansFormValues: FrilansFormData = {
    [FrilansFormField.frilansFom]: '',
    [FrilansFormField.frilansTom]: '',
    [FrilansFormField.jobberFremdelesSomFrilanser]: YesOrNo.UNANSWERED,
};

export const getInitialFrilansFormValues = (frilans: Frilans | undefined): FrilansFormData => {
    if (frilans === undefined) {
        return initialFrilansFormValues;
    }
    return {
        ...initialFrilansFormValues,
        frilansFom: dateToISOString(frilans.oppstart),
        frilansTom: dateToISOString(frilans.sluttDato),
        jobberFremdelesSomFrilanser: convertBooleanOrUndefinedToYesOrNo(frilans.jobberFremdelesSomFrilans),
    };
};

export const mapFrilansDataToSøkerState = (søker: Søker, values: FrilansFormData): Søker => {
    return {
        ...søker,
        frilansInformasjon: {
            jobberFremdelesSomFrilans: !!convertYesOrNoOrUndefinedToBoolean(values.jobberFremdelesSomFrilanser),
            oppstart: ISOStringToDate(values.frilansFom)!,
            sluttDato: ISOStringToDate(values.frilansTom)!,
        },
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
        frilansTom: visibility.isVisible(FrilansFormField.frilansTom)
            ? values.frilansTom
            : initialFrilansFormValues.frilansTom,
        jobberFremdelesSomFrilanser: visibility.isVisible(FrilansFormField.jobberFremdelesSomFrilanser)
            ? values.jobberFremdelesSomFrilanser
            : initialFrilansFormValues.jobberFremdelesSomFrilanser,
    };

    return cleanedData;
};
