import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { formatDate, overlapperTidsperioder } from '@navikt/fp-utils';

import { PeriodeMedVariasjon, TilOgMedDatoType } from 'app/types/Tilrettelegging';
import { getFloatFromString } from 'app/utils/numberUtils';
import { getSlutteTekst } from 'app/utils/validationUtils';

const validerStillingsprosentInput = (intl: IntlShape, value: string) => {
    if (!value || value.trim() === '') {
        return intl.formatMessage({ id: 'valideringsfeil.stillingsprosent.required' });
    }
    const stillingsprosent = getFloatFromString(value);
    return stillingsprosent === undefined
        ? intl.formatMessage({ id: 'valideringsfeil.stillingsprosent.måVæreEtTall' })
        : undefined;
};

export const validateStillingsprosentPåPerioder =
    (
        intl: IntlShape,
        måSøkeSendeNySøknad: boolean,
        periodeDerTilbakeIFullJobb: PeriodeMedVariasjon | undefined,
        allePerioder: PeriodeMedVariasjon[] | undefined,
        opprinneligStillingsProsent: number,
    ) =>
    (value: string) => {
        const valideringsFeil = validerStillingsprosentInput(intl, value);
        if (valideringsFeil) {
            return valideringsFeil;
        }
        const stillingsprosent = getFloatFromString(value);
        if (stillingsprosent && opprinneligStillingsProsent > 0 && stillingsprosent > opprinneligStillingsProsent) {
            return intl.formatMessage(
                { id: 'valideringsfeil.stillingsprosent.måVæreMindreEllerLikOpprinneligStillingsprosent' },
                {
                    prosent: opprinneligStillingsProsent,
                },
            );
        }

        if (stillingsprosent && opprinneligStillingsProsent === 0 && stillingsprosent > 100) {
            return intl.formatMessage(
                { id: 'valideringsfeil.stillingsprosent.måVæreMindreEllerLik100Prosent' },
                {
                    prosent: opprinneligStillingsProsent,
                },
            );
        }

        if (
            opprinneligStillingsProsent > 0 &&
            allePerioder &&
            allePerioder?.every(
                (periode) =>
                    periode.stillingsprosent &&
                    getFloatFromString(periode.stillingsprosent) === opprinneligStillingsProsent,
            )
        ) {
            return intl.formatMessage(
                { id: 'valideringsfeil.periode.stillingsprosent.kunFullTilrettelegging' },
                {
                    prosent: opprinneligStillingsProsent,
                },
            );
        }
        if (
            opprinneligStillingsProsent === 0 &&
            allePerioder &&
            allePerioder?.every(
                (periode) => periode.stillingsprosent && getFloatFromString(periode.stillingsprosent) === 100,
            )
        ) {
            return intl.formatMessage(
                { id: 'valideringsfeil.periode.stillingsprosent.kun100Prosent' },
                {
                    prosent: opprinneligStillingsProsent,
                },
            );
        }

        if (måSøkeSendeNySøknad && periodeDerTilbakeIFullJobb) {
            return intl.formatMessage(
                { id: 'valideringsfeil.periode.stillingsprosent.nySøknad' },
                {
                    fom: formatDate(periodeDerTilbakeIFullJobb.fom),
                },
            );
        }
        return undefined;
    };

export const validatePeriodeFom =
    (
        intl: IntlShape,
        index: number,
        allePerioder: PeriodeMedVariasjon[] | undefined,
        behovForTilretteleggingFom: string | undefined,
        sisteDagForSvangerskapspenger: string,
        arbeidNavn: string,
        sluttDatoArbeid: string | undefined,
    ) =>
    (fom: string) => {
        const tom = allePerioder && allePerioder.length > 0 ? allePerioder[index].tom : undefined;
        const tomType = allePerioder && allePerioder.length > 0 ? allePerioder[index].tomType : undefined;
        if (fom && behovForTilretteleggingFom && dayjs(fom).isBefore(dayjs(behovForTilretteleggingFom), 'd')) {
            return intl.formatMessage({ id: 'valideringsfeil.periode.fom.førBehovForTilretteleggingFom' });
        }

        if (sluttDatoArbeid && dayjs(fom).isAfter(dayjs(sluttDatoArbeid), 'd')) {
            const slutteTekst = getSlutteTekst(sluttDatoArbeid, intl);
            return intl.formatMessage(
                { id: 'valideringsfeil.periode.fom.etterSluttDatoArbeid' },
                {
                    dato: formatDate(sluttDatoArbeid),
                    navn: arbeidNavn,
                    slutteTekst,
                },
            );
        }

        const overlappendePerioderFeil = validateAtPeriodeIkkeOverlapper(
            fom,
            tom,
            tomType,
            allePerioder,
            index,
            intl,
            sisteDagForSvangerskapspenger,
        );
        if (overlappendePerioderFeil) {
            return overlappendePerioderFeil;
        }

        return validateSammenhengendePerioderFom(fom, allePerioder, sisteDagForSvangerskapspenger, intl);
    };

export const validatePeriodeTom =
    (intl: IntlShape, arbeidNavn: string, sluttDatoArbeid: string | undefined) => (tom: string) => {
        if (sluttDatoArbeid && dayjs(tom).isAfter(dayjs(sluttDatoArbeid), 'd')) {
            const slutteTekst = getSlutteTekst(sluttDatoArbeid, intl);
            return intl.formatMessage(
                { id: 'valideringsfeil.periode.tom.etterSluttDatoArbeid' },
                {
                    dato: formatDate(sluttDatoArbeid),
                    navn: arbeidNavn,
                    slutteTekst,
                },
            );
        }

        return undefined;
    };

export const validatePeriodeTomType =
    (intl: IntlShape, sisteDagForSvangerskapspenger: string, arbeidNavn: string, sluttDatoArbeid: string | undefined) =>
    (value: string | number) => {
        if (
            sluttDatoArbeid &&
            value === TilOgMedDatoType.SISTE_DAG_MED_SVP &&
            dayjs(sisteDagForSvangerskapspenger).isAfter(dayjs(sluttDatoArbeid), 'd')
        ) {
            const slutteTekst = getSlutteTekst(sluttDatoArbeid, intl);
            return intl.formatMessage(
                { id: 'valideringsfeil.periode.tomType.etterSluttDatoArbeid' },
                {
                    navn: arbeidNavn,
                    slutteTekst,
                },
            );
        }
        return undefined;
    };

export const validateAtPeriodeIkkeOverlapper = (
    fom: string | undefined,
    tom: string | undefined,
    tomType: TilOgMedDatoType | undefined,
    allePerioder: PeriodeMedVariasjon[] | undefined,
    index: number,
    intl: IntlShape,
    sisteDagForSvangerskapspenger: string,
) => {
    if ((tom || tomType) && fom && allePerioder && allePerioder.length > 0) {
        const andrePerioderLagtTilEtter = allePerioder.filter((_p, i) => i > index);
        const overlappendePerioder = andrePerioderLagtTilEtter.filter((p) => {
            let periodeTom = undefined;
            if (p.tomType && p.tomType === TilOgMedDatoType.SISTE_DAG_MED_SVP) {
                periodeTom = sisteDagForSvangerskapspenger;
            }
            if (p.tom) {
                periodeTom = p.tom;
            }
            if (periodeTom) {
                return overlapperTidsperioder(
                    { fom: fom!, tom: tom || sisteDagForSvangerskapspenger },
                    { fom: p.fom, tom: periodeTom },
                );
            }
            return false;
        });
        if (overlappendePerioder.length > 0) {
            const tilOgMedDato = overlappendePerioder[0].tom
                ? overlappendePerioder[0].tom
                : sisteDagForSvangerskapspenger;
            return intl.formatMessage(
                { id: 'valideringsfeil.periode.overlapper' },
                {
                    fom: formatDate(overlappendePerioder[0].fom),
                    tom: formatDate(tilOgMedDato),
                },
            );
        }
    }
    return undefined;
};

export const validateSammenhengendePerioderFom = (
    fom: string | undefined,
    allePerioder: PeriodeMedVariasjon[] | undefined,
    sisteDagForSvangerskapspenger: string,
    intl: IntlShape,
) => {
    const alleFom = allePerioder ? allePerioder.filter((p) => p.fom).map((periode) => dayjs(periode.fom)) : undefined;
    const minstAvAlleFom = alleFom ? dayjs.min(alleFom) : undefined;
    if (minstAvAlleFom && dayjs(fom).isSameOrBefore(minstAvAlleFom, 'day')) {
        return undefined;
    }
    const alleTom = allePerioder
        ? allePerioder
              .filter((p) => p.tom || p.tomType === TilOgMedDatoType.SISTE_DAG_MED_SVP)
              .map((periode) => {
                  return periode.tomType === TilOgMedDatoType.SISTE_DAG_MED_SVP
                      ? dayjs(sisteDagForSvangerskapspenger)
                      : dayjs(periode.tom);
              })
        : undefined;
    const tomSomErDagenFørFom = alleTom
        ? alleTom.find((tom) => dayjs(fom).subtract(1, 'd').isSame(dayjs(tom), 'day'))
        : undefined;
    if (!tomSomErDagenFørFom) {
        return intl.formatMessage({ id: 'valideringsfeil.periode.ikkeSammenhengende' });
    }
    return undefined;
};
