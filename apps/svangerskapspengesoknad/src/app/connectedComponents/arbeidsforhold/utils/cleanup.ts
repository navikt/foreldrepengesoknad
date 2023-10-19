import { Søker } from 'app/types/Søker';
import * as _ from 'lodash';
import { FrilansInformasjon } from 'app/types/FrilansInformasjon';
import { DeepPartial } from 'redux';
import { Næring } from 'app/types/SelvstendigNæringsdrivende';
import moment from 'moment';
import { AnnenInntekt, AnnenInntektType } from 'app/types/AnnenInntekt';

export const cleanupFrilansinformasjon = (søker: Partial<Søker>): DeepPartial<FrilansInformasjon> => {
    const { harJobbetSomFrilansSiste10Mnd, frilansInformasjon } = søker;

    let relevanteFelter: string[] = [];
    if (harJobbetSomFrilansSiste10Mnd && frilansInformasjon) {
        relevanteFelter = [
            'jobberFremdelesSomFrilans',
            'oppstart',
            'driverFosterhjem',
            'harJobbetForNærVennEllerFamilieSiste10Mnd',
        ];

        if (frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd) {
            relevanteFelter.push('oppdragForNæreVennerEllerFamilieSiste10Mnd');
        }
    }

    return _.pick(frilansInformasjon, relevanteFelter);
};

export const cleanupNæring = (næring: Partial<Næring>): DeepPartial<Næring> => {
    const relevanteFelter: string[] = [
        'næringstyper',
        'navnPåNæringen',
        'registrertINorge',
        'harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene',
        'tidsperiode',
        'hattVarigEndringAvNæringsinntektSiste4Kalenderår',
        'harRevisor',
        'harRegnskapsfører',
    ];

    næring.registrertINorge === true
        ? relevanteFelter.push('organisasjonsnummer')
        : relevanteFelter.push('registrertILand');

    næring.tidsperiode &&
    næring.tidsperiode.fom !== undefined &&
    moment(næring.tidsperiode.fom).isBefore(moment().subtract(4, 'year'))
        ? relevanteFelter.push('endringAvNæringsinntektInformasjon')
        : relevanteFelter.push(
              'næringsinntekt',
              'oppstartsdato',
              'harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene',
          );

    if (næring.harRegnskapsfører === true) {
        relevanteFelter.push('regnskapsfører');
    } else if (næring.harRevisor === true) {
        relevanteFelter.push('revisor', 'kanInnhenteOpplsyningerFraRevisor');
    }
    return _.pick(næring, relevanteFelter);
};

export const cleanupSøker = (søker: Partial<Søker>) => {
    const relevanteFelter: string[] = [
        'rolle',
        'harJobbetSomFrilansSiste10Mnd',
        'harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd',
        'harHattAnnenInntektSiste10Mnd',
    ];

    if (søker.harJobbetSomFrilansSiste10Mnd) {
        relevanteFelter.push('frilansInformasjon');
    }

    if (søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd) {
        relevanteFelter.push('selvstendigNæringsdrivendeInformasjon');
    }

    if (søker.harHattAnnenInntektSiste10Mnd) {
        relevanteFelter.push('andreInntekterSiste10Mnd');
    }

    return _.pick(søker, relevanteFelter);
};

export const cleanupAnnenInntekt = (annenInntekt: Partial<AnnenInntekt>): AnnenInntekt => {
    annenInntekt.vedlegg = annenInntekt.type === AnnenInntektType.MILITÆRTJENESTE ? annenInntekt.vedlegg : [];
    return annenInntekt as AnnenInntekt;
};
