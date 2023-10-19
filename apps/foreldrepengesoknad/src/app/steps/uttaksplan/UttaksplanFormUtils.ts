import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import { UttaksplanFormData, UttaksplanFormField } from './UttaksplanFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

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

export const getUttaksplanFormInitialValues = (ønskerAutomatiskJustering: boolean | undefined): UttaksplanFormData => {
    return {
        ønskerAutomatiskJustering:
            ønskerAutomatiskJustering !== undefined
                ? convertBooleanOrUndefinedToYesOrNo(ønskerAutomatiskJustering)
                : YesOrNo.UNANSWERED,
    };
};
