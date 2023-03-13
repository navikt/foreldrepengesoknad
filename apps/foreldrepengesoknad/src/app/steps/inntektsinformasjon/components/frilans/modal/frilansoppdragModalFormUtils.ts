import { hasValue } from '@navikt/fp-common';
import { dateToISOString, YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { FrilansOppdrag } from 'app/context/types/Frilans';
import { ISOStringToDate } from 'app/utils/dateUtils';
import { convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import { FrilansoppdragModalFormData, FrilansoppdragModalFormField } from './frilansoppdragModalFormConfig';

export const initialFrilansoppdragModalValues: FrilansoppdragModalFormData = {
    [FrilansoppdragModalFormField.navnOppdragsgiver]: '',
    [FrilansoppdragModalFormField.fom]: '',
    [FrilansoppdragModalFormField.tom]: '',
    [FrilansoppdragModalFormField.pågående]: YesOrNo.UNANSWERED,
};

export const cleanupFrilansoppdragForm = (
    values: FrilansoppdragModalFormData,
    visibility: QuestionVisibility<FrilansoppdragModalFormField, undefined>
): FrilansoppdragModalFormData => {
    return {
        navnOppdragsgiver: visibility.isVisible(FrilansoppdragModalFormField.navnOppdragsgiver)
            ? values.navnOppdragsgiver
            : initialFrilansoppdragModalValues.navnOppdragsgiver,
        fom: visibility.isVisible(FrilansoppdragModalFormField.fom) ? values.fom : initialFrilansoppdragModalValues.fom,
        tom: visibility.isVisible(FrilansoppdragModalFormField.tom) ? values.tom : initialFrilansoppdragModalValues.tom,
        pågående: visibility.isVisible(FrilansoppdragModalFormField.pågående)
            ? values.pågående
            : initialFrilansoppdragModalValues.pågående,
    };
};

export const mapFrilansoppdragModalValuesToState = (values: Partial<FrilansoppdragModalFormData>): FrilansOppdrag => {
    return {
        navnPåArbeidsgiver: values.navnOppdragsgiver!,
        pågående: convertYesOrNoOrUndefinedToBoolean(values.pågående)!,
        tidsperiode: {
            fom: ISOStringToDate(values.fom)!,
            tom: hasValue(values.tom) ? ISOStringToDate(values.tom) : undefined,
        },
    };
};

export const getInitialFrilansoppdragModalValues = (
    oppdrag: FrilansOppdrag | undefined
): FrilansoppdragModalFormData => {
    if (!oppdrag) {
        return {
            ...initialFrilansoppdragModalValues,
        };
    }

    return {
        ...initialFrilansoppdragModalValues,
        fom: dateToISOString(oppdrag.tidsperiode.fom),
        tom: dateToISOString(oppdrag.tidsperiode.tom) || '',
        navnOppdragsgiver: oppdrag.navnPåArbeidsgiver,
        pågående: convertBooleanOrUndefinedToYesOrNo(oppdrag.pågående),
    };
};
