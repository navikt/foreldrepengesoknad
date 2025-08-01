import { YesOrNo, convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from '@navikt/fp-uttaksplan';

import { UttaksplanFormData } from './UttaksplanFormConfig';

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
