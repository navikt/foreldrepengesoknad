import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { AnnenInntekt } from 'app/context/types/AnnenInntekt';
import { Frilans, FrilansOppdrag } from 'app/context/types/Frilans';
import { Næring } from 'app/context/types/Næring';
import Søker from 'app/context/types/Søker';
import { convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import { InntektsinformasjonFormData, InntektsinformasjonFormField } from './inntektsinformasjonFormConfig';

export const initialInntektsinformasjonFormValues: InntektsinformasjonFormData = {
    [InntektsinformasjonFormField.hattInntektSomFrilans]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.hattInntektSomNæringsdrivende]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.hattAndreInntekter]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.frilansOppstartsDato]: '',
    [InntektsinformasjonFormField.oppdragForNæreVennerEllerFamilie]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.inntektSomFosterforelder]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.jobberFremdelesSomFrilanser]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.hattAndreInntekter]: YesOrNo.UNANSWERED,
};

export const mapInntektsinformasjonFormDataToState = (
    values: Partial<InntektsinformasjonFormData>,
    søker: Søker,
    andreInntekter?: AnnenInntekt[],
    frilansoppdrag?: FrilansOppdrag[],
    næringer?: Næring[]
): Søker => {
    let frilansInformasjon: Frilans | undefined = undefined;

    if (values.hattInntektSomFrilans === YesOrNo.YES) {
        frilansInformasjon = {
            oppstart: values.frilansOppstartsDato!,
            jobberFremdelesSomFrilans: convertYesOrNoOrUndefinedToBoolean(values.jobberFremdelesSomFrilanser)!,
            harJobbetForNærVennEllerFamilieSiste10Mnd: convertYesOrNoOrUndefinedToBoolean(
                values.oppdragForNæreVennerEllerFamilie
            )!,
            driverFosterhjem: convertYesOrNoOrUndefinedToBoolean(values.inntektSomFosterforelder),
            oppdragForNæreVennerEllerFamilieSiste10Mnd: frilansoppdrag!,
        };
    }

    return {
        erAleneOmOmsorg: søker.erAleneOmOmsorg,
        språkkode: søker.språkkode,
        harHattAnnenInntektSiste10Mnd: convertYesOrNoOrUndefinedToBoolean(values.hattAndreInntekter)!,
        harJobbetSomFrilansSiste10Mnd: convertYesOrNoOrUndefinedToBoolean(values.hattInntektSomFrilans)!,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: convertYesOrNoOrUndefinedToBoolean(
            values.hattInntektSomNæringsdrivende
        )!,
        andreInntekterSiste10Mnd: values.hattAndreInntekter === YesOrNo.YES ? andreInntekter : [],
        selvstendigNæringsdrivendeInformasjon: values.hattInntektSomNæringsdrivende === YesOrNo.YES ? næringer : [],
        frilansInformasjon: values.hattInntektSomFrilans === YesOrNo.YES ? frilansInformasjon : undefined,
    };
};

export const getInitialInntektsinformasjonFormValues = (søker: Søker): InntektsinformasjonFormData => {
    return {
        ...initialInntektsinformasjonFormValues,
        hattAndreInntekter: convertBooleanOrUndefinedToYesOrNo(søker.harHattAnnenInntektSiste10Mnd),
        hattInntektSomNæringsdrivende: convertBooleanOrUndefinedToYesOrNo(
            søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd
        ),
        hattInntektSomFrilans: convertBooleanOrUndefinedToYesOrNo(søker.harJobbetSomFrilansSiste10Mnd),
        frilansOppstartsDato: søker.frilansInformasjon ? søker.frilansInformasjon.oppstart : '',
        inntektSomFosterforelder: søker.frilansInformasjon
            ? convertBooleanOrUndefinedToYesOrNo(søker.frilansInformasjon.driverFosterhjem)
            : YesOrNo.UNANSWERED,
        jobberFremdelesSomFrilanser: søker.frilansInformasjon
            ? convertBooleanOrUndefinedToYesOrNo(søker.frilansInformasjon.jobberFremdelesSomFrilans)
            : YesOrNo.UNANSWERED,
        oppdragForNæreVennerEllerFamilie: søker.frilansInformasjon
            ? convertBooleanOrUndefinedToYesOrNo(søker.frilansInformasjon.harJobbetForNærVennEllerFamilieSiste10Mnd)
            : YesOrNo.UNANSWERED,
    };
};
