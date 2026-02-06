import { IntlShape, useIntl } from 'react-intl';

import { NavnPåForeldre } from '@navikt/fp-common';
import { KontoTypeUttak, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { Feltoppsummering } from './Feltoppsummering';

interface Props {
    periode: UttakPeriode_fpoversikt;
    navnPåForeldre: NavnPåForeldre;
}

const getNavnPåAnnenForelder = (navnPåForeldre: NavnPåForeldre, konto: KontoTypeUttak | undefined, intl: IntlShape) => {
    if (konto === 'FEDREKVOTE') {
        return navnPåForeldre.farMedmor;
    } else if (konto === 'MØDREKVOTE') {
        return navnPåForeldre.mor;
    }
    return intl.formatMessage({ id: 'annen.forelder' });
};

export const OverføringsperiodedetaljerNy = ({ periode, navnPåForeldre }: Props) => {
    const intl = useIntl();
    const navnAnnenForelder = getNavnPåAnnenForelder(navnPåForeldre, periode.kontoType, intl);
    return (
        <Feltoppsummering
            feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.årsak' })}
            verdi={getÅrsakTekst(intl, periode, { navnAnnenForelder })}
        />
    );
};

type MessageValue = string | number | boolean | Date | null | undefined;

const getÅrsakTekst = (
    intl: IntlShape,
    periode: UttakPeriode_fpoversikt,
    messageValues?: { [key: string]: MessageValue },
) => {
    //@ts-expect-error Fiks dynamisk id
    return intl.formatMessage({ id: `uttaksplan.overføringsårsaktype${periode.overføringÅrsak}` }, messageValues);
};
