import { hasValue } from '@navikt/fp-common';
import {
    TilretteleggingFormData,
    TilretteleggingFormField,
    DelivisTilretteleggingPeriodeType,
} from './tilretteleggingStepFormConfig';
import {
    Tilrettelegging,
    PeriodeMedTilrettelegging,
    Tilretteleggingstype,
    PeriodeMedVariasjonInput,
    TilOgMedDatoType,
} from 'app/types/Tilrettelegging';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-common/src/common/utils/stringUtils';
import { treUkerSiden } from 'app/utils/dateUtils';
import dayjs from 'dayjs';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';

export const getInitTilretteleggingFormDataValues = (): Readonly<TilretteleggingFormData> => ({
    [TilretteleggingFormField.behovForTilretteleggingFom]: '',
    [TilretteleggingFormField.tilretteleggingType]: undefined!,
    [TilretteleggingFormField.delvisTilretteleggingPeriodeType]: undefined!,
    [TilretteleggingFormField.sammePeriodeFremTilTerminFom]: '',
    [TilretteleggingFormField.sammePeriodeFremTilTerminStillingsprosent]: '',
    [TilretteleggingFormField.tilretteleggingstiltak]: '',
    [TilretteleggingFormField.variertePerioder]: [
        {
            type: Tilretteleggingstype.DELVIS,
            fom: '',
            tom: '',
            stillingsprosent: '',
            tomType: undefined!,
        },
    ],
});

const mapVariertPeriodeValuesToState = (
    inputPeriode: PeriodeMedVariasjonInput,
    treUkerFørFødselEllerTermin: string
): PeriodeMedTilrettelegging => {
    return {
        fom: inputPeriode.fom,
        tom:
            inputPeriode.tomType === TilOgMedDatoType.TRE_UKER_FØR_TERMIN
                ? treUkerFørFødselEllerTermin
                : inputPeriode.tom,
        stillingsprosent: inputPeriode.stillingsprosent,
        type: inputPeriode.type,
    };
};

export const mapPeriodeMedTilretteleggingTilVariertPeriode = (
    periode: PeriodeMedTilrettelegging,
    termindato: Date,
    fødselsdato: Date | undefined
): PeriodeMedVariasjonInput => {
    const treUkerFørFødselEllerTermin = treUkerSiden(fødselsdato || termindato);
    const tomErSammeSomTreUkerFørFødselEllerTermin = dayjs(treUkerFørFødselEllerTermin).isSame(dayjs(periode.tom), 'd');
    return {
        fom: periode.fom,
        tom: tomErSammeSomTreUkerFørFødselEllerTermin ? undefined : periode.tom,
        stillingsprosent: periode.stillingsprosent,
        type: periode.type,
        tomType: tomErSammeSomTreUkerFørFødselEllerTermin
            ? TilOgMedDatoType.TRE_UKER_FØR_TERMIN
            : TilOgMedDatoType.VALGFRI_DATO,
    };
};

export const erTilretteleggingFerdigUtfylt = (tilrettelegging: Tilrettelegging) => {
    return (
        tilrettelegging.behovForTilretteleggingFom !== undefined &&
        tilrettelegging.tilrettelegginger &&
        tilrettelegging.tilrettelegginger.length !== 0
    );
};

export const getTilretteleggingInitialValuesEnPeriode = (
    behovFom: string,
    tilretteleggingPeriode: PeriodeMedTilrettelegging,
    defaultValues: Readonly<TilretteleggingFormData>,
    tiltak: string | undefined
): TilretteleggingFormData => {
    const values = {
        ...defaultValues,
        behovForTilretteleggingFom: behovFom,
        tilretteleggingType: tilretteleggingPeriode.type
            ? tilretteleggingPeriode.type
            : defaultValues.tilretteleggingType,
        delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN,
        sammePeriodeFremTilTerminFom: tilretteleggingPeriode.fom,
        sammePeriodeFremTilTerminStillingsprosent:
            tilretteleggingPeriode.type === Tilretteleggingstype.DELVIS
                ? tilretteleggingPeriode.stillingsprosent!.toString()
                : defaultValues.sammePeriodeFremTilTerminStillingsprosent,
        tilretteleggingstiltak: tiltak || defaultValues.tilretteleggingstiltak,
    };
    return values;
};

export const getTilretteleggingInitialVariertePerioder = (
    behovFom: string,
    tilretteleggingPerioder: PeriodeMedTilrettelegging[],
    defaultValues: Readonly<TilretteleggingFormData>,
    tiltak: string | undefined,
    termindato: Date,
    fødselsdato: Date | undefined
): TilretteleggingFormData => {
    const values = {
        ...defaultValues,
        behovForTilretteleggingFom: behovFom,
        tilretteleggingType: Tilretteleggingstype.DELVIS,
        delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER,
        variertePerioder: tilretteleggingPerioder.map((periode) =>
            mapPeriodeMedTilretteleggingTilVariertPeriode(periode, termindato, fødselsdato)
        ),
        tilretteleggingstiltak: tiltak || defaultValues.tilretteleggingstiltak,
    };
    return values;
};

export const getTilretteleggingInitialValues = (
    tilrettelegging: Tilrettelegging,
    termindato: Date,
    fødselsdato: Date | undefined
): TilretteleggingFormData => {
    const initValues = getInitTilretteleggingFormDataValues();
    if (!erTilretteleggingFerdigUtfylt(tilrettelegging)) {
        return initValues;
    } else {
        const antallPerioder = tilrettelegging.tilrettelegginger.length;
        if (antallPerioder === 1 && tilrettelegging.tilrettelegginger[0].tom === undefined) {
            return getTilretteleggingInitialValuesEnPeriode(
                tilrettelegging.behovForTilretteleggingFom!,
                tilrettelegging.tilrettelegginger[0],
                initValues,
                tilrettelegging.arbeidsforhold.tilretteleggingstiltak
            );
        } else {
            return getTilretteleggingInitialVariertePerioder(
                tilrettelegging.behovForTilretteleggingFom!,
                tilrettelegging.tilrettelegginger,
                initValues,
                tilrettelegging.arbeidsforhold.tilretteleggingstiltak,
                termindato,
                fødselsdato
            );
        }
    }
};

const getSkalHaSammePeriodeFremTilTermin = (
    tilretteleggingType: Tilretteleggingstype,
    delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType
) => {
    return (
        tilretteleggingType === Tilretteleggingstype.INGEN ||
        (tilretteleggingType === Tilretteleggingstype.DELVIS &&
            delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN)
    );
};

const getTilretteleggingsPerioderFromInput = (
    values: TilretteleggingFormData,
    termindato: Date,
    fødselsdato: Date | undefined
): PeriodeMedTilrettelegging[] => {
    if (getSkalHaSammePeriodeFremTilTermin(values.tilretteleggingType, values.delvisTilretteleggingPeriodeType)) {
        return [
            {
                type: values.tilretteleggingType,
                fom: values.sammePeriodeFremTilTerminFom,
                stillingsprosent:
                    values.tilretteleggingType === Tilretteleggingstype.DELVIS
                        ? values.sammePeriodeFremTilTerminStillingsprosent
                        : undefined,
            },
        ];
    } else {
        const treUkerFørFødselEllerTermin = treUkerSiden(fødselsdato || termindato);
        return values.variertePerioder.map((p) =>
            mapVariertPeriodeValuesToState(p, dateToISOString(treUkerFørFødselEllerTermin))
        );
    }
};

export const mapOmTilretteleggingFormDataToState = (
    id: string,
    values: Partial<TilretteleggingFormData>,
    tilretteleggingFraState: Tilrettelegging[],
    termindato: Date,
    fødselsdato: Date | undefined
): Tilrettelegging[] => {
    const tilretteleggingForOppdatering = tilretteleggingFraState.find((t) => t.id === id);
    const tilrettelegginsperioder = getTilretteleggingsPerioderFromInput(
        values as TilretteleggingFormData,
        termindato,
        fødselsdato
    );
    const oppdatert = {
        ...tilretteleggingForOppdatering,
        behovForTilretteleggingFom: values.behovForTilretteleggingFom,
        tilrettelegginger: tilrettelegginsperioder,
        arbeidsforhold: {
            ...tilretteleggingForOppdatering!.arbeidsforhold,
            tilretteleggingstiltak: hasValue(values.tilretteleggingstiltak)
                ? replaceInvisibleCharsWithSpace(values.tilretteleggingstiltak!)
                : undefined,
        },
    } as Tilrettelegging;
    const nyTilretteleggingISøknad = tilretteleggingFraState.map((t) => {
        return t.id === id ? oppdatert : t;
    });
    return nyTilretteleggingISøknad;
};
