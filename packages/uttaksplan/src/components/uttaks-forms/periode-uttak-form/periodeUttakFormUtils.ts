import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import dayjs from 'dayjs';

import {
    Arbeidsform,
    Forelder,
    Oppholdsperiode,
    Overføringsperiode,
    OverføringÅrsakType,
    Periode,
    Periodetype,
    Situasjon,
    StønadskontoType,
    TidsperiodeDate,
    UttakRundtFødselÅrsak,
    Uttaksperiode,
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
    getMorsAktivitet,
    getOppholdsÅrsakFromStønadskonto,
    getSisteUttaksdag6UkerEtterFødsel,
    getStønadskontoFromOppholdsårsak,
    hasValue,
    isOppholdsperiode,
    isOverføringsperiode,
    isUttaksperiode,
    trimNumberValue,
} from '@navikt/fp-common';
import { YesOrNo } from '@navikt/fp-formik';

import { PeriodeUttakFormData, PeriodeUttakFormField } from './periodeUttakFormConfig';
import {
    erSamtidigUttakFarMedmorFørFødselWLB,
    erSamtidigUttakFarMedmorFørFørsteSeksUkerWLB,
} from './periodeUttakFormQuestionsConfig';

const getInitialKonto = (
    erDeltUttak: boolean,
    erMorUfør: boolean,
    periodenStarterFørFamdato: boolean,
    erFarEllerMedmor: boolean,
) => {
    if (erDeltUttak) {
        if (periodenStarterFørFamdato && erFarEllerMedmor) {
            return StønadskontoType.Fedrekvote;
        }

        return '';
    }

    if (erFarEllerMedmor && periodenStarterFørFamdato) {
        return StønadskontoType.AktivitetsfriKvote;
    }

    if (erMorUfør) {
        return '';
    }

    return StønadskontoType.Foreldrepenger;
};

const getHvemSkalTaUttak = (
    erDeltUttak: boolean,
    forelder: Forelder,
    periodenStarterFørFamdato: boolean,
    erFarEllerMedmor: boolean,
    annenForelderHarRettIEØS: boolean,
) => {
    if (erDeltUttak) {
        if ((periodenStarterFørFamdato || annenForelderHarRettIEØS) && erFarEllerMedmor) {
            return Forelder.farMedmor;
        }
        if (annenForelderHarRettIEØS) {
            return erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
        }

        return '';
    }

    return forelder;
};

const getInitialValues = (
    erDeltUttak: boolean,
    forelder: Forelder,
    erMorUfør: boolean,
    familiehendelsesdato: Date,
    startdatoPeriode: Date | undefined,
    erFarEllerMedmor: boolean,
    annenForelderHarRettIEØS: boolean,
): PeriodeUttakFormData => {
    const periodenStarterFørFamdato = startdatoPeriode
        ? dayjs(startdatoPeriode).isBefore(familiehendelsesdato, 'day')
        : false;
    const hvemSkalTaUttak = getHvemSkalTaUttak(
        erDeltUttak,
        forelder,
        periodenStarterFørFamdato,
        erFarEllerMedmor,
        annenForelderHarRettIEØS,
    );
    const konto = getInitialKonto(erDeltUttak, erMorUfør, periodenStarterFørFamdato, erFarEllerMedmor);

    return {
        [PeriodeUttakFormField.fom]: undefined,
        [PeriodeUttakFormField.tom]: undefined,
        [PeriodeUttakFormField.konto]: konto,
        [PeriodeUttakFormField.samtidigUttak]: YesOrNo.UNANSWERED,
        [PeriodeUttakFormField.aktivitetskravMor]: '',
        [PeriodeUttakFormField.overføringsårsak]: '',
        [PeriodeUttakFormField.skalHaGradering]: YesOrNo.UNANSWERED,
        [PeriodeUttakFormField.stillingsprosent]: '',
        [PeriodeUttakFormField.arbeidsformer]: '',
        [PeriodeUttakFormField.erMorForSyk]: YesOrNo.UNANSWERED,
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
    erMorUfør: boolean,
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    annenForelderHarRettIEØS: boolean,
): PeriodeUttakFormData => {
    const initialValues = getInitialValues(
        erDeltUttak,
        forelder,
        erMorUfør,
        familiehendelsesdato,
        values.fom,
        erFarEllerMedmor,
        annenForelderHarRettIEØS,
    );

    const cleanedData: PeriodeUttakFormData = {
        fom: values.fom,
        tom: values.tom,
        hvemSkalTaUttak: values.hvemSkalTaUttak,
        aktivitetskravMor: visibility.isVisible(PeriodeUttakFormField.aktivitetskravMor)
            ? values.aktivitetskravMor
            : '',
        erMorForSyk: visibility.isVisible(PeriodeUttakFormField.erMorForSyk)
            ? values.erMorForSyk
            : initialValues.erMorForSyk,
        uttakRundtFødselÅrsak: visibility.isVisible(PeriodeUttakFormField.uttakRundtFødselÅrsak)
            ? values.uttakRundtFødselÅrsak
            : initialValues.uttakRundtFødselÅrsak,
        arbeidsformer: visibility.isVisible(PeriodeUttakFormField.arbeidsformer) ? values.arbeidsformer : '',
        konto: values.konto,
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
    ønskerSamtidigUttak: boolean | undefined,
    erDeltUttak: boolean,
): UttakRundtFødselÅrsak | undefined => {
    if (!erDeltUttak) {
        return undefined;
    }
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
    erMorUfør: boolean,
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    annenForelderHarRettIEØS: boolean,
): PeriodeUttakFormData => {
    const initialValues = getInitialValues(
        erDeltUttak,
        forelder,
        erMorUfør,
        familiehendelsesdato,
        periode.tidsperiode.fom,
        erFarEllerMedmor,
        annenForelderHarRettIEØS,
    );

    if (periode !== undefined) {
        if (isUttaksperiode(periode)) {
            return {
                ...initialValues,
                fom: periode.tidsperiode.fom,
                tom: periode.tidsperiode.tom,
                aktivitetskravMor: periode.morsAktivitetIPerioden || '',
                erMorForSyk: convertBooleanOrUndefinedToYesOrNo(periode.erMorForSyk),
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
                    getInitialÅrsakForUttakRundtFødsel(periode.erMorForSyk, periode.ønskerSamtidigUttak, erDeltUttak) ||
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
    dekningsgrad: string | undefined,
): string => {
    return ønskerGradering && dekningsgrad !== undefined
        ? (100 - parseFloat(trimNumberValue(dekningsgrad))).toString()
        : '100';
};

const getKontoVerdi = (
    samtidigWLBUttakFørFødselFarMedmor: boolean,
    erFarEllerMedmor: boolean,
    erDeltUttak: boolean,
    startDato: Date,
    inputKonto: StønadskontoType,
    familiehendelsesdato: Date,
): StønadskontoType => {
    if (samtidigWLBUttakFørFødselFarMedmor) {
        return StønadskontoType.Fedrekvote;
    }
    if (!erDeltUttak && erFarEllerMedmor && dayjs(startDato).isBefore(familiehendelsesdato, 'day')) {
        return StønadskontoType.AktivitetsfriKvote;
    }

    return inputKonto;
};

const getForelderForPeriode = (
    angittForelder: Forelder,
    tidsperiode: TidsperiodeDate,
    erFarEllerMedmor: boolean,
    erDeltUttak: boolean,
    familiehendelsesdato: Date,
): Forelder => {
    const sisteUttaksdag6UkerEtterFødsel = getSisteUttaksdag6UkerEtterFødsel(familiehendelsesdato);

    if (
        dayjs(tidsperiode.fom).isSameOrBefore(sisteUttaksdag6UkerEtterFødsel, 'day') &&
        erFarEllerMedmor &&
        erDeltUttak &&
        (angittForelder as any) === ''
    ) {
        return Forelder.farMedmor;
    }

    return angittForelder;
};

export const mapPeriodeUttakFormToPeriode = (
    values: Partial<PeriodeUttakFormData>,
    id: string,
    type: Periodetype,
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    erDeltUttak: boolean,
    situasjon: Situasjon,
): Periode => {
    if (type === Periodetype.Overføring) {
        const periode: Overføringsperiode = {
            id,
            type,
            forelder: getForelderForPeriode(
                values.hvemSkalTaUttak as Forelder,
                {
                    fom: values.fom!,
                    tom: values.tom!,
                },
                erFarEllerMedmor,
                erDeltUttak,
                familiehendelsesdato,
            ),
            konto: values.konto as StønadskontoType,
            tidsperiode: {
                fom: values.fom!,
                tom: values.tom!,
            },
            årsak: values.overføringsårsak as OverføringÅrsakType,
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
    const samtidigWLBUttakFørFødselFarMedmor = erSamtidigUttakFarMedmorFørFødselWLB(
        values,
        familiehendelsesdato,
        erFarEllerMedmor,
        erDeltUttak,
        situasjon,
    );
    const samtidigWLBUttakFørFørsteSeksUkerFarMedmor = erSamtidigUttakFarMedmorFørFørsteSeksUkerWLB(
        values,
        familiehendelsesdato,
        erFarEllerMedmor,
        erDeltUttak,
        situasjon,
    );

    const morErForSyk =
        hasValue(values.uttakRundtFødselÅrsak) && values.uttakRundtFødselÅrsak === UttakRundtFødselÅrsak.morErForSyk
            ? true
            : convertYesOrNoOrUndefinedToBoolean(values.erMorForSyk);

    const erSamtidigUttak =
        values.uttakRundtFødselÅrsak === UttakRundtFødselÅrsak.samtidigUttak || samtidigWLBUttakFørFødselFarMedmor
            ? true
            : convertYesOrNoOrUndefinedToBoolean(values.samtidigUttak);

    const samtidigUttakProsentInputVerdi = hasValue(values.samtidigUttakProsent)
        ? trimNumberValue(values.samtidigUttakProsent!)
        : undefined;

    const samtidigUttakProsentVerdi =
        values.uttakRundtFødselÅrsak === UttakRundtFødselÅrsak.samtidigUttak || samtidigWLBUttakFørFødselFarMedmor
            ? getSamtidigUttaksProsentWLB(
                  convertYesOrNoOrUndefinedToBoolean(values.skalHaGradering),
                  values.stillingsprosent,
              )
            : samtidigUttakProsentInputVerdi;

    const forelderVerdi = samtidigWLBUttakFørFørsteSeksUkerFarMedmor
        ? Forelder.farMedmor
        : (values.hvemSkalTaUttak as Forelder);

    const kontoVerdi = getKontoVerdi(
        samtidigWLBUttakFørFødselFarMedmor,
        erFarEllerMedmor,
        erDeltUttak,
        values.fom!,
        values.konto as StønadskontoType,
        familiehendelsesdato,
    );

    const periode: Uttaksperiode = {
        id,
        forelder: forelderVerdi,
        konto: kontoVerdi,
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
            convertYesOrNoOrUndefinedToBoolean(values.erMorForSyk),
        ),

        erArbeidstaker: getErArbeidstaker(
            hasValue(values.arbeidsformer) ? getArbeidsform([values.arbeidsformer as Arbeidsform]) : [],
        ),
        erMorForSyk: morErForSyk,
        gradert: convertYesOrNoOrUndefinedToBoolean(values.skalHaGradering),
        harIkkeAktivitetskrav: values.konto === StønadskontoType.AktivitetsfriKvote ? true : undefined,
        orgnumre: getOrgnummer(hasValue(values.arbeidsformer) ? [values.arbeidsformer as Arbeidsform] : []),
        stillingsprosent: hasValue(values.stillingsprosent) ? trimNumberValue(values.stillingsprosent!) : undefined,
        ønskerFlerbarnsdager: convertYesOrNoOrUndefinedToBoolean(values.ønskerFlerbarnsdager),
        ønskerSamtidigUttak: erSamtidigUttak,
        samtidigUttakProsent: samtidigUttakProsentVerdi,
    };

    return periode;
};
