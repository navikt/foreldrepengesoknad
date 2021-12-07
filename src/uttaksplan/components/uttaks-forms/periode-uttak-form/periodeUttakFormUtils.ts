import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { Forelder } from 'app/types/Forelder';
import { convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { OverføringÅrsakType } from 'uttaksplan/types/OverføringÅrsakType';
import {
    Arbeidsform,
    isOppholdsperiode,
    isOverføringsperiode,
    isUttaksperiode,
    Oppholdsperiode,
    Overføringsperiode,
    Periode,
    Periodetype,
    Uttaksperiode,
} from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { getOppholdsÅrsakFromStønadskonto, getStønadskontoFromOppholdsårsak } from 'uttaksplan/utils/periodeUtils';
import { PeriodeUttakFormData, PeriodeUttakFormField } from './periodeUttakFormConfig';

const initialValues: PeriodeUttakFormData = {
    [PeriodeUttakFormField.fom]: undefined,
    [PeriodeUttakFormField.tom]: undefined,
    [PeriodeUttakFormField.konto]: '',
    [PeriodeUttakFormField.samtidigUttak]: YesOrNo.UNANSWERED,
    [PeriodeUttakFormField.aktivitetskravMor]: '',
    [PeriodeUttakFormField.aktivitetskravMorDokumentasjon]: [],
    [PeriodeUttakFormField.overføringsårsak]: '',
    [PeriodeUttakFormField.overføringsdokumentasjon]: [],
    [PeriodeUttakFormField.skalHaGradering]: YesOrNo.UNANSWERED,
    [PeriodeUttakFormField.stillingsprosent]: '',
    [PeriodeUttakFormField.hvorSkalDuJobbe]: [],
    [PeriodeUttakFormField.erMorForSyk]: YesOrNo.UNANSWERED,
    [PeriodeUttakFormField.samtidigUttakProsent]: '',
    [PeriodeUttakFormField.hvemSkalTaUttak]: '',
    [PeriodeUttakFormField.ønskerFlerbarnsdager]: YesOrNo.UNANSWERED,
};

export const cleanPeriodeUttakFormData = (
    values: PeriodeUttakFormData,
    visibility: QuestionVisibility<PeriodeUttakFormField, undefined>
): PeriodeUttakFormData => {
    const cleanedData: PeriodeUttakFormData = {
        fom: values.fom,
        tom: values.tom,
        hvemSkalTaUttak: values.hvemSkalTaUttak,
        aktivitetskravMor: visibility.isVisible(PeriodeUttakFormField.aktivitetskravMor)
            ? values.aktivitetskravMor
            : '',
        aktivitetskravMorDokumentasjon: visibility.isVisible(PeriodeUttakFormField.aktivitetskravMorDokumentasjon)
            ? values.aktivitetskravMorDokumentasjon
            : [],
        erMorForSyk: visibility.isVisible(PeriodeUttakFormField.erMorForSyk)
            ? values.erMorForSyk
            : initialValues.erMorForSyk,
        hvorSkalDuJobbe: visibility.isVisible(PeriodeUttakFormField.hvorSkalDuJobbe) ? values.hvorSkalDuJobbe : [],
        konto: values.konto,
        overføringsdokumentasjon: visibility.isVisible(PeriodeUttakFormField.overføringsdokumentasjon)
            ? values.overføringsdokumentasjon
            : [],
        overføringsårsak: visibility.isVisible(PeriodeUttakFormField.overføringsårsak)
            ? values.overføringsårsak
            : initialValues.overføringsårsak,
        samtidigUttak: visibility.isVisible(PeriodeUttakFormField.samtidigUttak)
            ? values.samtidigUttak
            : initialValues.samtidigUttak,
        samtidigUttakProsent: visibility.isVisible(PeriodeUttakFormField.samtidigUttakProsent)
            ? values.samtidigUttakProsent
            : initialValues.samtidigUttakProsent,
        skalHaGradering: visibility.isVisible(PeriodeUttakFormField.skalHaGradering)
            ? values.skalHaGradering
            : initialValues.skalHaGradering,
        stillingsprosent: visibility.isVisible(PeriodeUttakFormField.stillingsprosent)
            ? values.stillingsprosent
            : initialValues.stillingsprosent,
        ønskerFlerbarnsdager: visibility.isVisible(PeriodeUttakFormField.ønskerFlerbarnsdager)
            ? values.ønskerFlerbarnsdager
            : initialValues.ønskerFlerbarnsdager,
    };

    return cleanedData;
};

export const getPeriodeUttakFormInitialValues = (periode?: Periode): PeriodeUttakFormData => {
    if (periode !== undefined) {
        if (isUttaksperiode(periode)) {
            return {
                ...initialValues,
                fom: periode.tidsperiode.fom,
                tom: periode.tidsperiode.tom,
                aktivitetskravMor: periode.morsAktivitetIPerioden || '',
                aktivitetskravMorDokumentasjon: periode.vedlegg || [],
                erMorForSyk: convertBooleanOrUndefinedToYesOrNo(periode.erMorForSyk),
                hvemSkalTaUttak: periode.forelder,
                hvorSkalDuJobbe: periode.arbeidsformer || [],
                konto: periode.konto,
                samtidigUttak: convertBooleanOrUndefinedToYesOrNo(periode.ønskerSamtidigUttak),
                samtidigUttakProsent: periode.samtidigUttakProsent || '',
                skalHaGradering: convertBooleanOrUndefinedToYesOrNo(periode.gradert),
                stillingsprosent: periode.stillingsprosent || '',
                ønskerFlerbarnsdager: convertBooleanOrUndefinedToYesOrNo(periode.ønskerFlerbarnsdager),
            };
        }

        if (isOverføringsperiode(periode)) {
            return {
                ...initialValues,
                hvemSkalTaUttak: periode.forelder,
                konto: periode.konto,
                fom: periode.tidsperiode.fom,
                tom: periode.tidsperiode.tom,
                overføringsårsak: periode.årsak,
                overføringsdokumentasjon: periode.vedlegg || [],
            };
        }

        if (isOppholdsperiode(periode)) {
            return {
                ...initialValues,
                hvemSkalTaUttak: periode.forelder,
                konto: getStønadskontoFromOppholdsårsak(periode.årsak),
                fom: periode.tidsperiode.fom,
                tom: periode.tidsperiode.tom,
            };
        }

        return {
            ...initialValues,
            fom: periode.tidsperiode.fom,
            tom: periode.tidsperiode.tom,
        };
    }

    return {
        ...initialValues,
    };
};

export const mapPeriodeUttakFormToPeriode = (
    values: Partial<PeriodeUttakFormData>,
    id: string,
    type: Periodetype
): Periode => {
    if (type === Periodetype.Overføring) {
        const periode: Overføringsperiode = {
            id,
            type,
            forelder: values.hvemSkalTaUttak as Forelder,
            konto: values.konto as StønadskontoType,
            tidsperiode: {
                fom: values.fom!,
                tom: values.tom!,
            },
            årsak: values.overføringsårsak as OverføringÅrsakType,
            vedlegg: values.overføringsdokumentasjon,
        };

        return periode;
    }

    if (type === Periodetype.Opphold) {
        const periode: Oppholdsperiode = {
            id,
            type,
            forelder: values.hvemSkalTaUttak as Forelder,
            årsak: getOppholdsÅrsakFromStønadskonto(values.konto as StønadskontoType)!,
            tidsperiode: {
                fom: values.fom!,
                tom: values.tom!,
            },
        };

        return periode;
    }

    const periode: Uttaksperiode = {
        id,
        forelder: values.hvemSkalTaUttak as Forelder,
        konto: values.konto as StønadskontoType,
        tidsperiode: {
            fom: values.fom!,
            tom: values.tom!,
        },
        type: Periodetype.Uttak,
        arbeidsformer: [Arbeidsform.arbeidstaker],
        morsAktivitetIPerioden: values.aktivitetskravMor as MorsAktivitet,
        erArbeidstaker: true,
        erMorForSyk: convertYesOrNoOrUndefinedToBoolean(values.erMorForSyk),
        gradert: convertYesOrNoOrUndefinedToBoolean(values.skalHaGradering),
        harIkkeAktivitetskrav: true,
        orgnumre: [],
        stillingsprosent: values.stillingsprosent,
        ønskerFlerbarnsdager: convertYesOrNoOrUndefinedToBoolean(values.ønskerFlerbarnsdager),
        ønskerSamtidigUttak: convertYesOrNoOrUndefinedToBoolean(values.samtidigUttak),
        samtidigUttakProsent: values.samtidigUttakProsent,
    };

    return periode;
};
