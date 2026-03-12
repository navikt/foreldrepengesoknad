import dayjs from 'dayjs';

import {
    Arbeidsform,
    Oppholdsperiode,
    Overføringsperiode,
    Periode,
    Periodetype,
    Situasjon,
    TidsperiodeDate,
    UttakRundtFødselÅrsak,
    Uttaksperiode,
    isOppholdsperiode,
    isOverføringsperiode,
    isUttaksperiode,
} from '@navikt/fp-common';
import {
    BrukerRolleSak_fpoversikt,
    KontoTypeUttak,
    Oppholdsårsak,
    UttakOverføringÅrsak_fpoversikt,
} from '@navikt/fp-types';
import { trimNumberValue } from '@navikt/fp-utils';

import { QuestionVisibility, YesOrNo } from '../../../formik-wrappers';
import { convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from '../../../utils/formUtils';
import { getMorsAktivitet } from '../../../utils/morsAktivitetUtils';
import { getOppholdsÅrsakFromStønadskonto, getStønadskontoFromOppholdsårsak } from '../../../utils/periodeUtils';
import { getSisteUttaksdag6UkerEtterFødsel } from '../../../utils/wlbUtils';
import { PeriodeUttakFormData, PeriodeUttakFormField } from './periodeUttakFormConfig';
import {
    erSamtidigUttakFarMedmorFørFødselWLB,
    erSamtidigUttakFarMedmorFørFørsteSeksUkerWLB,
} from './periodeUttakFormQuestionsConfig';

const hasValue = (value: unknown) => value !== '' && value !== undefined && value !== null;

const isBrukerRolle = (value: unknown): value is BrukerRolleSak_fpoversikt => value === 'MOR' || value === 'FAR_MEDMOR';

function requireBrukerRolle(
    value: PeriodeUttakFormData[PeriodeUttakFormField.hvemSkalTaUttak] | undefined,
    fieldName: string,
): BrukerRolleSak_fpoversikt {
    if (!isBrukerRolle(value)) {
        throw new Error(`${fieldName} må være satt til MOR eller FAR_MEDMOR`);
    }
    return value;
}

function requireKontoType(
    value: PeriodeUttakFormData[PeriodeUttakFormField.konto] | undefined,
    fieldName: string,
): KontoTypeUttak {
    if (value === undefined || value === '') {
        throw new Error(`${fieldName} må være satt`);
    }
    return value;
}

function requireOverføringsårsak(
    value: PeriodeUttakFormData[PeriodeUttakFormField.overføringsårsak] | undefined,
): UttakOverføringÅrsak_fpoversikt {
    if (value === undefined || value === '') {
        throw new Error('overføringsårsak må være satt');
    }
    return value;
}

function requireOppholdsårsak(konto: KontoTypeUttak): Oppholdsårsak {
    const oppholdsårsak = getOppholdsÅrsakFromStønadskonto(konto);
    if (!oppholdsårsak) {
        throw new Error('Kunne ikke mappe konto til oppholdsårsak');
    }
    return oppholdsårsak;
}

function requireDate(value: Date | undefined, fieldName: string): Date {
    if (value === undefined) {
        throw new Error(`${fieldName} må være satt`);
    }
    return value;
}

const getInitialKonto = (
    erDeltUttak: boolean,
    erMorUfør: boolean,
    periodenStarterFørFamdato: boolean,
    erFarEllerMedmor: boolean,
): KontoTypeUttak | '' => {
    if (erDeltUttak) {
        if (periodenStarterFørFamdato && erFarEllerMedmor) {
            return 'FEDREKVOTE';
        }

        return '';
    }

    if (erFarEllerMedmor && periodenStarterFørFamdato) {
        return 'AKTIVITETSFRI_KVOTE';
    }

    if (erMorUfør) {
        return '';
    }

    return 'FORELDREPENGER';
};

const getHvemSkalTaUttak = (
    erDeltUttak: boolean,
    forelder: BrukerRolleSak_fpoversikt,
    periodenStarterFørFamdato: boolean,
    erFarEllerMedmor: boolean,
    annenForelderHarRettIEØS: boolean,
) => {
    if (erDeltUttak) {
        if ((periodenStarterFørFamdato || annenForelderHarRettIEØS) && erFarEllerMedmor) {
            return 'FAR_MEDMOR';
        }
        if (annenForelderHarRettIEØS) {
            return erFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR';
        }

        return '';
    }

    return forelder;
};

const getInitialValues = (
    erDeltUttak: boolean,
    forelder: BrukerRolleSak_fpoversikt,
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
    forelder: BrukerRolleSak_fpoversikt,
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
    forelder: BrukerRolleSak_fpoversikt,
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
        return arbeidsformer[0]!;
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
        ? (100 - Number.parseFloat(trimNumberValue(dekningsgrad))).toString()
        : '100';
};

const getKontoVerdi = (
    samtidigWLBUttakFørFødselFarMedmor: boolean,
    erFarEllerMedmor: boolean,
    erDeltUttak: boolean,
    startDato: Date,
    inputKonto: KontoTypeUttak,
    familiehendelsesdato: Date,
    harAktivitetsfriKvote: boolean,
): KontoTypeUttak => {
    if (samtidigWLBUttakFørFødselFarMedmor) {
        return 'FEDREKVOTE';
    }
    if (
        !erDeltUttak &&
        erFarEllerMedmor &&
        dayjs(startDato).isBefore(familiehendelsesdato, 'day') &&
        harAktivitetsfriKvote
    ) {
        return 'AKTIVITETSFRI_KVOTE';
    }

    return inputKonto;
};

const getForelderForPeriode = (
    angittForelder: PeriodeUttakFormData[PeriodeUttakFormField.hvemSkalTaUttak] | undefined,
    tidsperiode: TidsperiodeDate,
    erFarEllerMedmor: boolean,
    erDeltUttak: boolean,
    familiehendelsesdato: Date,
): BrukerRolleSak_fpoversikt => {
    const sisteUttaksdag6UkerEtterFødsel = getSisteUttaksdag6UkerEtterFødsel(familiehendelsesdato);

    if (
        dayjs(tidsperiode.fom).isSameOrBefore(sisteUttaksdag6UkerEtterFødsel, 'day') &&
        erFarEllerMedmor &&
        erDeltUttak &&
        angittForelder === ''
    ) {
        return 'FAR_MEDMOR';
    }

    return requireBrukerRolle(angittForelder, 'hvemSkalTaUttak');
};

export const mapPeriodeUttakFormToPeriode = (
    values: Partial<PeriodeUttakFormData>,
    id: string,
    type: Periodetype,
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    erDeltUttak: boolean,
    situasjon: Situasjon,
    harAktivitetsfriKvote: boolean,
): Periode => {
    const fom = requireDate(values.fom, 'fom');
    const tom = requireDate(values.tom, 'tom');

    if (type === Periodetype.Overføring) {
        const konto = requireKontoType(values.konto, 'konto');
        const overføringsårsak = requireOverføringsårsak(values.overføringsårsak);

        const periode: Overføringsperiode = {
            id,
            type,
            forelder: getForelderForPeriode(
                values.hvemSkalTaUttak,
                {
                    fom,
                    tom,
                },
                erFarEllerMedmor,
                erDeltUttak,
                familiehendelsesdato,
            ),
            konto,
            tidsperiode: {
                fom,
                tom,
            },
            årsak: overføringsårsak,
        };

        return periode;
    }

    if (type === Periodetype.Opphold) {
        const forelder = requireBrukerRolle(values.hvemSkalTaUttak, 'hvemSkalTaUttak');
        const konto = requireKontoType(values.konto, 'konto');

        const periode: Oppholdsperiode = {
            id,
            type,
            forelder,
            årsak: requireOppholdsårsak(konto),
            tidsperiode: {
                fom,
                tom,
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

    const forelderVerdi = (() => {
        if (samtidigWLBUttakFørFørsteSeksUkerFarMedmor) {
            return 'FAR_MEDMOR' as const;
        }

        return requireBrukerRolle(values.hvemSkalTaUttak, 'hvemSkalTaUttak');
    })();

    const konto = requireKontoType(values.konto, 'konto');

    const kontoVerdi = getKontoVerdi(
        samtidigWLBUttakFørFødselFarMedmor,
        erFarEllerMedmor,
        erDeltUttak,
        fom,
        konto,
        familiehendelsesdato,
        harAktivitetsfriKvote,
    );

    const periode: Uttaksperiode = {
        id,
        forelder: forelderVerdi,
        konto: kontoVerdi,
        tidsperiode: {
            fom,
            tom,
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
        harIkkeAktivitetskrav: values.konto === 'AKTIVITETSFRI_KVOTE' ? true : undefined,
        orgnumre: getOrgnummer(hasValue(values.arbeidsformer) ? [values.arbeidsformer as Arbeidsform] : []),
        stillingsprosent: hasValue(values.stillingsprosent) ? trimNumberValue(values.stillingsprosent!) : undefined,
        ønskerFlerbarnsdager: convertYesOrNoOrUndefinedToBoolean(values.ønskerFlerbarnsdager),
        ønskerSamtidigUttak: erSamtidigUttak,
        samtidigUttakProsent: samtidigUttakProsentVerdi,
    };

    return periode;
};
