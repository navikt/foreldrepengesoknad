import {
    DelivisTilretteleggingPeriodeType,
    TilretteleggingFormData,
    TilretteleggingFormField,
} from './tilretteleggingStepFormConfig';
import {
    Arbeidsforholdstype,
    TilOgMedDatoType,
    Tilrettelegging,
    TilretteleggingstypeOptions,
} from 'app/types/Tilrettelegging';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-common/src/common/utils/stringUtils';
import { QuestionVisibility } from '@navikt/sif-common-formik-ds/lib';
import { hasValue } from 'app/utils/validationUtils';
import dayjs from 'dayjs';
import { intlUtils } from '@navikt/fp-common';
import { IntlShape } from 'react-intl';

export const getInitTilretteleggingFormDataValues = (): Readonly<TilretteleggingFormData> => ({
    [TilretteleggingFormField.behovForTilretteleggingFom]: undefined!,
    [TilretteleggingFormField.tilretteleggingType]: undefined!,
    [TilretteleggingFormField.delvisTilretteleggingPeriodeType]: undefined,
    [TilretteleggingFormField.enPeriodeMedTilretteleggingFom]: undefined,
    [TilretteleggingFormField.enPeriodeMedTilretteleggingStillingsprosent]: undefined,
    [TilretteleggingFormField.enPeriodeMedTilretteleggingTomType]: undefined!,
    [TilretteleggingFormField.enPeriodeMedTilretteleggingTilbakeIJobbDato]: undefined,
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
        enPeriodeMedTilretteleggingTilbakeIJobbDato:
            tilrettelegging.enPeriodeMedTilretteleggingTilbakeIJobbDato ||
            initValues.enPeriodeMedTilretteleggingTilbakeIJobbDato,
    };
};

export const mapOmTilretteleggingFormDataToState = (
    id: string,
    values: Partial<TilretteleggingFormData>,
    tilretteleggingFraState: Tilrettelegging[],
    tilretteleggingForOppdatering: Tilrettelegging,
): Tilrettelegging[] => {
    const harVariertePerioder =
        values.tilretteleggingType === TilretteleggingstypeOptions.DELVIS &&
        values.delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER;
    const oppdaterteVarierendePerioder = harVariertePerioder ? tilretteleggingForOppdatering?.varierendePerioder : [];
    const oppdatert = {
        ...tilretteleggingForOppdatering,
        varierendePerioder: oppdaterteVarierendePerioder,
        behovForTilretteleggingFom: values.behovForTilretteleggingFom,
        arbeidsforhold: {
            ...tilretteleggingForOppdatering.arbeidsforhold,
        },
        type: values.tilretteleggingType,
        enPeriodeMedTilretteleggingFom: harVariertePerioder ? undefined : values.enPeriodeMedTilretteleggingFom,
        enPeriodeMedTilretteleggingStillingsprosent: harVariertePerioder
            ? undefined
            : values.enPeriodeMedTilretteleggingStillingsprosent,
        enPeriodeMedTilretteleggingTomType: harVariertePerioder ? undefined : values.enPeriodeMedTilretteleggingTomType,
        enPeriodeMedTilretteleggingTilbakeIJobbDato: harVariertePerioder
            ? undefined
            : values.enPeriodeMedTilretteleggingTilbakeIJobbDato,
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
        risikofaktorer: visibility.isVisible(TilretteleggingFormField.risikofaktorer)
            ? values.risikofaktorer
            : initValues.risikofaktorer,
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
        enPeriodeMedTilretteleggingTilbakeIJobbDato: visibility.isVisible(
            TilretteleggingFormField.enPeriodeMedTilretteleggingTilbakeIJobbDato,
        )
            ? values.enPeriodeMedTilretteleggingTilbakeIJobbDato
            : initValues.enPeriodeMedTilretteleggingTilbakeIJobbDato,
    };

    return cleanedData;
};

export const getLabelPeriodeFom = (
    tilretteleggingType: TilretteleggingstypeOptions | undefined,
    intl: IntlShape,
): string => {
    return tilretteleggingType === TilretteleggingstypeOptions.INGEN
        ? intlUtils(intl, 'tilrettelegging.sammePeriodeFremTilTerminFom.label.ingen')
        : intlUtils(intl, 'tilrettelegging.sammePeriodeFremTilTerminFom.label.delvis');
};

export const getLabelPeriodeTomType = (
    tilretteleggingType: TilretteleggingstypeOptions | undefined,
    intl: IntlShape,
): string => {
    return tilretteleggingType === TilretteleggingstypeOptions.INGEN
        ? intlUtils(intl, 'tilrettelegging.enPeriodeMedTilretteleggingTomType.label.ingen')
        : intlUtils(intl, 'tilrettelegging.enPeriodeMedTilretteleggingTomType.label.delvis');
};

export const getLabelPeriodeTom = (
    tilretteleggingType: TilretteleggingstypeOptions | undefined,
    intl: IntlShape,
): string => {
    return tilretteleggingType === TilretteleggingstypeOptions.INGEN
        ? intlUtils(intl, 'tilrettelegging.enPeriodeMedTilretteleggingTilbakeIJobbDato.label.ingen')
        : intlUtils(intl, 'tilrettelegging.enPeriodeMedTilretteleggingTilbakeIJobbDato.label.delvis');
};

export const getMinDatoPeriodeFom = (formValues: Partial<TilretteleggingFormData>, minDatoBehovFom: Date): Date => {
    return hasValue(formValues.behovForTilretteleggingFom)
        ? new Date(formValues.behovForTilretteleggingFom!)
        : minDatoBehovFom;
};

export const getMinDatoTilbakeIJobb = (formValues: Partial<TilretteleggingFormData>): Date => {
    return hasValue(formValues.enPeriodeMedTilretteleggingFom)
        ? dayjs(formValues.enPeriodeMedTilretteleggingFom).add(1, 'day').toDate()
        : new Date(formValues.behovForTilretteleggingFom!);
};

export const getTilretteleggingTypeLabel = (
    erFlereTilrettelegginger: boolean,
    typeArbeid: Arbeidsforholdstype,
    navnArbeidsgiver: string,
    intl: IntlShape,
): string => {
    if (erFlereTilrettelegginger && typeArbeid !== Arbeidsforholdstype.FRILANSER) {
        return intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.label.flere', {
            navnArbeidsgiver,
        });
    }
    if (typeArbeid === Arbeidsforholdstype.FRILANSER) {
        return intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.label.frilanser');
    }
    return intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.label.en');
};

export const getBehovForTilretteleggingFomLabel = (
    erFlereTilrettelegginger: boolean,
    typeArbeid: Arbeidsforholdstype,
    navnArbeidsgiver: string,
    intl: IntlShape,
): string => {
    if (erFlereTilrettelegginger && typeArbeid !== Arbeidsforholdstype.FRILANSER) {
        return intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidFom.label.flere', {
            navnArbeidsgiver,
        });
    }
    if (typeArbeid === Arbeidsforholdstype.FRILANSER) {
        return intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidFom.label.frilanser');
    }
    return intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidFom.label.en');
};

export const getRadioOptionsTomType = (intl: IntlShape, kanHaSVPFremTilTreUkerFørTermin: boolean) => {
    return [
        {
            label: intlUtils(intl, 'perioder.varierende.tomType.valgfriDato'),
            value: TilOgMedDatoType.VALGFRI_DATO,
        },
        {
            label: kanHaSVPFremTilTreUkerFørTermin
                ? intlUtils(intl, 'perioder.varierende.tomType.treUkerFørTermin')
                : intlUtils(intl, 'perioder.varierende.tomType.dagenFørFødsel'),
            value: TilOgMedDatoType.SISTE_DAG_MED_SVP,
        },
    ];
};

export const getTilretteleggingSideTittel = (
    erFlereTilrettelegginger: boolean,
    intl: IntlShape,
    navn: string,
): string => {
    return erFlereTilrettelegginger
        ? intlUtils(intl, 'steps.label.tilrettelegging.flere', { navn })
        : intlUtils(intl, 'steps.label.tilrettelegging.en');
};
