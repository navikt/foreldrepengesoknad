import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-common/src/common/utils/stringUtils';
import { ArbeidIUtlandet, AnnenInntektType } from 'app/types/ArbeidIUtlandet';
import {
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
} from '@navikt/fp-common/src/common/utils/formUtils';
import { ArbeidIUtlandetSubformData, ArbeidIUtlandetSubformField } from './arbeidIUtlandetSubformConfig';

export const initialArbeidIUtlandetFormValues: ArbeidIUtlandetSubformData = {
    [ArbeidIUtlandetSubformField.arbeidIUtlandetLand]: '',
    [ArbeidIUtlandetSubformField.arbeidIUtlandetNavnArbeidsgiver]: '',
    [ArbeidIUtlandetSubformField.arbeidIUtlandetFom]: '',
    [ArbeidIUtlandetSubformField.arbeidIUtlandetErPågående]: YesOrNo.UNANSWERED,
    [ArbeidIUtlandetSubformField.arbeidIUtlandetTom]: '',
};

export const mapArbeidIUtlandet = (formValues: Partial<ArbeidIUtlandetSubformData>): ArbeidIUtlandet => {
    const erPågående = convertYesOrNoOrUndefinedToBoolean(formValues.arbeidIUtlandetErPågående);
    return {
        type: AnnenInntektType.JOBB_I_UTLANDET,
        tidsperiode: { fom: formValues.arbeidIUtlandetFom!, tom: formValues.arbeidIUtlandetTom },
        pågående: !!erPågående,
        arbeidsgiverNavn: replaceInvisibleCharsWithSpace(formValues.arbeidIUtlandetNavnArbeidsgiver!),
        land: formValues.arbeidIUtlandetLand!,
    };
};

export const getInitialArbeidIUtlandetFormData = (arbeid: ArbeidIUtlandet | undefined) => {
    if (arbeid === undefined) {
        return { ...initialArbeidIUtlandetFormValues };
    }
    return {
        ...initialArbeidIUtlandetFormValues,
        fom: arbeid.tidsperiode.fom,
        tom: arbeid.tidsperiode.tom,
        land: arbeid.land,
        navnArbeidsgiver: arbeid.arbeidsgiverNavn,
        erPågående: convertBooleanOrUndefinedToYesOrNo(arbeid.pågående),
    };
};
