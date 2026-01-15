import { IntlShape } from 'react-intl';

import { NavnPåForeldre } from '@navikt/fp-common';
import { KontoBeregningDto, KontoDto, KontoTypeUttak } from '@navikt/fp-types';
import { capitalizeFirstLetter, getNavnGenitivEierform } from '@navikt/fp-utils';

export const getStønadskontoNavn = (
    intl: IntlShape,
    konto: KontoTypeUttak,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
) => {
    if ((erFarEllerMedmor && konto === 'FEDREKVOTE') || (!erFarEllerMedmor && konto === 'MØDREKVOTE')) {
        return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.dinKvote' });
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
            { id: 'uttaksplan.stønadskontotype.foreldernavn.kvote' },
            { navn: getNavnGenitivEierform(capitalizeFirstLetter(navn), intl.locale) },
        );
    }

    if (erFarEllerMedmor === true && erAleneOmOmsorg === false) {
        if (konto === 'AKTIVITETSFRI_KVOTE') {
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.AKTIVITETSFRI_KVOTE_BFHR' });
        }
        if (konto === 'FORELDREPENGER') {
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.AKTIVITETSKRAV_KVOTE_BFHR' });
        }
    }
    return intl.formatMessage({ id: `uttaksplan.stønadskontotype.${konto}` });
};

export const getAntallUkerFraStønadskontoer = (stønadskontoer: KontoDto[]): number => {
    return Object.values(stønadskontoer).reduce((sum: number, konto) => sum + konto.dager / 5, 0);
};

const getDagerForKonto = (stønadskontoer: KontoBeregningDto, stønadskontoType: KontoTypeUttak) => {
    const konto = stønadskontoer.kontoer.find((k) => k.konto === stønadskontoType);
    return konto ? konto.dager / 5 : 0;
};

export const getAntallUkerForeldrepengerFørFødsel = (stønadskontoer: KontoBeregningDto): number =>
    getDagerForKonto(stønadskontoer, 'FORELDREPENGER_FØR_FØDSEL');

export const getAntallUkerMødrekvote = (stønadskontoer: KontoBeregningDto): number =>
    getDagerForKonto(stønadskontoer, 'MØDREKVOTE');

export const getAntallUkerFedrekvote = (stønadskontoer: KontoBeregningDto): number =>
    getDagerForKonto(stønadskontoer, 'FEDREKVOTE');

export const getAntallUkerFellesperiode = (stønadskontoer: KontoBeregningDto): number =>
    getDagerForKonto(stønadskontoer, 'FELLESPERIODE');

export const getAntallUkerForeldrepenger = (stønadskontoer: KontoBeregningDto): number =>
    getDagerForKonto(stønadskontoer, 'FORELDREPENGER');

export const getAntallUkerAktivitetsfriKvote = (stønadskontoer: KontoBeregningDto): number =>
    getDagerForKonto(stønadskontoer, 'AKTIVITETSFRI_KVOTE');

export const getAntallUkerMinsterett = (minsteRettDager: number | undefined): number | undefined => {
    if (minsteRettDager !== undefined) {
        return minsteRettDager / 5;
    }
    return undefined;
};
