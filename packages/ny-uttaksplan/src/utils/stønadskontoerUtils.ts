import { IntlShape } from 'react-intl';

import { NavnPåForeldre } from '@navikt/fp-common';
import { KontoType, KontoTypeUttak, MorsAktivitet } from '@navikt/fp-types';
import { capitalizeFirstLetter, getNavnGenitivEierform } from '@navikt/fp-utils';

export const getStønadskontoNavnSimple = (intl: IntlShape, konto: KontoTypeUttak, erMedmorDelAvSøknaden?: boolean) => {
    if (konto === 'FEDREKVOTE' && erMedmorDelAvSøknaden) {
        return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.MEDMORSKVOTE' });
    }
    return intl.formatMessage({ id: `uttaksplan.stønadskontotype.${konto}` });
};

export const getStønadskontoNavn = (
    intl: IntlShape,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    morsAktivitet: MorsAktivitet | undefined,
    konto?: KontoType,
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
        if (morsAktivitet === 'IKKE_OPPGITT') {
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.AKTIVITETSFRI_KVOTE_BFHR' });
        }
        return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.AKTIVITETSKRAV_KVOTE_BFHR' });
    }

    return intl.formatMessage({ id: `uttaksplan.stønadskontotype.${konto}` });
};
