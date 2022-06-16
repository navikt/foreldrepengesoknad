import { hasValue } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { Attachment } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { Forelder } from 'app/types/Forelder';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { UttakRundtFødselÅrsak } from 'app/types/UttakRundtFødselÅrsak';
import { convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import { getMorsAktivitet, getMorsAktivitetSkjemanummer } from 'app/utils/morsAktivitetUtils';
import { trimNumberValue } from 'app/utils/numberUtils';
import { lagSendSenereDokumentNårIngenAndreFinnes } from 'app/utils/vedleggUtils';
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
import { erSamtidigUttakFørFødsel } from './periodeUttakFormQuestionsConfig';

const getInitialValues = (erDeltUttak: boolean, forelder: Forelder, erMorUfør: boolean): PeriodeUttakFormData => {
    const hvemSkalTaUttak = erDeltUttak ? '' : forelder;
    const konto = erDeltUttak ? '' : erMorUfør ? '' : StønadskontoType.Foreldrepenger;

    return {
        [PeriodeUttakFormField.fom]: undefined,
        [PeriodeUttakFormField.tom]: undefined,
        [PeriodeUttakFormField.konto]: konto,
        [PeriodeUttakFormField.samtidigUttak]: YesOrNo.UNANSWERED,
        [PeriodeUttakFormField.aktivitetskravMor]: '',
        [PeriodeUttakFormField.aktivitetskravMorDokumentasjon]: [],
        [PeriodeUttakFormField.overføringsårsak]: '',
        [PeriodeUttakFormField.overføringsdokumentasjon]: [],
        [PeriodeUttakFormField.skalHaGradering]: YesOrNo.UNANSWERED,
        [PeriodeUttakFormField.stillingsprosent]: '',
        [PeriodeUttakFormField.arbeidsformer]: '',
        [PeriodeUttakFormField.erMorForSyk]: YesOrNo.UNANSWERED,
        [PeriodeUttakFormField.erMorForSykDokumentasjon]: [],
        [PeriodeUttakFormField.uttakRundtFødselÅrsak]: '',
        [PeriodeUttakFormField.samtidigUttakProsent]: '',
        [PeriodeUttakFormField.hvemSkalTaUttak]: hvemSkalTaUttak,
        [PeriodeUttakFormField.ønskerFlerbarnsdager]: YesOrNo.UNANSWERED,
    };
};

export const cleanPeriodeUttakFormData = (
    values: PeriodeUttakFormData,
    visibility: QuestionVisibility<PeriodeUttakFormField, undefined>,
    erDeltUttak: boolean,
    forelder: Forelder,
    erMorUfør: boolean
): PeriodeUttakFormData => {
    const initialValues = getInitialValues(erDeltUttak, forelder, erMorUfør);

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
        erMorForSykDokumentasjon: visibility.isVisible(PeriodeUttakFormField.erMorForSyk)
            ? values.erMorForSykDokumentasjon
            : initialValues.erMorForSykDokumentasjon,
        uttakRundtFødselÅrsak: visibility.isVisible(PeriodeUttakFormField.uttakRundtFødselÅrsak)
            ? values.uttakRundtFødselÅrsak
            : initialValues.uttakRundtFødselÅrsak,
        arbeidsformer: visibility.isVisible(PeriodeUttakFormField.arbeidsformer) ? values.arbeidsformer : '',
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

const getInitialÅrsakForUttakRundtFødsel = (
    erMorForSyk: boolean | undefined,
    ønskerSamtidigUttak: boolean | undefined
): UttakRundtFødselÅrsak | undefined => {
    if (erMorForSyk) {
        return UttakRundtFødselÅrsak.morErForSyk;
    }
    if (ønskerSamtidigUttak) {
        return UttakRundtFødselÅrsak.samtidigUttak;
    }
    return undefined;
};

export const getPeriodeUttakFormInitialValues = (
    periode: Periode,
    erDeltUttak: boolean,
    forelder: Forelder,
    erMorUfør: boolean
): PeriodeUttakFormData => {
    const initialValues = getInitialValues(erDeltUttak, forelder, erMorUfør);

    if (periode !== undefined) {
        if (isUttaksperiode(periode)) {
            return {
                ...initialValues,
                fom: periode.tidsperiode.fom,
                tom: periode.tidsperiode.tom,
                aktivitetskravMor: periode.morsAktivitetIPerioden || '',
                aktivitetskravMorDokumentasjon: periode.vedlegg || [],
                erMorForSyk: convertBooleanOrUndefinedToYesOrNo(periode.erMorForSyk),
                erMorForSykDokumentasjon: periode.vedlegg || [],
                hvemSkalTaUttak: periode.forelder || initialValues.hvemSkalTaUttak,
                arbeidsformer:
                    periode.arbeidsformer && periode.arbeidsformer.length > 0
                        ? getFrilansSNEllerOrgnr(periode.arbeidsformer, periode.orgnumre)
                        : '',
                konto: periode.konto || initialValues.konto,
                samtidigUttak: convertBooleanOrUndefinedToYesOrNo(periode.ønskerSamtidigUttak),
                samtidigUttakProsent: periode.samtidigUttakProsent || '',
                skalHaGradering: convertBooleanOrUndefinedToYesOrNo(periode.gradert),
                stillingsprosent: periode.stillingsprosent || '',
                ønskerFlerbarnsdager: convertBooleanOrUndefinedToYesOrNo(periode.ønskerFlerbarnsdager),
                uttakRundtFødselÅrsak:
                    getInitialÅrsakForUttakRundtFødsel(periode.erMorForSyk, periode.ønskerSamtidigUttak) ||
                    initialValues.uttakRundtFødselÅrsak,
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

const getFrilansSNEllerOrgnr = (arbeidsformer: Arbeidsform[], orgnumre?: string[]): Arbeidsform => {
    if (arbeidsformer.includes(Arbeidsform.frilans) || arbeidsformer.includes(Arbeidsform.selvstendignæringsdrivende)) {
        return arbeidsformer[0];
    }

    return orgnumre![0] as Arbeidsform;
};

const getArbeidsform = (arbeidsformer: Arbeidsform[]): Arbeidsform[] => {
    return arbeidsformer.includes(Arbeidsform.frilans) || arbeidsformer.includes(Arbeidsform.selvstendignæringsdrivende)
        ? arbeidsformer
        : [Arbeidsform.arbeidstaker];
};

const getOrgnummer = (arbeidsformer: Arbeidsform[]): string[] => {
    return arbeidsformer.includes(Arbeidsform.frilans) || arbeidsformer.includes(Arbeidsform.selvstendignæringsdrivende)
        ? []
        : arbeidsformer;
};

const getErArbeidstaker = (arbeidsformer: Arbeidsform[]): boolean => {
    return (
        arbeidsformer.includes(Arbeidsform.frilans) || arbeidsformer.includes(Arbeidsform.selvstendignæringsdrivende)
    );
};

const getSamtidigUttaksProsentWLB = (
    ønskerGradering: boolean | undefined,
    dekningsgrad: string | undefined
): string => {
    return ønskerGradering && dekningsgrad !== undefined
        ? (100 - parseFloat(trimNumberValue(dekningsgrad))).toString()
        : '100';
};

const velgVedleggSomSkalBrukes = (
    aktivitetskravMorDokumentasjon: Attachment[],
    erMorForSykDokumentasjon: Attachment[]
): Attachment[] => {
    if (aktivitetskravMorDokumentasjon.length > 0) {
        return aktivitetskravMorDokumentasjon;
    }

    return erMorForSykDokumentasjon;
};

const skalVedleggPåkreves = (morsAktivitetIPerioden: '' | MorsAktivitet | undefined, erMorForSyk: boolean): boolean => {
    if (hasValue(morsAktivitetIPerioden) || erMorForSyk) {
        return true;
    }

    return false;
};

export const mapPeriodeUttakFormToPeriode = (
    values: Partial<PeriodeUttakFormData>,
    id: string,
    type: Periodetype,
    familiehendelsesdato: Date
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
            vedlegg: lagSendSenereDokumentNårIngenAndreFinnes(
                values.overføringsdokumentasjon!,
                AttachmentType.OVERFØRING_KVOTE,
                Skjemanummer.DOK_OVERFØRING_FOR_SYK
            ),
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

    const attachmentType = hasValue(values.aktivitetskravMor)
        ? AttachmentType.MORS_AKTIVITET_DOKUMENTASJON
        : AttachmentType.UTSETTELSE_SYKDOM;

    const skjemanummer = hasValue(values.aktivitetskravMor)
        ? getMorsAktivitetSkjemanummer(values.aktivitetskravMor as MorsAktivitet)
        : Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM;

    const relevantVedlegg = velgVedleggSomSkalBrukes(
        values.aktivitetskravMorDokumentasjon!,
        values.erMorForSykDokumentasjon!
    );

    const morErForSyk =
        hasValue(values.uttakRundtFødselÅrsak) && values.uttakRundtFødselÅrsak === UttakRundtFødselÅrsak.morErForSyk
            ? true
            : convertYesOrNoOrUndefinedToBoolean(values.erMorForSyk);

    const erSamtidigUttak =
        (hasValue(values.uttakRundtFødselÅrsak) &&
            values.uttakRundtFødselÅrsak === UttakRundtFødselÅrsak.samtidigUttak) ||
        erSamtidigUttakFørFødsel(values, familiehendelsesdato)
            ? true
            : convertYesOrNoOrUndefinedToBoolean(values.samtidigUttak);

    const samtidigUttakProsentInputVerdi = hasValue(values.samtidigUttakProsent)
        ? trimNumberValue(values.samtidigUttakProsent!)
        : undefined;

    const samtidigUttakProsentVerdi =
        (hasValue(values.uttakRundtFødselÅrsak) &&
            values.uttakRundtFødselÅrsak === UttakRundtFødselÅrsak.samtidigUttak) ||
        erSamtidigUttakFørFødsel(values, familiehendelsesdato)
            ? getSamtidigUttaksProsentWLB(
                  convertYesOrNoOrUndefinedToBoolean(values.skalHaGradering),
                  values.stillingsprosent
              )
            : samtidigUttakProsentInputVerdi;

    const periode: Uttaksperiode = {
        id,
        forelder: values.hvemSkalTaUttak as Forelder,
        konto: values.konto as StønadskontoType,
        tidsperiode: {
            fom: values.fom!,
            tom: values.tom!,
        },
        type: Periodetype.Uttak,
        arbeidsformer: hasValue(values.arbeidsformer)
            ? getArbeidsform([values.arbeidsformer as Arbeidsform])
            : undefined,
        morsAktivitetIPerioden: getMorsAktivitet(
            values.aktivitetskravMor,
            convertYesOrNoOrUndefinedToBoolean(values.erMorForSyk)
        ),

        erArbeidstaker: getErArbeidstaker(
            hasValue(values.arbeidsformer) ? getArbeidsform([values.arbeidsformer as Arbeidsform]) : []
        ),
        erMorForSyk: morErForSyk,
        gradert: convertYesOrNoOrUndefinedToBoolean(values.skalHaGradering),
        harIkkeAktivitetskrav: values.konto === StønadskontoType.AktivitetsfriKvote ? true : undefined,
        orgnumre: getOrgnummer(hasValue(values.arbeidsformer) ? [values.arbeidsformer as Arbeidsform] : []),
        stillingsprosent: hasValue(values.stillingsprosent) ? trimNumberValue(values.stillingsprosent!) : undefined,
        ønskerFlerbarnsdager: convertYesOrNoOrUndefinedToBoolean(values.ønskerFlerbarnsdager),
        ønskerSamtidigUttak: erSamtidigUttak,
        samtidigUttakProsent: samtidigUttakProsentVerdi,
        vedlegg: skalVedleggPåkreves(
            values.aktivitetskravMor,
            convertYesOrNoOrUndefinedToBoolean(values.erMorForSyk) || false
        )
            ? lagSendSenereDokumentNårIngenAndreFinnes(relevantVedlegg, attachmentType, skjemanummer)
            : [],
    };

    return periode;
};
