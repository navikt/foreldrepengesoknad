import { IntlShape } from 'react-intl';

import {
    KontoBeregningDto,
    KontoDto,
    KontoType,
    KontoTypeUttak,
    MorsAktivitet,
    NavnPåForeldre,
} from '@navikt/fp-types';
import { capitalizeFirstLetter, getNavnGenitivEierform } from '@navikt/fp-utils';

export const getStønadskvoteNavn = (
    intl: IntlShape,
    konto: KontoType | undefined,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
    morsAktivitet?: MorsAktivitet,
) => {
    if ((erFarEllerMedmor && konto === 'FEDREKVOTE') || (!erFarEllerMedmor && konto === 'MØDREKVOTE')) {
        return intl.formatMessage({ id: 'uttaksplan.stønadskvotetype.dinKvote' });
    }
    let navn;

    switch (konto) {
        case 'MØDREKVOTE':
            navn = navnPåForeldre.mor;
            break;
        case 'FEDREKVOTE':
            navn = navnPåForeldre.farMedmor;
            break;
        default:
            navn = undefined;
    }

    if (navn) {
        return intl.formatMessage(
            { id: 'uttaksplan.stønadskvotetype.foreldernavn.kvote' },
            { navn: getNavnGenitivEierform(capitalizeFirstLetter(navn), intl.locale) },
        );
    }

    if (erFarEllerMedmor === true && erAleneOmOmsorg === false) {
        if (konto === 'FORELDREPENGER' && morsAktivitet === 'IKKE_OPPGITT') {
            return intl.formatMessage({ id: 'uttaksplan.stønadskvotetype.AKTIVITETSFRI_KVOTE_BFHR' });
        }
        if (konto === 'FORELDREPENGER') {
            return intl.formatMessage({ id: 'uttaksplan.stønadskvotetype.AKTIVITETSKRAV_KVOTE_BFHR' });
        }
    }
    return intl.formatMessage({ id: `uttaksplan.stønadskvotetype.${konto}` });
};

export const getAntallUkerFraStønadskvoter = (stønadskvoter: KontoDto[]): number => {
    return Object.values(stønadskvoter).reduce((sum: number, konto) => sum + konto.dager / 5, 0);
};

const getDagerForKvote = (stønadskvoter: KontoBeregningDto, stønadskontoType: KontoTypeUttak) => {
    const konto = stønadskvoter.kontoer.find((k) => k.konto === stønadskontoType);
    return konto ? konto.dager / 5 : 0;
};

export const getAntallUkerForeldrepengerFørFødsel = (stønadskvoter: KontoBeregningDto): number =>
    getDagerForKvote(stønadskvoter, 'FORELDREPENGER_FØR_FØDSEL');

export const getAntallUkerMødrekvote = (stønadskvoter: KontoBeregningDto): number =>
    getDagerForKvote(stønadskvoter, 'MØDREKVOTE');

export const getAntallUkerFedrekvote = (stønadskvoter: KontoBeregningDto): number =>
    getDagerForKvote(stønadskvoter, 'FEDREKVOTE');

export const getAntallUkerFellesperiode = (stønadskvoter: KontoBeregningDto): number =>
    getDagerForKvote(stønadskvoter, 'FELLESPERIODE');

export const getAntallUkerForeldrepenger = (stønadskvoter: KontoBeregningDto): number =>
    getDagerForKvote(stønadskvoter, 'FORELDREPENGER');

export const getAntallUkerAktivitetsfriKvote = (stønadskvoter: KontoBeregningDto): number =>
    getDagerForKvote(stønadskvoter, 'AKTIVITETSFRI_KVOTE');
