import { QuestionVisibility, YesOrNo, dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import {
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
} from '@navikt/fp-common/src/common/utils/formUtils';
import { BarnetFormData, BarnetFormField } from './barnetFormConfig';
import { Barn } from 'app/types/Barn';
import { ISOStringToDate } from '@navikt/fp-common';

const getInitValues = (): Readonly<BarnetFormData> => ({
    [BarnetFormField.erBarnetFødt]: YesOrNo.UNANSWERED,
    [BarnetFormField.fødselsdato]: '',
    [BarnetFormField.termindato]: '',
});

export const cleanupOmBarnetFormData = (
    values: BarnetFormData,
    visibility: QuestionVisibility<BarnetFormField, undefined>,
): BarnetFormData => {
    const cleanedData: BarnetFormData = {
        erBarnetFødt: visibility.isVisible(BarnetFormField.erBarnetFødt) ? values.erBarnetFødt : YesOrNo.UNANSWERED,
        termindato: visibility.isVisible(BarnetFormField.termindato) ? values.termindato : '',
        fødselsdato: visibility.isVisible(BarnetFormField.fødselsdato) ? values.fødselsdato : '',
    };

    return cleanedData;
};

export const getBarnetInitialValues = (barn: Barn | undefined): BarnetFormData => {
    const initialOmBarnetValues = getInitValues();
    if (!barn) {
        return initialOmBarnetValues;
    }
    return {
        ...initialOmBarnetValues,
        erBarnetFødt: convertBooleanOrUndefinedToYesOrNo(barn.erBarnetFødt),
        termindato: dateToISOString(barn.termindato),
        fødselsdato: dateToISOString(barn.fødselsdato),
    };
};

export const mapOmBarnetFormDataToState = (values: Partial<BarnetFormData>): Barn => {
    return {
        erBarnetFødt: !!convertYesOrNoOrUndefinedToBoolean(values.erBarnetFødt),
        termindato: ISOStringToDate(values.termindato)!,
        fødselsdato: ISOStringToDate(values.fødselsdato),
    };
};
