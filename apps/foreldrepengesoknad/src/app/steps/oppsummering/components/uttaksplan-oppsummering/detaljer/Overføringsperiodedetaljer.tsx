import * as React from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { NavnPåForeldre, Overføringsperiode, StønadskontoType } from '@navikt/fp-common';

import { getÅrsakTekst } from '../OppsummeringUtils';
import Feltoppsummering from '../feltoppsummering/Feltoppsummering';

interface OverføringsperiodedetaljerProps {
    periode: Overføringsperiode;
    navnPåForeldre: NavnPåForeldre;
}

type Props = OverføringsperiodedetaljerProps;

const getNavnPåAnnenForelder = (navnPåForeldre: NavnPåForeldre, konto: StønadskontoType, intl: IntlShape) => {
    if (konto === StønadskontoType.Fedrekvote) {
        return navnPåForeldre.farMedmor;
    } else if (konto === StønadskontoType.Mødrekvote) {
        return navnPåForeldre.mor;
    }
    return intl.formatMessage({ id: 'annen.forelder' });
};

const Overføringsperiodedetaljer: React.FunctionComponent<Props> = ({ periode, navnPåForeldre }) => {
    const intl = useIntl();
    const navnAnnenForelder = getNavnPåAnnenForelder(navnPåForeldre, periode.konto, intl);
    return (
        <>
            <Feltoppsummering
                feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.årsak' })}
                verdi={getÅrsakTekst(intl, periode, { navnAnnenForelder })}
            />
        </>
    );
};

export default Overføringsperiodedetaljer;
