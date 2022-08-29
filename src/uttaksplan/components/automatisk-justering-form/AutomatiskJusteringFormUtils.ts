import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import Barn, { isUfødtBarn } from 'app/context/types/Barn';
import { Situasjon } from 'app/types/Situasjon';
import { andreAugust2022ReglerGjelder } from 'app/utils/dateUtils';
import { convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import { Periode } from 'uttaksplan/types/Periode';
import { AutomatiskJusteringFormData, AutomatiskJusteringFormField } from './AutomatiskJusteringFormConfig';

export const getVisAutomatiskJusteringForm = (
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

export const initialAutomatiskJusteringValues: AutomatiskJusteringFormData = {
    [AutomatiskJusteringFormField.ønskerAutomatiskJustering]: YesOrNo.UNANSWERED,
};

export const cleanAutomatiskJusteringFormData = (
    values: AutomatiskJusteringFormData,
    visibility: QuestionVisibility<AutomatiskJusteringFormField, undefined>
): AutomatiskJusteringFormData => {
    const cleanedData: AutomatiskJusteringFormData = {
        ønskerAutomatiskJustering: visibility.isVisible(AutomatiskJusteringFormField.ønskerAutomatiskJustering)
            ? values.ønskerAutomatiskJustering
            : YesOrNo.UNANSWERED,
    };

    return cleanedData;
};

export const mapAutomatiskJusteringFormToState = (
    values: Partial<AutomatiskJusteringFormData>
): boolean | undefined => {
    return convertYesOrNoOrUndefinedToBoolean(values.ønskerAutomatiskJustering);
};

export const getAutomatiskJusteringFormInitialValues = (): AutomatiskJusteringFormData => {
    return {
        ...initialAutomatiskJusteringValues,
    };
};
