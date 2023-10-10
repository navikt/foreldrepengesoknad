import { PeriodeMedVariasjon, Tilrettelegging, TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';
import { PerioderFormData, PerioderFormField } from './perioderStepFormConfig';
import { hasValue } from 'app/utils/validationUtils';
import dayjs from 'dayjs';

export const getMåSendeNySøknad = (
    periodeDerSøkerErTilbakeIOpprinneligStilling: PeriodeMedVariasjon | undefined,
    currentPeriode: PeriodeMedVariasjon,
    opprinneligStillingsprosent: number,
): boolean => {
    return (
        !!periodeDerSøkerErTilbakeIOpprinneligStilling &&
        hasValue(currentPeriode.fom) &&
        hasValue(currentPeriode.stillingsprosent) &&
        dayjs(currentPeriode.fom).isAfter(periodeDerSøkerErTilbakeIOpprinneligStilling.fom) &&
        parseInt(currentPeriode.stillingsprosent!, 10) < opprinneligStillingsprosent
    );
};

export const getInitPerioderFormDataValues = (): Readonly<PerioderFormData> => ({
    [PerioderFormField.variertePerioder]: [
        {
            type: TilretteleggingstypeOptions.DELVIS,
            fom: '',
            tom: '',
            stillingsprosent: '',
            tomType: undefined!,
        },
    ],
});

export const getPerioderInitialValues = (tilrettelegging: Tilrettelegging): PerioderFormData => {
    const initValues = getInitPerioderFormDataValues();
    return {
        variertePerioder:
            tilrettelegging.variertePerioder && tilrettelegging.variertePerioder.length > 0
                ? tilrettelegging.variertePerioder
                : initValues.variertePerioder,
    };
};

export const mapPerioderFormDataToState = (
    id: string,
    values: Partial<PerioderFormData>,
    tilretteleggingFraState: Tilrettelegging[],
): Tilrettelegging[] => {
    const tilretteleggingForOppdatering = tilretteleggingFraState.find((t) => t.id === id);
    const oppdatert = {
        ...tilretteleggingForOppdatering,
        variertePerioder: values.variertePerioder,
    } as Tilrettelegging;

    const nyTilretteleggingISøknad = tilretteleggingFraState.map((t) => {
        return t.id === id ? oppdatert : t;
    });
    return nyTilretteleggingISøknad;
};
