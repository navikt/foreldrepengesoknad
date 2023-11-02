import { isISODateString } from '@navikt/ds-datepicker';
import { formatDate, intlUtils, isDateABeforeDateB } from '@navikt/fp-common';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { PeriodeMedVariasjon, TilOgMedDatoType } from 'app/types/Tilrettelegging';
import { getTidsperiode, overlapperTidsperioder } from 'app/utils/tidsperiodeUtils';
import { getSlutteTekst, hasValue } from 'app/utils/validationUtils';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

export const validatePeriodeFom =
    (
        intl: IntlShape,
        index: number,
        allePerioder: PeriodeMedVariasjon[] | undefined,
        behovForTilretteleggingFom: string | undefined,
        sisteDagForSvangerskapspenger: Date,
        erBarnetFødt: boolean,
        arbeidNavn: string,
        sluttDatoArbeid: string | undefined,
    ) =>
    (fom: string) => {
        const tom = allePerioder && allePerioder.length > 0 ? allePerioder[index].tom : undefined;
        const tomType = allePerioder && allePerioder.length > 0 ? allePerioder[index].tomType : undefined;
        if (!hasValue(fom)) {
            return intlUtils(intl, 'valideringsfeil.periode.fom.påkrevd');
        }
        if (hasValue(fom) && !isISODateString(fom)) {
            return intlUtils(intl, 'valideringsfeil.periode.fom.gyldigDato');
        }

        if (hasValue(fom) && tom && isDateABeforeDateB(tom, fom)) {
            return intlUtils(intl, 'valideringsfeil.periode.fom.førTilDato');
        }

        if (
            hasValue(fom) &&
            hasValue(behovForTilretteleggingFom) &&
            dayjs(fom).isBefore(dayjs(behovForTilretteleggingFom), 'd')
        ) {
            return intlUtils(intl, 'valideringsfeil.periode.fom.førBehovForTilretteleggingFom');
        }

        if (hasValue(fom) && dayjs(fom).isAfter(dayjs(sisteDagForSvangerskapspenger), 'd')) {
            return erBarnetFødt
                ? intlUtils(intl, 'valideringsfeil.periode.fom.etterTreUkerFørFødsel')
                : intlUtils(intl, 'valideringsfeil.periode.fom.etterTreUkerFørTermin');
        }

        if (sluttDatoArbeid && dayjs(fom).isAfter(dayjs(sluttDatoArbeid), 'd')) {
            const slutteTekst = getSlutteTekst(sluttDatoArbeid, intl);
            return intlUtils(intl, 'valideringsfeil.periode.fom.etterSluttDatoArbeid', {
                dato: formatDate(sluttDatoArbeid),
                navn: arbeidNavn,
                slutteTekst,
            });
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
    (
        intl: IntlShape,
        index: number,
        allePerioder: PeriodeMedVariasjon[] | undefined,
        sisteDagForSvangerskapspenger: Date,
        fødselsdato: string | undefined,
        arbeidNavn: string,
        sluttDatoArbeid: string | undefined,
    ) =>
    (tom: string) => {
        const fom = allePerioder && allePerioder.length > 0 ? allePerioder[index].fom : undefined;
        if (!hasValue(tom)) {
            return intlUtils(intl, 'valideringsfeil.periode.tom.påkrevd');
        }
        if (hasValue(tom) && !isISODateString(tom)) {
            return intlUtils(intl, 'valideringsfeil.periode.tom.gyldigDato');
        }

        if (hasValue(tom) && fom && isDateABeforeDateB(tom, fom)) {
            return intlUtils(intl, 'valideringsfeil.periode.tom.etterTilDato');
        }

        if (hasValue(tom) && dayjs(tom).isAfter(dayjs(sisteDagForSvangerskapspenger), 'd')) {
            return fødselsdato
                ? intlUtils(intl, 'valideringsfeil.periode.tom.etterTreUkerFørFødsel')
                : intlUtils(intl, 'valideringsfeil.periode.tom.etterTreUkerFørTermin');
        }
        if (sluttDatoArbeid && dayjs(tom).isAfter(dayjs(sluttDatoArbeid), 'd')) {
            const slutteTekst = getSlutteTekst(sluttDatoArbeid, intl);
            return intlUtils(intl, 'valideringsfeil.periode.tom.etterSluttDatoArbeid', {
                dato: formatDate(sluttDatoArbeid),
                navn: arbeidNavn,
                slutteTekst,
            });
        }

        return undefined;
    };

export const validatePeriodeTomType =
    (intl: IntlShape, sisteDagForSvangerskapspenger: Date, arbeidNavn: string, sluttDatoArbeid: string | undefined) =>
    (value: TilOgMedDatoType) => {
        if (!hasValue(value)) {
            return intlUtils(intl, 'valideringsfeil.periode.tomType.påkrevd');
        }
        if (
            sluttDatoArbeid &&
            value === TilOgMedDatoType.SISTE_DAG_MED_SVP &&
            dayjs(sisteDagForSvangerskapspenger).isAfter(dayjs(sluttDatoArbeid), 'd')
        ) {
            const slutteTekst = getSlutteTekst(sluttDatoArbeid, intl);
            return intlUtils(intl, 'valideringsfeil.periode.tomType.etterSluttDatoArbeid', {
                navn: arbeidNavn,
                slutteTekst,
            });
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
    sisteDagForSvangerskapspenger: Date,
) => {
    if ((hasValue(tom) || hasValue(tomType)) && hasValue(fom) && allePerioder && allePerioder.length > 0) {
        const andrePerioderLagtTilEtter = allePerioder.filter((_p, i) => i > index);
        const overlappendePerioder = andrePerioderLagtTilEtter.filter((p) => {
            let periodeTom = undefined;
            if (hasValue(p.tomType) && p.tomType === TilOgMedDatoType.SISTE_DAG_MED_SVP) {
                periodeTom = dateToISOString(sisteDagForSvangerskapspenger);
            }
            if (hasValue(p.tom)) {
                periodeTom = p.tom;
            }
            if (periodeTom) {
                return overlapperTidsperioder(
                    getTidsperiode(fom!, tom || dateToISOString(sisteDagForSvangerskapspenger)),
                    getTidsperiode(p.fom, periodeTom),
                );
            }
            return false;
        });
        if (overlappendePerioder.length > 0) {
            const tilOgMedDato = overlappendePerioder[0].tom
                ? overlappendePerioder[0].tom
                : sisteDagForSvangerskapspenger;
            return intlUtils(intl, 'valideringsfeil.periode.overlapper', {
                fom: formatDate(overlappendePerioder[0].fom),
                tom: formatDate(tilOgMedDato),
            });
        }
    }
    return undefined;
};

export const validateSammenhengendePerioderFom = (
    fom: string | undefined,
    allePerioder: PeriodeMedVariasjon[] | undefined,
    sisteDagForSvangerskapspenger: Date,
    intl: IntlShape,
) => {
    const alleFom = allePerioder
        ? allePerioder.filter((p) => p.fom && isISODateString(p.fom)).map((periode) => dayjs(periode.fom))
        : undefined;
    const minstAvAlleFom = alleFom ? dayjs.min(alleFom) : undefined;
    if (minstAvAlleFom && dayjs(fom).isSameOrBefore(minstAvAlleFom, 'day')) {
        return undefined;
    }
    const alleTom = allePerioder
        ? allePerioder
              .filter((p) => (p.tom && isISODateString(p.tom)) || p.tomType === TilOgMedDatoType.SISTE_DAG_MED_SVP)
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
        return intlUtils(intl, 'valideringsfeil.periode.ikkeSammenhengende');
    }
    return undefined;
};
