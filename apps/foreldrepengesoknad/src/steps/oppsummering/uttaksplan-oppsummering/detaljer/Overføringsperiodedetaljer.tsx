import { IntlShape, useIntl } from 'react-intl';

import { NavnPåForeldre, Overføringsperiode } from '@navikt/fp-common';
import { KontoTypeUttak } from '@navikt/fp-types';

import { getÅrsakTekst } from '../OppsummeringUtils';
import { Feltoppsummering } from './Feltoppsummering';

interface Props {
    periode: Overføringsperiode;
    navnPåForeldre: NavnPåForeldre;
}

const getNavnPåAnnenForelder = (navnPåForeldre: NavnPåForeldre, konto: KontoTypeUttak, intl: IntlShape) => {
    if (konto === 'FEDREKVOTE') {
        return navnPåForeldre.farMedmor;
    } else if (konto === 'MØDREKVOTE') {
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
