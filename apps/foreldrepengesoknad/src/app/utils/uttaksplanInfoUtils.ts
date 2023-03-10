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
    const fødselsdatoEtterEllerLikFørsteJuli = dayjs(fødselsdato).isSameOrAfter(dayjs(new Date('2019-07-01')), 'day');
    return (
        dayjs(fødselsdato).add(7, 'weeks').add(3, 'days').isBefore(dayjs(termindato), 'days') &&
        fødselsdatoEtterEllerLikFørsteJuli
    );
};
