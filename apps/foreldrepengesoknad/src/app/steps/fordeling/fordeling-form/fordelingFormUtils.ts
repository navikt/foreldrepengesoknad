import dayjs from 'dayjs';
import isString from 'lodash/isString';
import { IntlShape } from 'react-intl';

import { erUttaksdag, getVarighetString } from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/fp-formik';
import { formatDate, getNumberFromNumberInputValue, isValidDate } from '@navikt/fp-utils';

const validateMaxValueAntallUkerFellesperiode = (
    antallUker: number,
    antallDager: number,
    tilgjengeligeDager: number,
    intl: IntlShape,
) => {
    const totaltUkerOgDager = antallUker * 5 + antallDager;
    if (totaltUkerOgDager > tilgjengeligeDager) {
        const maxValue = getVarighetString(tilgjengeligeDager, intl);
        return intl.formatMessage({ id: 'fordeling.antallDagerUker.forStor' }, { maxValue });
    }
    return undefined;
};

export const isValidAntallUkerFellesperiode =
    (intl: IntlShape, tilgjengeligeFellesperiodeDager: number, dagerInput: string | undefined) =>
    (value: string | number | undefined) => {
        const ukerValue = isString(value) ? getNumberFromNumberInputValue(value) : value;
        const antallDager = getNumberFromNumberInputValue(dagerInput) || 0;

        if (ukerValue && ukerValue < 0) {
            return intl.formatMessage({ id: 'fordeling.antallUker.forLiten' });
        }

        if (!ukerValue && !dagerInput) {
            return intl.formatMessage({ id: 'fordeling.antallUkerDager.måOppgis' });
        }

        if (ukerValue) {
            return validateMaxValueAntallUkerFellesperiode(
                ukerValue,
                antallDager,
                tilgjengeligeFellesperiodeDager,
                intl,
            );
        }
        return undefined;
    };

export const isValidAntallDagerFellesperiode =
    (intl: IntlShape, tilgjengeligeFellesperiodeDager: number, ukerInput: string | undefined) =>
    (value: string | number | undefined) => {
        const dagerValue = isString(value) ? getNumberFromNumberInputValue(value) : value;
        const antallUker = getNumberFromNumberInputValue(ukerInput) || 0;

        if (dagerValue && dagerValue < 0) {
            return intl.formatMessage({ id: 'fordeling.antallDager.forLiten' });
        }

        if (dagerValue === undefined && ukerInput === undefined) {
            return intl.formatMessage({ id: 'fordeling.antallUkerDager.måOppgis' });
        }

        if (dagerValue) {
            return validateMaxValueAntallUkerFellesperiode(
                antallUker,
                dagerValue,
                tilgjengeligeFellesperiodeDager,
                intl,
            );
        }
        return undefined;
    };

export const validateOppstartsdato =
    (intl: IntlShape, minDato: Date | undefined, maxDato: Date | undefined) => (value: string) => {
        if (minDato && dayjs(value).isBefore(minDato, 'd')) {
            return intl.formatMessage({ id: 'fordeling.oppstartsdato.forTidlig' }, { minDato: formatDate(minDato) });
        }

        if (maxDato && dayjs(value).isAfter(maxDato, 'd')) {
            return intl.formatMessage({ id: 'fordeling.oppstartsdato.forSent' }, { maxDato: formatDate(maxDato) });
        }

        if (value && isValidDate(value) && !erUttaksdag(ISOStringToDate(value)!)) {
            return intl.formatMessage({ id: 'fordeling.oppstartsdato.ukedag' });
        }

        return undefined;
    };
