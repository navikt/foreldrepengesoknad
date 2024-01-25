import { Situasjon, Tidsperioden } from '@navikt/fp-common';
import dayjs from 'dayjs';

export const skalViseInfoOmPrematuruker = (
    fødselsdato: Date | undefined,
    termindato: Date | undefined,
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

export const getAntallPrematurdager = (fødselsdato: Date, termindato: Date) => {
    return Tidsperioden({ fom: fødselsdato, tom: termindato }).getAntallUttaksdager() - 1;
};
