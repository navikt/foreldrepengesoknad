import { hasValue } from '@navikt/fp-common';
import {
    TilretteleggingFormData,
    TilretteleggingFormField,
    DelivisTilretteleggingPeriodeType,
} from './tilretteleggingStepFormConfig';
import { Tilrettelegging, TilretteleggingInput, Tilretteleggingstype } from 'app/types/Tilrettelegging';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-common/src/common/utils/stringUtils';

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
        },
    ],
});

export const erTilretteleggingFerdigUtfylt = (tilrettelegging: Tilrettelegging) => {
    return (
        tilrettelegging.behovForTilretteleggingFom !== undefined &&
        tilrettelegging.tilrettelegginger &&
        tilrettelegging.tilrettelegginger.length !== 0
    );
};

export const getTilretteleggingInitialValuesEnPeriode = (
    behovFom: string,
    tilretteleggingPeriode: TilretteleggingInput,
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
    tilretteleggingPerioder: TilretteleggingInput[],
    defaultValues: Readonly<TilretteleggingFormData>,
    tiltak: string | undefined
): TilretteleggingFormData => {
    const values = {
        ...defaultValues,
        behovForTilretteleggingFom: behovFom,
        tilretteleggingType: Tilretteleggingstype.DELVIS,
        delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER,
        variertePerioder: tilretteleggingPerioder,
        tilretteleggingstiltak: tiltak || defaultValues.tilretteleggingstiltak,
    };
    return values;
};

export const getTilretteleggingInitialValues = (tilrettelegging: Tilrettelegging): TilretteleggingFormData => {
    const initValues = getInitTilretteleggingFormDataValues();
    if (!erTilretteleggingFerdigUtfylt(tilrettelegging)) {
        return initValues;
    } else {
        const antallPerioder = tilrettelegging.tilrettelegginger.length;
        if (antallPerioder === 1) {
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
                tilrettelegging.arbeidsforhold.tilretteleggingstiltak
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

const getTilretteleggingsPerioderFromInput = (values: TilretteleggingFormData): TilretteleggingInput[] => {
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
        return values.variertePerioder;
    }
};

export const mapOmTilretteleggingFormDataToState = (
    id: string,
    values: Partial<TilretteleggingFormData>,
    tilretteleggingFraState: Tilrettelegging[]
): Tilrettelegging[] => {
    const tilretteleggingForOppdatering = tilretteleggingFraState.find((t) => t.id === id);
    const tilrettelegginsperioder = getTilretteleggingsPerioderFromInput(values as TilretteleggingFormData);
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
