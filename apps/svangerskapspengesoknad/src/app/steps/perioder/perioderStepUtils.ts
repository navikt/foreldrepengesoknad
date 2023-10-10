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
        dayjs(currentPeriode.fom).isAfter(periodeDerSøkerErTilbakeIOpprinneligStilling.fom, 'day') &&
        parseInt(currentPeriode.stillingsprosent!, 10) < opprinneligStillingsprosent
    );
};

export const getInitPerioderFormDataValues = (): Readonly<PerioderFormData> => ({
    [PerioderFormField.varierendePerioder]: [
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
        varierendePerioder:
            tilrettelegging.varierendePerioder && tilrettelegging.varierendePerioder.length > 0
                ? tilrettelegging.varierendePerioder
                : initValues.varierendePerioder,
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
        varierendePerioder: values.varierendePerioder,
    } as Tilrettelegging;

    const nyTilretteleggingISøknad = tilretteleggingFraState.map((t) => {
        return t.id === id ? oppdatert : t;
    });
    return nyTilretteleggingISøknad;
};
