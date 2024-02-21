import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { formatDate } from '@navikt/fp-utils';
import {
    PeriodeMedVariasjon,
    TilOgMedDatoType,
    Tilrettelegging,
    TilretteleggingstypeOptions,
} from 'app/types/Tilrettelegging';
import { getFloatFromString } from 'app/utils/numberUtils';
import { hasValue } from 'app/utils/validationUtils';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import { PerioderFormData } from './PerioderFieldArray';

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

export const mapPerioderFormDataToState = (
    id: string,
    values: PerioderFormData,
    tilretteleggingFraState: Tilrettelegging[],
): Tilrettelegging[] => {
    const tilretteleggingForOppdatering = tilretteleggingFraState.find((t) => t.id === id);
    const oppdatert = {
        ...tilretteleggingForOppdatering,
        varierendePerioder: values.varierendePerioder.map((p) => ({
            ...p,
            type: TilretteleggingstypeOptions.DELVIS,
        })),
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

export const getMinDatoTom = (fom: string | undefined, minDatoFom: Date): Date => {
    return fom ? dayjs(fom).toDate() : minDatoFom;
};

export const getPeriodeInfoTekst = (
    index: number,
    sisteDagForSvangerskapspenger: string,
    intl: IntlShape,
    varierendePerioder?: PeriodeMedVariasjon[],
) => {
    if (
        varierendePerioder &&
        varierendePerioder[index]?.fom &&
        (varierendePerioder[index].tomType === TilOgMedDatoType.SISTE_DAG_MED_SVP || varierendePerioder[index].tom)
    ) {
        const tomDato =
            varierendePerioder[index].tomType === TilOgMedDatoType.SISTE_DAG_MED_SVP
                ? sisteDagForSvangerskapspenger
                : dayjs(varierendePerioder[index].tom).format(ISO_DATE_FORMAT);
        return `${formatDate(varierendePerioder[index].fom)} - ${formatDate(tomDato)}`;
    }
    return intl.formatMessage({ id: 'ny.periode' });
};

const getNesteDagEtterSistePeriode = (
    sisteDagForSvangerskapspenger: string,
    alleVarierendePerioder?: PeriodeMedVariasjon[],
): string => {
    if (!alleVarierendePerioder || alleVarierendePerioder.length === 0) {
        return '';
    }
    const alleTomDatoer = alleVarierendePerioder
        .filter((p) => p.tom || p.tomType === TilOgMedDatoType.SISTE_DAG_MED_SVP)
        .map((periode) => {
            if (periode.tomType === TilOgMedDatoType.SISTE_DAG_MED_SVP) {
                return dayjs(sisteDagForSvangerskapspenger).add(1, 'd');
            } else {
                return dayjs(periode.tom);
            }
        });

    const maxTomDato = alleTomDatoer.length > 0 ? dayjs.max(alleTomDatoer) : undefined;
    return maxTomDato ? maxTomDato.add(1, 'd').format(ISO_DATE_FORMAT) : '';
};

export const getUferdigPeriodeInput = (
    sisteDagForSvangerskapspenger: string,
    alleVarierendePerioder?: PeriodeMedVariasjon[],
): PeriodeMedVariasjon => {
    return {
        fom: getNesteDagEtterSistePeriode(sisteDagForSvangerskapspenger, alleVarierendePerioder),
        tom: '',
        stillingsprosent: '',
        tomType: undefined!,
        type: TilretteleggingstypeOptions.DELVIS,
    } as PeriodeMedVariasjon;
};
