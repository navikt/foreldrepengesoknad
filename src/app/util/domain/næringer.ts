import moment from 'moment';
import { Næring } from '../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { dateIs1YearAgoOrLess } from '../dates/dates';

export const erMindreEnn4ÅrSidenOppstart = (næring: Næring): boolean => {
    const { tidsperiode } = næring;

    const date4YearsAgo = moment().subtract(4, 'years');
    const startdato = moment(tidsperiode.fom);

    return date4YearsAgo.isSameOrBefore(startdato, 'day');
};

export const næringsinntektSisteÅrMåDokumenteres = (næring: Næring): boolean => {
    const { tidsperiode } = næring;
    const { fom } = tidsperiode;
    return dateIs1YearAgoOrLess(fom);
};
