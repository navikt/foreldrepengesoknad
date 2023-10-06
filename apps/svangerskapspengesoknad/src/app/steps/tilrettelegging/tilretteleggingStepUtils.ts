import {
    DelivisTilretteleggingPeriodeType,
    TilretteleggingFormData,
    TilretteleggingFormField,
} from './tilretteleggingStepFormConfig';
import { Tilrettelegging, Tilretteleggingstype } from 'app/types/Tilrettelegging';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-common/src/common/utils/stringUtils';
import { QuestionVisibility } from '@navikt/sif-common-formik-ds/lib';
import { hasValue } from 'app/utils/validationUtils';

export const getInitTilretteleggingFormDataValues = (): Readonly<TilretteleggingFormData> => ({
    [TilretteleggingFormField.behovForTilretteleggingFom]: '',
    [TilretteleggingFormField.tilretteleggingType]: undefined!,
    [TilretteleggingFormField.delvisTilretteleggingPeriodeType]: undefined!,
    [TilretteleggingFormField.enPeriodeMedTilretteleggingFom]: undefined,
    [TilretteleggingFormField.enPeriodeMedTilretteleggingStillingsprosent]: undefined,
    [TilretteleggingFormField.enPeriodeMedTilretteleggingTomType]: undefined!,
    [TilretteleggingFormField.enPeriodeMedTilretteleggingTom]: undefined,
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
        enPeriodeMedTilretteleggingFom:
            tilrettelegging.enPeriodeMedTilretteleggingFom || initValues.enPeriodeMedTilretteleggingFom,
        enPeriodeMedTilretteleggingStillingsprosent:
            tilrettelegging.enPeriodeMedTilretteleggingStillingsprosent ||
            initValues.enPeriodeMedTilretteleggingStillingsprosent,
        enPeriodeMedTilretteleggingTomType:
            tilrettelegging.enPeriodeMedTilretteleggingTomType || initValues.enPeriodeMedTilretteleggingTomType,
        enPeriodeMedTilretteleggingTom:
            tilrettelegging.enPeriodeMedTilretteleggingTom || initValues.enPeriodeMedTilretteleggingTom,
    };
};

export const mapOmTilretteleggingFormDataToState = (
    id: string,
    values: Partial<TilretteleggingFormData>,
    tilretteleggingFraState: Tilrettelegging[],
    tilretteleggingForOppdatering: Tilrettelegging,
): Tilrettelegging[] => {
    const oppdaterteVarierendePerioder =
        values.tilretteleggingType === Tilretteleggingstype.DELVIS &&
        values.delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
            ? tilretteleggingForOppdatering?.variertePerioder
            : [];
    const oppdatert = {
        ...tilretteleggingForOppdatering,
        variertePerioder: oppdaterteVarierendePerioder,
        behovForTilretteleggingFom: values.behovForTilretteleggingFom,
        arbeidsforhold: {
            ...tilretteleggingForOppdatering!.arbeidsforhold,
        },
        type: values.tilretteleggingType,
        enPeriodeMedTilretteleggingFom: values.enPeriodeMedTilretteleggingFom,
        enPeriodeMedTilretteleggingStillingsprosent: values.enPeriodeMedTilretteleggingStillingsprosent,
        enPeriodeMedTilretteleggingTomType: values.enPeriodeMedTilretteleggingTomType,
        enPeriodeMedTilretteleggingTom: values.enPeriodeMedTilretteleggingTom,
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
        enPeriodeMedTilretteleggingFom: visibility.isVisible(TilretteleggingFormField.enPeriodeMedTilretteleggingFom)
            ? values.enPeriodeMedTilretteleggingFom
            : initValues.enPeriodeMedTilretteleggingFom,
        enPeriodeMedTilretteleggingStillingsprosent: visibility.isVisible(
            TilretteleggingFormField.enPeriodeMedTilretteleggingStillingsprosent,
        )
            ? values.enPeriodeMedTilretteleggingStillingsprosent
            : initValues.enPeriodeMedTilretteleggingStillingsprosent,
        enPeriodeMedTilretteleggingTomType: visibility.isVisible(
            TilretteleggingFormField.enPeriodeMedTilretteleggingTomType,
        )
            ? values.enPeriodeMedTilretteleggingTomType
            : initValues.enPeriodeMedTilretteleggingTomType,
        enPeriodeMedTilretteleggingTom: visibility.isVisible(TilretteleggingFormField.enPeriodeMedTilretteleggingTom)
            ? values.enPeriodeMedTilretteleggingTom
            : initValues.enPeriodeMedTilretteleggingTom,
    };

    return cleanedData;
};
