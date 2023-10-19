import { QuestionVisibility, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import {
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
} from '@navikt/fp-common/src/common/utils/formUtils';
import { BarnetFormData, BarnetFormField } from './barnetFormConfig';
import { Barn } from 'app/types/Barn';
import { enMånedSiden } from 'app/utils/dateUtils';
import { isValidDate } from '@navikt/ds-react/esm/date/utils';
import { hasValue } from 'app/utils/validationUtils';

const getInitValues = (): Readonly<BarnetFormData> => ({
    [BarnetFormField.erBarnetFødt]: YesOrNo.UNANSWERED,
    [BarnetFormField.fødselsdato]: undefined,
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
        termindato: barn.termindato,
        fødselsdato: barn.fødselsdato,
    };
};

export const mapOmBarnetFormDataToState = (values: Partial<BarnetFormData>): Barn => {
    return {
        erBarnetFødt: !!convertYesOrNoOrUndefinedToBoolean(values.erBarnetFødt),
        termindato: values.termindato!,
        fødselsdato: values.fødselsdato,
    };
};

export const getMinDatoTermin = (erBarnetFødt: YesOrNo, fødselsdato: string): Date => {
    if (erBarnetFødt === YesOrNo.YES)
        if (hasValue(fødselsdato) && isValidDate(new Date(fødselsdato))) {
            return enMånedSiden(new Date(fødselsdato));
        }
    return enMånedSiden(new Date());
};
