import { IntlShape } from 'react-intl';

import { NavnPåForeldre } from '@navikt/fp-common';
import { KontoTypeUttak_fpoversikt } from '@navikt/fp-types';
import { capitalizeFirstLetter, getNavnGenitivEierform } from '@navikt/fp-utils';

export const getStønadskontoNavnSimple = (
    intl: IntlShape,
    konto: KontoTypeUttak_fpoversikt,
    erMedmorDelAvSøknaden?: boolean,
) => {
    if (konto === 'FEDREKVOTE' && erMedmorDelAvSøknaden) {
        return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.MEDMORSKVOTE' });
    }
    return intl.formatMessage({ id: `uttaksplan.stønadskontotype.${konto}` });
};

export const getStønadskontoNavn = (
    intl: IntlShape,
    konto: KontoTypeUttak_fpoversikt,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
) => {
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
