import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import { PeriodeMedVariasjonForm, TilOgMedDatoType } from 'types/Tilrettelegging';
import { getFloatFromString } from 'utils/numberUtils';
import { getSlutteTekst } from 'utils/validationUtils';

import { formatDate, overlapperTidsperioder } from '@navikt/fp-utils';

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
        periodeDerTilbakeIFullJobb: PeriodeMedVariasjonForm | undefined,
        allePerioder: PeriodeMedVariasjonForm[],
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
            allePerioder.every(
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
            allePerioder.every(
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

        if (måSøkeSendeNySøknad && periodeDerTilbakeIFullJobb?.fom) {
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
        allePerioder: PeriodeMedVariasjonForm[],
        behovForTilretteleggingFom: string | undefined,
        sisteDagForSvangerskapspenger: string,
        arbeidNavn: string,
        sluttDatoArbeid: string | undefined,
    ) =>
    (fom: string) => {
        const tom = allePerioder[index]?.tom;
        const tomType = allePerioder[index]?.tomType;
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

const validateAtPeriodeIkkeOverlapper = (
    fom: string | undefined,
    tom: string | undefined,
    tomType: TilOgMedDatoType | undefined,
    allePerioder: PeriodeMedVariasjonForm[],
    index: number,
    intl: IntlShape,
    sisteDagForSvangerskapspenger: string,
) => {
    if ((tom || tomType) && fom && allePerioder.length > 0) {
        const andrePerioderLagtTilEtter = allePerioder.filter((_p, i) => i > index);
        const overlappendePerioder = andrePerioderLagtTilEtter.filter((p) => {
            let periodeTom = undefined;
            if (p.tomType && p.tomType === TilOgMedDatoType.SISTE_DAG_MED_SVP) {
                periodeTom = sisteDagForSvangerskapspenger;
            }
            if (p.tom) {
                periodeTom = p.tom;
            }
            if (periodeTom && p.fom) {
                return overlapperTidsperioder(
                    { fom: fom, tom: tom || sisteDagForSvangerskapspenger },
                    { fom: p.fom, tom: periodeTom },
                );
            }
            return false;
        });
        if (overlappendePerioder.length > 0) {
            const fraDato = overlappendePerioder[0]!.fom;
            if (fraDato) {
                const tilOgMedDato = overlappendePerioder[0]!.tom || sisteDagForSvangerskapspenger;
                return intl.formatMessage(
                    { id: 'valideringsfeil.periode.overlapper' },
                    {
                        fom: formatDate(fraDato),
                        tom: formatDate(tilOgMedDato),
                    },
                );
            }
        }
    }
    return undefined;
};

const validateSammenhengendePerioderFom = (
    fom: string | undefined,
    allePerioder: PeriodeMedVariasjonForm[],
    sisteDagForSvangerskapspenger: string,
    intl: IntlShape,
) => {
    const alleFom = allePerioder.filter((p) => p.fom).map((periode) => dayjs(periode.fom));
    const minstAvAlleFom = alleFom.length > 0 ? dayjs.min(alleFom) : undefined;
    if (minstAvAlleFom && dayjs(fom).isSameOrBefore(minstAvAlleFom, 'day')) {
        return undefined;
    }
    const alleTom = allePerioder
        .filter((p) => p.tom || p.tomType === TilOgMedDatoType.SISTE_DAG_MED_SVP)
        .map((periode) => {
            return periode.tomType === TilOgMedDatoType.SISTE_DAG_MED_SVP
                ? dayjs(sisteDagForSvangerskapspenger)
                : dayjs(periode.tom);
        });
    const tomSomErDagenFørFom = alleTom.find((tom) => dayjs(fom).subtract(1, 'd').isSame(dayjs(tom), 'day'));
    if (!tomSomErDagenFørFom) {
        return intl.formatMessage({ id: 'valideringsfeil.periode.ikkeSammenhengende' });
    }
    return undefined;
};
