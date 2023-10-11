import { AnnenInntektType, ArbeidIUtlandet, ArbeidIUtlandetInput } from 'app/types/ArbeidIUtlandet';

import { ArbeidIUtlandetFormData, ArbeidIUtlandetFormField } from './arbeidIUtlandetFormConfig';
import {
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
} from '@navikt/fp-common/src/common/utils/formUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

export const getUferdigArbeidIUtlandetInput = (): ArbeidIUtlandetInput => {
    return {
        fom: '',
        tom: '',
        pågående: undefined!,
        arbeidsgiverNavn: '',
        land: '',
    };
};

export const initialArbeidIUtlandetFormValues: ArbeidIUtlandetFormData = {
    [ArbeidIUtlandetFormField.arbeidIUtlandet]: [getUferdigArbeidIUtlandetInput()],
};

export const mapArbeidIUtlandetTilState = (formValues: Partial<ArbeidIUtlandetFormData>): ArbeidIUtlandet[] => {
    const mappedAbeid = formValues.arbeidIUtlandet!.map((arbeid) => {
        return {
            type: AnnenInntektType.JOBB_I_UTLANDET,
            tidsperiode: { fom: arbeid.fom, tom: arbeid.tom },
            pågående: !!convertYesOrNoOrUndefinedToBoolean(arbeid.pågående),
            arbeidsgiverNavn: arbeid.arbeidsgiverNavn,
            land: arbeid.land,
        };
    });
    return mappedAbeid;
};
export const getInitialArbeidIUtlandetFormData = (
    arbeidIUtlandet: ArbeidIUtlandet[] | undefined,
): ArbeidIUtlandetFormData => {
    if (arbeidIUtlandet === undefined || arbeidIUtlandet.length === 0) {
        return initialArbeidIUtlandetFormValues;
    }
    const mappedArbeid = arbeidIUtlandet.map((arbeid) => {
        return {
            fom: arbeid.tidsperiode.fom,
            tom: arbeid.tidsperiode.tom,
            pågående: convertBooleanOrUndefinedToYesOrNo(arbeid.pågående),
            arbeidsgiverNavn: arbeid.arbeidsgiverNavn,
            land: arbeid.land,
        };
    });
    return { arbeidIUtlandet: mappedArbeid };
};

export const cleanUpArbeidIUtlandetFormData = (values: ArbeidIUtlandetFormData): ArbeidIUtlandetFormData => {
    const cleanedArbeidIUtlandet = values.arbeidIUtlandet.map((arbeid) => {
        return {
            ...arbeid,
            tom: arbeid.pågående === YesOrNo.NO ? arbeid.tom : getUferdigArbeidIUtlandetInput().tom,
        };
    });
    const cleanedData: ArbeidIUtlandetFormData = { arbeidIUtlandet: cleanedArbeidIUtlandet };
    return cleanedData;
};
