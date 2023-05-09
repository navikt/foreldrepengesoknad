import { Situasjon } from 'app/types/Situasjon';
import dayjs from 'dayjs';

export const skalViseInfoOmPrematuruker = (
    fødselsdato: Date | undefined,
    termindato: Date | undefined,
    situasjon: Situasjon
): boolean => {
    if (fødselsdato === undefined || termindato === undefined || situasjon !== 'fødsel') {
        return false;
    }
    const fødselsdatoEtterEllerLikFørsteJuli = dayjs
        .utc(fødselsdato)
        .isSameOrAfter(dayjs.utc(new Date('2019-07-01')), 'day');
    return (
        dayjs.utc(fødselsdato).add(7, 'weeks').add(3, 'days').isBefore(dayjs.utc(termindato), 'days') &&
        fødselsdatoEtterEllerLikFørsteJuli
    );
};
