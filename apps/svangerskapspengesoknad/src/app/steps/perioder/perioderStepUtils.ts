import { PeriodeMedVariasjon, Tilrettelegging, TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';
import { PerioderFormData, PerioderFormField } from './perioderStepFormConfig';
import { hasValue } from 'app/utils/validationUtils';
import dayjs from 'dayjs';
import { getNesteDagEtterSistePeriode } from 'app/utils/tilretteleggingUtils';
import { ISOStringToDate, intlUtils } from '@navikt/fp-common';
import { IntlShape } from 'react-intl';
import { isISODateString } from '@navikt/ds-datepicker';
import { getFloatFromString } from 'app/utils/numberUtils';

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
        ((opprinneligStillingsprosent > 0 &&
            getFloatFromString(currentPeriode.stillingsprosent)! < opprinneligStillingsprosent) ||
            (opprinneligStillingsprosent === 0 && getFloatFromString(currentPeriode.stillingsprosent)! < 100))
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

export const getPeriodeDerSøkerErTilbakeIFullStilling = (
    varierendePerioder: PeriodeMedVariasjon[] | undefined,
    opprinneligStillingsprosent: number,
): PeriodeMedVariasjon | undefined => {
    return varierendePerioder
        ? varierendePerioder.find((p) => {
              if (opprinneligStillingsprosent > 0) {
                  return (
                      hasValue(p.stillingsprosent) &&
                      getFloatFromString(p.stillingsprosent) === opprinneligStillingsprosent
                  );
              } else {
                  return hasValue(p.stillingsprosent) && getFloatFromString(p.stillingsprosent) === 100;
              }
          })
        : undefined;
};

export const getUferdigPeriodeInput = (
    formValues: Partial<PerioderFormData>,
    sisteDagForSvangerskapspenger: Date,
): PeriodeMedVariasjon => {
    return {
        fom: getNesteDagEtterSistePeriode(formValues, sisteDagForSvangerskapspenger),
        tom: '',
        stillingsprosent: '',
        tomType: undefined!,
        type: TilretteleggingstypeOptions.DELVIS,
    } as PeriodeMedVariasjon;
};

export const getPeriodeSideTittel = (erFlereTilrettelegginger: boolean, navn: string, intl: IntlShape): string => {
    return erFlereTilrettelegginger
        ? intlUtils(intl, 'steps.label.periode.flere', { navn })
        : intlUtils(intl, 'steps.label.periode.en');
};

export const getDescriptionTekst = (kanHaSVPFremTilTreUkerFørTermin: boolean, intl: IntlShape): string => {
    return kanHaSVPFremTilTreUkerFørTermin
        ? intlUtils(intl, 'perioder.varierende.description.termin')
        : intlUtils(intl, 'perioder.varierende.description.fødsel');
};

export const getMinDatoTom = (fom: string | undefined, minDatoFom: Date): Date => {
    return hasValue(fom) && isISODateString(fom) ? ISOStringToDate(fom)! : minDatoFom;
};
