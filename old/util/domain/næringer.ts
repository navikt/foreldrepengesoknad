const moment = require('moment');
import { Næring } from '../../types/søknad/SelvstendigNæringsdrivendeInformasjon';

export const er4ÅrSidenOppstartEllerMindre = (næring: Næring): boolean => {
    const { tidsperiode } = næring;

    const date4YearsAgo = moment().subtract(4, 'years');
    const startdato = moment(tidsperiode.fom);

    return date4YearsAgo.isSameOrBefore(startdato, 'day');
};
