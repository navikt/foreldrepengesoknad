import { hasValue } from '@navikt/fp-common';
import { TilretteleggingFormData, TilretteleggingFormField } from './tilretteleggingStepFormConfig';
import { Tilrettelegging, Tilretteleggingstype } from 'app/types/Tilrettelegging';
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
            tomType: undefined!,
        },
    ],
});

export const getTilretteleggingInitialValues = (tilrettelegging: Tilrettelegging): TilretteleggingFormData => {
    const initValues = getInitTilretteleggingFormDataValues();
    return {
        behovForTilretteleggingFom: tilrettelegging.behovForTilretteleggingFom || initValues.behovForTilretteleggingFom,
        tilretteleggingType: tilrettelegging.type || initValues.tilretteleggingType,
        delvisTilretteleggingPeriodeType:
            tilrettelegging.delvisTilretteleggingPeriodeType || initValues.delvisTilretteleggingPeriodeType,
        variertePerioder:
            tilrettelegging.variertePerioder && tilrettelegging.variertePerioder.length > 0
                ? tilrettelegging.variertePerioder
                : initValues.variertePerioder,
        tilretteleggingstiltak:
            tilrettelegging.arbeidsforhold.tilretteleggingstiltak || initValues.tilretteleggingstiltak,
        sammePeriodeFremTilTerminFom:
            tilrettelegging.sammePeriodeFremTilTerminFom || initValues.sammePeriodeFremTilTerminFom,
        sammePeriodeFremTilTerminStillingsprosent:
            tilrettelegging.sammePeriodeFremTilTerminStillingsprosent ||
            initValues.sammePeriodeFremTilTerminStillingsprosent,
    };
};

export const mapOmTilretteleggingFormDataToState = (
    id: string,
    values: Partial<TilretteleggingFormData>,
    tilretteleggingFraState: Tilrettelegging[]
): Tilrettelegging[] => {
    const tilretteleggingForOppdatering = tilretteleggingFraState.find((t) => t.id === id);

    const oppdatert = {
        ...tilretteleggingForOppdatering,
        behovForTilretteleggingFom: values.behovForTilretteleggingFom,
        arbeidsforhold: {
            ...tilretteleggingForOppdatering!.arbeidsforhold,
            tilretteleggingstiltak: hasValue(values.tilretteleggingstiltak)
                ? replaceInvisibleCharsWithSpace(values.tilretteleggingstiltak!)
                : undefined,
        },
        type: values.tilretteleggingType,
        sammePeriodeFremTilTerminFom: values.sammePeriodeFremTilTerminFom,
        sammePeriodeFremTilTerminStillingsprosent: values.sammePeriodeFremTilTerminStillingsprosent,
        delvisTilretteleggingPeriodeType: values.delvisTilretteleggingPeriodeType,
        variertePerioder: values.variertePerioder,
    } as Tilrettelegging;

    const nyTilretteleggingISøknad = tilretteleggingFraState.map((t) => {
        return t.id === id ? oppdatert : t;
    });
    return nyTilretteleggingISøknad;
};
