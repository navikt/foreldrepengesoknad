import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import { PeriodeMedVariasjon, TilOgMedDatoType, Tilretteleggingstype } from 'types/Tilrettelegging';
import { getFloatFromString } from 'utils/numberUtils';
import { hasValue } from 'utils/validationUtils';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { formatDate, isValidDate as isStringAValidDate } from '@navikt/fp-utils';

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

export const getMinDatoTom = (fom: string | undefined, minDatoFom: string): string => {
    return fom && isStringAValidDate(fom) ? fom : minDatoFom;
};

export const getPeriodeInfoTekst = (
    index: number,
    sisteDagForSvangerskapspenger: string,
    intl: IntlShape,
    kanHaSVPFremTilTreUkerFørTermin: boolean,
    varierendePerioder?: PeriodeMedVariasjon[],
) => {
    const erSisteDagMedSvpValgt =
        varierendePerioder && varierendePerioder[index].tomType === TilOgMedDatoType.SISTE_DAG_MED_SVP;

    if (varierendePerioder?.[index]?.fom && (erSisteDagMedSvpValgt || varierendePerioder[index].tom)) {
        const fomDato = varierendePerioder[index].fom;
        const tomDato =
            varierendePerioder[index].tomType === TilOgMedDatoType.SISTE_DAG_MED_SVP
                ? sisteDagForSvangerskapspenger
                : dayjs(varierendePerioder[index].tom).format(ISO_DATE_FORMAT);

        const totaltAntallDager = dayjs(tomDato).diff(fomDato, 'days') + 1;

        const ukeAntall = Math.floor(totaltAntallDager / 7);
        const dagAntall = totaltAntallDager - ukeAntall * 7;

        let sluttdatotekst = formatDate(tomDato);
        if (erSisteDagMedSvpValgt) {
            sluttdatotekst = kanHaSVPFremTilTreUkerFørTermin
                ? intl.formatMessage({ id: 'PerioderStep.TreUkerFørTermin' })
                : intl.formatMessage({ id: 'PerioderStep.Fødsel' });
        }
        return `${formatDate(fomDato)} - ${sluttdatotekst} (${intl.formatMessage({ id: 'PerioderStep.tidsperiode' }, { ukeAntall, dagAntall })})`;
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
        type: Tilretteleggingstype.DELVIS,
    } as PeriodeMedVariasjon;
};
