import { convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from '@navikt/fp-common';
import { QuestionVisibility, YesOrNo } from '@navikt/fp-formik';

import { UttaksplanFormData, UttaksplanFormField } from './UttaksplanFormConfig';

export const cleanUttaksplanFormData = (
    values: UttaksplanFormData,
    visibility: QuestionVisibility<UttaksplanFormField, undefined>,
): UttaksplanFormData => {
    const cleanedData: UttaksplanFormData = {
        ønskerAutomatiskJustering: visibility.isVisible(UttaksplanFormField.ønskerAutomatiskJustering)
            ? values.ønskerAutomatiskJustering
            : YesOrNo.UNANSWERED,
    };

    return cleanedData;
};

export const mapUttaksplanFormToState = (values: Partial<UttaksplanFormData>): boolean | undefined => {
    return convertYesOrNoOrUndefinedToBoolean(values.ønskerAutomatiskJustering);
};

export const mapUttaksplanFormValueToState = (value: YesOrNo): boolean | undefined => {
    return convertYesOrNoOrUndefinedToBoolean(value);
};

export const getUttaksplanFormInitialValues = (
    ønskerAutomatiskJustering: boolean | undefined,
    periodeKanJusteresAutomatiskVedFødsel: boolean,
): UttaksplanFormData => {
    return {
        ønskerAutomatiskJustering:
            ønskerAutomatiskJustering !== undefined && periodeKanJusteresAutomatiskVedFødsel
                ? convertBooleanOrUndefinedToYesOrNo(ønskerAutomatiskJustering)
                : YesOrNo.UNANSWERED,
    };
};
