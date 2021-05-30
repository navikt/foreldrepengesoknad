import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { FrilansOppdrag } from 'app/context/types/Frilans';
import { convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import { FrilansoppdragModalFormData, FrilansoppdragModalFormField } from './frilansoppdragModalFormConfig';

export const initialFrilansoppdragModalValues: FrilansoppdragModalFormData = {
    [FrilansoppdragModalFormField.navnOppdragsgiver]: '',
    [FrilansoppdragModalFormField.fom]: '',
    [FrilansoppdragModalFormField.tom]: '',
    [FrilansoppdragModalFormField.pågående]: YesOrNo.UNANSWERED,
};

export const mapFrilansoppdragModalValuesToState = (values: Partial<FrilansoppdragModalFormData>): FrilansOppdrag => {
    return {
        navnPåArbeidsgiver: values.navnOppdragsgiver!,
        pågående: convertYesOrNoOrUndefinedToBoolean(values.pågående),
        tidsperiode: {
            fom: values.fom!,
            tom: values.pågående === YesOrNo.NO ? values.tom : undefined,
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
        fom: oppdrag.tidsperiode.fom,
        tom: oppdrag.tidsperiode.tom || '',
        navnOppdragsgiver: oppdrag.navnPåArbeidsgiver,
        pågående: convertBooleanOrUndefinedToYesOrNo(oppdrag.pågående),
    };
};
