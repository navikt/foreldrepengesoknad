import { IntlShape, useIntl } from 'react-intl';

import { NavnPåForeldre, Overføringsperiode, StønadskontoType } from '@navikt/fp-common';

import { getÅrsakTekst } from '../OppsummeringUtils';
import { Feltoppsummering } from './Feltoppsummering';

interface Props {
    periode: Overføringsperiode;
    navnPåForeldre: NavnPåForeldre;
}

const getNavnPåAnnenForelder = (navnPåForeldre: NavnPåForeldre, konto: StønadskontoType, intl: IntlShape) => {
    if (konto === StønadskontoType.Fedrekvote) {
        return navnPåForeldre.farMedmor;
    } else if (konto === StønadskontoType.Mødrekvote) {
        return navnPåForeldre.mor;
    }
    return intl.formatMessage({ id: 'annen.forelder' });
};

export const Overføringsperiodedetaljer = ({ periode, navnPåForeldre }: Props) => {
    const intl = useIntl();
    const navnAnnenForelder = getNavnPåAnnenForelder(navnPåForeldre, periode.konto, intl);
    return (
        <Feltoppsummering
            feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.årsak' })}
            verdi={getÅrsakTekst(intl, periode, { navnAnnenForelder })}
        />
    );
};
