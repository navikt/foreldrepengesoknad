import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { Forelder } from 'app/types/Forelder';
import { convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { Arbeidsform, isUttaksperiode, Periode, Periodetype, Uttaksperiode } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { PeriodeUttakFormData, PeriodeUttakFormField } from './periodeUttakFormConfig';

const initialValues: PeriodeUttakFormData = {
    [PeriodeUttakFormField.fom]: undefined,
    [PeriodeUttakFormField.tom]: undefined,
    [PeriodeUttakFormField.kvote]: '',
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

export const getPeriodeUttakFormInitialValues = (periode?: Periode): PeriodeUttakFormData => {
    if (periode !== undefined) {
        if (isUttaksperiode(periode)) {
            return {
                ...initialValues,
                fom: periode.tidsperiode.fom,
                tom: periode.tidsperiode.tom,
                aktivitetskravMor: periode.morsAktivitetIPerioden,
                aktivitetskravMorDokumentasjon: periode.vedlegg,
                erMorForSyk: convertBooleanOrUndefinedToYesOrNo(periode.erMorForSyk),
                hvemSkalTaUttak: periode.forelder,
                hvorSkalDuJobbe: periode.arbeidsformer,
                kvote: periode.konto,
                samtidigUttak: convertBooleanOrUndefinedToYesOrNo(periode.ønskerSamtidigUttak),
                samtidigUttakProsent: periode.samtidigUttakProsent,
                skalHaGradering: convertBooleanOrUndefinedToYesOrNo(periode.gradert),
                stillingsprosent: periode.stillingsprosent,
                ønskerFlerbarnsdager: convertBooleanOrUndefinedToYesOrNo(periode.ønskerFlerbarnsdager),
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
    values: PeriodeUttakFormData,
    id: string,
    type: Periodetype,
    forelder?: Forelder
): Periode => {
    if (type === Periodetype.Uttak) {
        const periode: Uttaksperiode = {
            id,
            forelder: forelder!,
            konto: values.kvote as StønadskontoType,
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
    }

    const periode: Uttaksperiode = {
        id,
        forelder: forelder!,
        konto: values.kvote as StønadskontoType,
        tidsperiode: {
            fom: values.fom!,
            tom: values.tom!,
        },
        type: Periodetype.Uttak,
        arbeidsformer: [Arbeidsform.arbeidstaker],
    };

    return periode;
};
