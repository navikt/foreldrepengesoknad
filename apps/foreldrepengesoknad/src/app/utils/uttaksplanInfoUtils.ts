import dayjs from 'dayjs';

import { Situasjon, Tidsperioden } from '@navikt/fp-common';

export const skalViseInfoOmPrematuruker = (
    fødselsdato: string | undefined,
    termindato: Date | string | undefined,
    situasjon: Situasjon,
): boolean => {
    if (fødselsdato === undefined || termindato === undefined || situasjon !== 'fødsel') {
        return false;
    }
    const fødselsdatoEtterEllerLikFørsteJuli = dayjs(fødselsdato).isSameOrAfter(dayjs(new Date('2019-07-01')), 'day');
    return (
        dayjs(fødselsdato).add(7, 'weeks').add(3, 'days').isBefore(dayjs(termindato), 'days') &&
        fødselsdatoEtterEllerLikFørsteJuli
    );
};

export const getSamtidigUttaksprosent = (
    gradertPeriode: boolean | undefined,
    stillingsprosent: string | undefined,
): string => {
    return gradertPeriode && stillingsprosent ? (100 - parseInt(stillingsprosent, 10)).toString() : '100';
};

export const getAntallPrematurdager = (fødselsdato: string, termindato: string) => {
    return (
        Tidsperioden({ fom: dayjs(fødselsdato).toDate(), tom: dayjs(termindato).toDate() }).getAntallUttaksdager() - 1
    );
};
