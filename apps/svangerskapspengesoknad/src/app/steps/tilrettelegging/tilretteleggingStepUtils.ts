import { hasValue } from '@navikt/fp-common';
import { TilretteleggingFormData, TilretteleggingFormField } from './tilretteleggingStepFormConfig';
import { Tilrettelegging } from 'app/types/Tilrettelegging';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-common/src/common/utils/stringUtils';
import { QuestionVisibility } from '@navikt/sif-common-formik-ds/lib';

export const getInitTilretteleggingFormDataValues = (): Readonly<TilretteleggingFormData> => ({
    [TilretteleggingFormField.behovForTilretteleggingFom]: '',
    [TilretteleggingFormField.tilretteleggingType]: undefined!,
    [TilretteleggingFormField.delvisTilretteleggingPeriodeType]: undefined!,
    [TilretteleggingFormField.sammePeriodeFremTilTerminFom]: undefined,
    [TilretteleggingFormField.sammePeriodeFremTilTerminStillingsprosent]: undefined,
    [TilretteleggingFormField.risikofaktorer]: undefined,
    [TilretteleggingFormField.tilretteleggingstiltak]: undefined,
});

export const getTilretteleggingInitialValues = (tilrettelegging: Tilrettelegging): TilretteleggingFormData => {
    const initValues = getInitTilretteleggingFormDataValues();
    return {
        behovForTilretteleggingFom: tilrettelegging.behovForTilretteleggingFom || initValues.behovForTilretteleggingFom,
        tilretteleggingType: tilrettelegging.type || initValues.tilretteleggingType,
        delvisTilretteleggingPeriodeType:
            tilrettelegging.delvisTilretteleggingPeriodeType || initValues.delvisTilretteleggingPeriodeType,
        risikofaktorer: tilrettelegging.risikofaktorer || initValues.risikofaktorer,
        tilretteleggingstiltak: tilrettelegging.tilretteleggingstiltak || initValues.tilretteleggingstiltak,
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
    tilretteleggingFraState: Tilrettelegging[],
): Tilrettelegging[] => {
    const tilretteleggingForOppdatering = tilretteleggingFraState.find((t) => t.id === id);
    const oppdatert = {
        ...tilretteleggingForOppdatering,
        behovForTilretteleggingFom: values.behovForTilretteleggingFom,
        arbeidsforhold: {
            ...tilretteleggingForOppdatering!.arbeidsforhold,
        },
        type: values.tilretteleggingType,
        sammePeriodeFremTilTerminFom: values.sammePeriodeFremTilTerminFom,
        sammePeriodeFremTilTerminStillingsprosent: values.sammePeriodeFremTilTerminStillingsprosent,
        delvisTilretteleggingPeriodeType: values.delvisTilretteleggingPeriodeType,
        risikofaktorer: hasValue(values.risikofaktorer)
            ? replaceInvisibleCharsWithSpace(values.risikofaktorer!)
            : undefined,
        tilretteleggingstiltak: hasValue(values.tilretteleggingstiltak)
            ? replaceInvisibleCharsWithSpace(values.tilretteleggingstiltak!)
            : undefined,
    } as Tilrettelegging;

    const nyTilretteleggingISøknad = tilretteleggingFraState.map((t) => {
        return t.id === id ? oppdatert : t;
    });
    return nyTilretteleggingISøknad;
};

export const cleanUpTilretteleggingStepFormValues = (
    values: TilretteleggingFormData,
    visibility: QuestionVisibility<TilretteleggingFormField>,
): TilretteleggingFormData => {
    const initValues = getInitTilretteleggingFormDataValues();
    const cleanedData: TilretteleggingFormData = {
        ...values,
        tilretteleggingstiltak: visibility.isVisible(TilretteleggingFormField.tilretteleggingstiltak)
            ? values.tilretteleggingstiltak
            : initValues.tilretteleggingstiltak,
        delvisTilretteleggingPeriodeType: visibility.isVisible(
            TilretteleggingFormField.delvisTilretteleggingPeriodeType,
        )
            ? values.delvisTilretteleggingPeriodeType
            : initValues.delvisTilretteleggingPeriodeType,
        sammePeriodeFremTilTerminFom: visibility.isVisible(TilretteleggingFormField.sammePeriodeFremTilTerminFom)
            ? values.sammePeriodeFremTilTerminFom
            : initValues.sammePeriodeFremTilTerminFom,
        sammePeriodeFremTilTerminStillingsprosent: visibility.isVisible(
            TilretteleggingFormField.sammePeriodeFremTilTerminStillingsprosent,
        )
            ? values.sammePeriodeFremTilTerminStillingsprosent
            : initValues.sammePeriodeFremTilTerminStillingsprosent,
    };

    return cleanedData;
};
