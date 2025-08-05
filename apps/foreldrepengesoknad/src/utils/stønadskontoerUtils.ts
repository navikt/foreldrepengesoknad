import { IntlShape } from 'react-intl';

import { NavnPåForeldre, StønadskontoType } from '@navikt/fp-common';
import { TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { Stønadskonto } from '@navikt/fp-types/src/TilgjengeligeStønadskontoer';
import { capitalizeFirstLetter, getNavnGenitivEierform } from '@navikt/fp-utils';

export const getStønadskontoNavn = (
    intl: IntlShape,
    konto: StønadskontoType,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
) => {
    if (
        (erFarEllerMedmor && konto === StønadskontoType.Fedrekvote) ||
        (!erFarEllerMedmor && konto === StønadskontoType.Mødrekvote)
    ) {
        return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.dinKvote' });
    }
    let navn;

    switch (konto) {
        case StønadskontoType.Mødrekvote:
            navn = navnPåForeldre.mor;
            break;
        case StønadskontoType.Fedrekvote:
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
        if (konto === StønadskontoType.AktivitetsfriKvote) {
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.AKTIVITETSFRI_KVOTE_BFHR' });
        }
        if (konto === StønadskontoType.Foreldrepenger) {
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.AKTIVITETSKRAV_KVOTE_BFHR' });
        }
    }
    return intl.formatMessage({ id: `uttaksplan.stønadskontotype.${konto}` });
};

export const getAntallUkerFraStønadskontoer = (stønadskontoer: Stønadskonto[]): number => {
    return Object.values(stønadskontoer).reduce((sum: number, konto) => sum + konto.dager / 5, 0);
};

const getDagerForKonto = (
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
    stønadskontoType: StønadskontoType,
) => {
    const konto = stønadskontoer.kontoer.find((k) => k.konto === stønadskontoType);
    return konto ? konto.dager / 5 : 0;
};

export const getAntallUkerForeldrepengerFørFødsel = (
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
): number => getDagerForKonto(stønadskontoer, StønadskontoType.ForeldrepengerFørFødsel);

export const getAntallUkerMødrekvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getDagerForKonto(stønadskontoer, StønadskontoType.Mødrekvote);

export const getAntallUkerFedrekvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getDagerForKonto(stønadskontoer, StønadskontoType.Fedrekvote);

export const getAntallUkerFellesperiode = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getDagerForKonto(stønadskontoer, StønadskontoType.Fellesperiode);

export const getAntallUkerForeldrepenger = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getDagerForKonto(stønadskontoer, StønadskontoType.Foreldrepenger);

export const getAntallUkerAktivitetsfriKvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getDagerForKonto(stønadskontoer, StønadskontoType.AktivitetsfriKvote);

export const getAntallUkerMinsterett = (minsteRettDager: number | undefined): number | undefined => {
    if (minsteRettDager !== undefined) {
        return minsteRettDager / 5;
    }
    return undefined;
};
