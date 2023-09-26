import { InntektsinformasjonFormData, InntektsinformasjonFormField } from './inntektsinformasjonFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import {
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
} from '@navikt/fp-common/src/common/utils/formUtils';
import { Søker, Søkerrolle } from 'app/types/Søker';

export const initialInntektsinformasjonFormValues: InntektsinformasjonFormData = {
    [InntektsinformasjonFormField.hattInntektSomFrilans]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.hattInntektSomNæringsdrivende]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.hattArbeidIUtlandet]: YesOrNo.UNANSWERED,
};

export const mapInntektsinformasjonFormDataToState = (
    values: Partial<InntektsinformasjonFormData>,
    søker: Søker,
): Søker => {
    const oppdatertFrilansInfo = values.hattInntektSomFrilans === YesOrNo.YES ? søker.frilansInformasjon : undefined;
    const oppdatertNæringInfo =
        values.hattInntektSomNæringsdrivende === YesOrNo.YES ? søker.selvstendigNæringsdrivendeInformasjon : undefined;
    const oppdatertArbeidUtlandInfo = values.hattArbeidIUtlandet === YesOrNo.YES ? søker.andreInntekter : undefined;
    return {
        ...søker,
        rolle: Søkerrolle.MOR,
        harHattAnnenInntekt: convertYesOrNoOrUndefinedToBoolean(values.hattArbeidIUtlandet)!,
        harJobbetSomFrilans: convertYesOrNoOrUndefinedToBoolean(values.hattInntektSomFrilans)!,
        harJobbetSomSelvstendigNæringsdrivende: convertYesOrNoOrUndefinedToBoolean(
            values.hattInntektSomNæringsdrivende,
        )!,
        frilansInformasjon: oppdatertFrilansInfo,
        selvstendigNæringsdrivendeInformasjon: oppdatertNæringInfo,
        andreInntekter: oppdatertArbeidUtlandInfo,
    };
};

export const getInitialInntektsinformasjonFormValues = (søker: Søker): InntektsinformasjonFormData => {
    const init = {
        ...initialInntektsinformasjonFormValues,
        hattArbeidIUtlandet: convertBooleanOrUndefinedToYesOrNo(søker.harHattAnnenInntekt),
        hattInntektSomNæringsdrivende: convertBooleanOrUndefinedToYesOrNo(søker.harJobbetSomSelvstendigNæringsdrivende),
        hattInntektSomFrilans: convertBooleanOrUndefinedToYesOrNo(søker.harJobbetSomFrilans),
    };
    return init;
};
