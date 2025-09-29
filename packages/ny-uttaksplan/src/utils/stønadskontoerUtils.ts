import { IntlShape } from 'react-intl';

import { NavnPåForeldre, StønadskontoType } from '@navikt/fp-common';
import { capitalizeFirstLetter, getNavnGenitivEierform } from '@navikt/fp-utils';

export const getStønadskontoNavnSimple = (intl: IntlShape, konto: StønadskontoType, erMedmorDelAvSøknaden: boolean) => {
    if (konto === StønadskontoType.Fedrekvote && erMedmorDelAvSøknaden) {
        return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.MEDMORSKVOTE' });
    }
    return intl.formatMessage({ id: `uttaksplan.stønadskontotype.${konto}` });
};

export const getStønadskontoNavn = (
    intl: IntlShape,
    konto: StønadskontoType,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
) => {
    // if (
    //     (erFarEllerMedmor && konto === StønadskontoType.Fedrekvote) ||
    //     (!erFarEllerMedmor && konto === StønadskontoType.Mødrekvote)
    // ) {
    //     return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.dinKvote' });
    // }
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
