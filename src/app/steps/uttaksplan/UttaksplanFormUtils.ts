import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import Barn, { isUfødtBarn } from 'app/context/types/Barn';
import { Situasjon } from 'app/types/Situasjon';
import { andreAugust2022ReglerGjelder } from 'app/utils/dateUtils';
import { convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import { Periode } from 'uttaksplan/types/Periode';
import { UttaksplanFormData, UttaksplanFormField } from './UttaksplanFormConfig';

export const getVisAutomatiskJustering = (
    erFarEllerMedmor: boolean,
    familiehendelsesdato: Date,
    situasjon: Situasjon,
    perioderRundtFødsel: Periode[],
    barn: Barn,
    termindato: Date | undefined,
    bareFarHarRett: boolean
) => {
    return (
        erFarEllerMedmor &&
        andreAugust2022ReglerGjelder(familiehendelsesdato) &&
        situasjon === 'fødsel' &&
        perioderRundtFødsel.length !== 0 &&
        isUfødtBarn(barn) &&
        termindato !== undefined &&
        !bareFarHarRett
    );
};

export const cleanUttaksplanFormData = (
    values: UttaksplanFormData,
    visibility: QuestionVisibility<UttaksplanFormField, undefined>
): UttaksplanFormData => {
    const cleanedData: UttaksplanFormData = {
        ønskerAutomatiskJustering: visibility.isVisible(UttaksplanFormField.ønskerAutomatiskJustering)
            ? values.ønskerAutomatiskJustering
            : YesOrNo.UNANSWERED,
    };

    return cleanedData;
};

export const mapUttaksplanFormToState = (values: Partial<UttaksplanFormData>): boolean | undefined => {
    console.log('mapUttaksplanFormToState:', values.ønskerAutomatiskJustering);
    return convertYesOrNoOrUndefinedToBoolean(values.ønskerAutomatiskJustering);
};

export const mapUttaksplanFormValueToState = (values: string): boolean | undefined => {
    const value = values as YesOrNo;
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
